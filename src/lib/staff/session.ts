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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/staff");
  }

  const { data: row } = await supabase
    .from("staff")
    .select("staff_id, full_name, role")
    .eq("email", user.email ?? "")
    .maybeSingle();

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
