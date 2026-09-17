// Server-only: the real signed-in intern's identity, shaped for the Intern
// Portal's InternUser type. Wraps the shared staff session (session.ts)
// plus the department/internship_start fields InternUser expects that
// aren't part of the base session. Replaces INTERN_USER ("Alex Kumar",
// shown to every intern regardless of who actually signed in).

import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/staff/session";
import type { InternUser } from "./types";

export async function getInternUser(): Promise<InternUser> {
  const session = await getStaffSession();
  const supabase = await createClient();
  const { data } = await supabase
    .from("staff")
    .select("department, internship_role, internship_start")
    .eq("staff_id", session.staffId)
    .maybeSingle();

  return {
    id: session.id,
    name: session.name,
    initials: session.initials,
    role: data?.internship_role || "Intern",
    department: data?.department || data?.internship_role || "—",
    startDate: data?.internship_start ?? "—",
  };
}
