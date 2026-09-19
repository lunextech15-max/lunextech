// Server-only: reads the real team roster from Supabase public.staff — the
// same table the Admin Panel (separate repo) manages. Replaces MOCK_TEAM
// (team-data.ts). RLS on public.staff is admin-only for write, but every
// authenticated user can read their own... actually there is currently no
// authenticated-staff SELECT policy, only admin — see note in
// getAllTeamMembers below.

import { createClient } from "@/lib/supabase/server";
import type { StaffTeamMember } from "./types";

type StaffRow = {
  staff_id: string;
  full_name: string;
  role: string;
  title: string | null;
  department: string | null;
  status: string;
  created_at: string;
  skills: string[] | null;
};

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const chars = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return chars.join("") || "—";
}

/** The real team directory, for the Staff Portal's Team page. Requires an
 * "authenticated staff can view staff" RLS policy on public.staff (not yet
 * added — 0007_team_profiles.sql only grants admin read). Returns an empty
 * list rather than throwing until that policy exists, so the page shows an
 * honest empty state instead of crashing. */
export async function getAllTeamMembers(): Promise<StaffTeamMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("staff")
    .select("staff_id, full_name, role, title, department, status, created_at, skills")
    .order("full_name", { ascending: true });

  if (error) {
    console.error("getAllTeamMembers: staff query failed (likely missing RLS read policy)", error);
    return [];
  }

  const rows = (data ?? []) as StaffRow[];
  return rows
    .filter((row) => row.status === "active")
    .map((row) => ({
      id: row.staff_id,
      name: row.full_name,
      initials: initialsFrom(row.full_name),
      role: row.title || (row.role === "intern" ? "Intern" : "Team member"),
      discipline: row.department || "—",
      skills: row.skills ?? [],
      // Project membership now comes from real-projects.ts (project_members)
      // rather than being duplicated here — see getMemberProjectCodes.
      projectIds: [],
      status: "active" as const,
    }));
}

export async function getTeamMember(staffId: string): Promise<StaffTeamMember | null> {
  const members = await getAllTeamMembers();
  return members.find((m) => m.id === staffId) ?? null;
}

/** The year a staff member's account was created — the closest real proxy
 * for "member since" until a dedicated join-date field exists. */
export async function getStaffJoinedYear(staffId: string): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.from("staff").select("created_at").eq("staff_id", staffId).maybeSingle();
  if (!data) return "—";
  const date = new Date((data as { created_at: string }).created_at);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
}
