// Server-only: resolves the signed-in Staff Portal user's REAL identity
// from Supabase (public.staff, matched by email) instead of the old
// MOCK_STAFF_USER ("John Doe") every page used regardless of who actually
// signed in. Redirects to /staff (login) if there's no session.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { StaffRole, StaffUser } from "./types";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const chars = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return chars.join("") || "—";
}

export async function getStaffSession(): Promise<StaffUser & { staffId: string }> {
  const supabase = await createClient();

  // getUser() calls out to Supabase's Auth API — a transient network blip
  // there must not be treated the same as "confirmed logged out" (that was
  // the real source of the /staff <-> /staff/dashboard redirect loop: this
  // check redirected on ANY failure, including ones where the session was
  // actually fine). One retry absorbs a one-off blip; only a second
  // consecutive failure is treated as a real logged-out session.
  let user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    const retry = await supabase.auth.getUser();
    if (retry.error) {
      console.error("getStaffSession: getUser() failed twice, redirecting to login", retry.error);
    }
    user = retry.data.user;
  }

  if (!user) {
    redirect("/staff");
  }

  let { data: row, error: rowError } = await supabase
    .from("staff")
    .select("staff_id, full_name, role")
    .eq("email", user.email ?? "")
    .maybeSingle();

  if (!row) {
    const retry = await supabase
      .from("staff")
      .select("staff_id, full_name, role")
      .eq("email", user.email ?? "")
      .maybeSingle();
    if (retry.error) {
      console.error("getStaffSession: staff row lookup failed twice, redirecting to login", rowError, retry.error);
    }
    row = retry.data;
  }

  if (!row) {
    redirect("/staff");
  }

  return {
    id: row.staff_id,
    staffId: row.staff_id,
    name: row.full_name,
    initials: initialsFrom(row.full_name),
    role: row.role as StaffRole,
  };
}
