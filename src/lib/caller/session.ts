// Server-only: the real signed-in caller's identity. Wraps the shared
// staff session with the territory/daily_call_target fields specific to
// the caller role (added to public.staff by 0013_cold_caller_portal.sql).

import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/staff/session";

export type CallerUser = {
  id: string;
  staffId: string;
  name: string;
  initials: string;
  territory: string;
  dailyCallTarget: number;
};

export async function getCallerUser(): Promise<CallerUser> {
  const session = await getStaffSession();
  const supabase = await createClient();
  const { data } = await supabase
    .from("staff")
    .select("territory, daily_call_target")
    .eq("staff_id", session.staffId)
    .maybeSingle();

  return {
    id: session.id,
    staffId: session.staffId,
    name: session.name,
    initials: session.initials,
    territory: data?.territory || "—",
    dailyCallTarget: data?.daily_call_target ?? 0,
  };
}
