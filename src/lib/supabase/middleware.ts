// Refreshes the Supabase auth session on every request that passes through
// proxy.ts, so server components always see an up-to-date session — and
// redirects signed-out visitors away from protected /staff/*, /intern/*,
// and /caller/* pages. The admin panel is a separate deployment
// (lunextech-admin), so an admin-role account landing here just falls
// back to the staff dashboard.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  staff: "/staff/dashboard",
  intern: "/intern/dashboard",
  caller: "/caller/dashboard",
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  // Touching getUser() is what actually refreshes the session token.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/staff";
  const isStaffSection = pathname.startsWith("/staff/");
  const isInternSection = pathname === "/intern" || pathname.startsWith("/intern/");
  const isCallerSection = pathname === "/caller" || pathname.startsWith("/caller/");
  const isProtectedRoute = isStaffSection || isInternSection || isCallerSection;

  // Every redirect this function can issue goes through here. Auth state
  // (getUser(), get_my_role()) has turned out to be inconsistent across the
  // rapid consecutive requests a redirect chain itself fires — sometimes
  // seeing a valid session, sometimes not, for the SAME browser session
  // milliseconds apart (a token-refresh race). Bouncing on every
  // inconsistent read turned into an infinite ping-pong loop
  // (ERR_TOO_MANY_REDIRECTS / browser navigation throttling).
  //
  // A Referer-based loop check isn't reliable here — browsers don't
  // consistently update Referer per hop while auto-following a redirect
  // chain — so this counts consecutive redirects in a short-lived cookie
  // instead: real, deliberate cross-portal redirects. A user takes at most
  // 1-2 in a row; a few in immediate succession is the signature of the
  // race, not a real navigation attempt.
  const REDIRECT_GUARD_COOKIE = "mw_redirect_count";
  const MAX_CONSECUTIVE_REDIRECTS = 3;
  const redirectCount = Number(request.cookies.get(REDIRECT_GUARD_COOKIE)?.value ?? "0");

  const redirectTo = (path: string) => {
    if (redirectCount >= MAX_CONSECUTIVE_REDIRECTS) {
      console.error("updateSession: too many redirects in a row, breaking a potential loop", {
        pathname,
        target: path,
        redirectCount,
      });
      supabaseResponse.cookies.delete(REDIRECT_GUARD_COOKIE);
      return supabaseResponse;
    }
    const response = NextResponse.redirect(new URL(path, request.url));
    // Carry over any refreshed Supabase auth cookies captured on
    // supabaseResponse (via the setAll() callback during getUser()).
    // Without this, every redirect silently drops the just-refreshed
    // session: the browser resends the stale, already-rotated refresh
    // token on the next hop, getUser() fails, and it redirects again —
    // a real, self-sustaining auth failure on every hop, not a clean
    // chain, which is why the redirect-count guard below wasn't actually
    // capping it.
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    response.cookies.set(REDIRECT_GUARD_COOKIE, String(redirectCount + 1), { maxAge: 5, path: "/" });
    return response;
  };

  // Any request that reaches here without redirecting is a real, landed
  // page load — clear the guard so it doesn't outlive the burst it was
  // meant to catch.
  const landed = () => {
    if (redirectCount > 0) supabaseResponse.cookies.delete(REDIRECT_GUARD_COOKIE);
    return supabaseResponse;
  };

  if (!user && isProtectedRoute) {
    return redirectTo("/staff");
  }

  if (user && (isLoginPage || isProtectedRoute)) {
    const { data: role, error: roleError } = (await supabase.rpc("get_my_role")) as {
      data: string | null;
      error: unknown;
    };

    // A transient RPC failure (network blip, DB timeout) must never be
    // treated the same as "this user has no role" — that bounced a real
    // intern/caller to /staff/dashboard on a failed lookup.
    if (roleError) {
      console.error("updateSession: get_my_role failed, skipping role-based redirect", roleError);
      return landed();
    }

    if (isLoginPage) {
      return redirectTo(ROLE_HOME[role ?? "staff"] ?? "/staff/dashboard");
    }

    // Cross-portal access control: each role has exactly one home section
    // (admin has none here — it falls back to /staff, same as before).
    // Anyone browsing outside their own section gets sent home instead —
    // checking that you're logged in isn't the same as checking you're
    // logged in as the right role.
    const home = ROLE_HOME[role ?? "staff"] ?? "/staff/dashboard";
    const inOwnSection =
      (role === "intern" && isInternSection) ||
      (role === "caller" && isCallerSection) ||
      ((role === "staff" || role === "admin" || !role) && isStaffSection);

    if (!inOwnSection) {
      return redirectTo(home);
    }
  }

  return landed();
}
