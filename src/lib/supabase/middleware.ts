// Refreshes the Supabase auth session on every request that passes through
// proxy.ts, so server components always see an up-to-date session — and
// redirects signed-out visitors away from protected /staff/* and /intern/*
// pages. The admin panel is a separate deployment (lunextech-admin), so an
// admin-role account landing here just falls back to the staff dashboard.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  staff: "/staff/dashboard",
  intern: "/intern/dashboard",
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
  const isProtectedRoute =
    pathname.startsWith("/staff/") || pathname === "/intern" || pathname.startsWith("/intern/");

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  if (user && isLoginPage) {
    const { data: role } = (await supabase.rpc("get_my_role")) as { data: string | null };
    return NextResponse.redirect(new URL(ROLE_HOME[role ?? "staff"] ?? "/staff/dashboard", request.url));
  }

  return supabaseResponse;
}
