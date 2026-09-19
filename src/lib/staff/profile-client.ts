"use client";

import { createClient } from "@/lib/supabase/client";

// Calls the update_my_staff_profile RPC (0018_staff_profile_self_edit.sql) —
// a SECURITY DEFINER function scoped to the caller's own row, rather than a
// direct table update, so this can never touch role/status. Returns whether
// the save succeeded so the caller can roll the UI back on failure instead
// of assuming success.
export async function updateMyProfile(input: { fullName: string; title: string; skills: string[] }): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.rpc("update_my_staff_profile", {
    p_full_name: input.fullName,
    p_title: input.title,
    p_skills: input.skills,
  });
  if (error) {
    console.error("updateMyProfile failed", error);
    return false;
  }
  return true;
}
