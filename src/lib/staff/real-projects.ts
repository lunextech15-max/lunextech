// Server-only: reads the real project list from Supabase public.projects /
// public.project_members — the same tables the Admin Panel (separate repo)
// manages. Replaces MOCK_PROJECTS (projects-data.ts). Requires the
// "authenticated users can view projects/project members" policies from
// 0009_staff_portal_read_access.sql.

import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus, ProjectTeamMember, StaffProject } from "./types";

type ProjectRow = {
  code: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  objective: string;
  started_date: string | null;
  next_milestone: string;
  created_at: string;
};

type MemberRow = { project_code: string; staff_id: string; role_on_project: string | null };
type StaffNameRow = { staff_id: string; full_name: string };

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const chars = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return chars.join("") || "—";
}

function formatStarted(date: string | null): string {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function numberFromCode(code: string, index: number): string {
  const match = code.match(/(\d+)$/);
  return (match ? match[1] : String(index + 1)).padStart(2, "0");
}

function toStaffProject(
  row: ProjectRow,
  index: number,
  members: MemberRow[],
  staffById: Map<string, string>
): StaffProject {
  const team: ProjectTeamMember[] = members
    .filter((m) => m.project_code === row.code)
    .map((m) => {
      const name = staffById.get(m.staff_id) ?? m.staff_id;
      return { id: m.staff_id, initials: initialsFrom(name), name, role: m.role_on_project ?? "—" };
    });

  return {
    id: row.code,
    code: row.code,
    slug: row.slug,
    number: numberFromCode(row.code, index),
    name: row.name,
    category: row.category,
    description: row.description,
    status: row.status,
    progress: row.progress,
    objective: row.objective,
    startedDate: formatStarted(row.started_date),
    team,
    nextMilestone: row.next_milestone,
    // No real milestone or activity-log system exists yet — honestly empty
    // rather than carrying over old mock demo entries.
    activity: [],
    resources: [],
  };
}

export async function getAllRealProjects(): Promise<StaffProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("getAllRealProjects: projects query failed", error);
    return [];
  }

  const rows = (data ?? []) as ProjectRow[];
  const codes = rows.map((r) => r.code);

  const [{ data: memberRows }, { data: staffRows }] = await Promise.all([
    codes.length
      ? supabase.from("project_members").select("*").in("project_code", codes)
      : Promise.resolve({ data: [] as MemberRow[] }),
    supabase.from("staff").select("staff_id, full_name"),
  ]);

  const staffById = new Map(((staffRows ?? []) as StaffNameRow[]).map((s) => [s.staff_id, s.full_name]));
  const members = (memberRows ?? []) as MemberRow[];

  return rows.map((row, index) => toStaffProject(row, index, members, staffById));
}

export async function getRealProject(slugOrCode: string): Promise<StaffProject | null> {
  const projects = await getAllRealProjects();
  return projects.find((p) => p.slug === slugOrCode || p.code === slugOrCode) ?? null;
}

/** The projects a given staff member is assigned to — used by the Team
 * Detail page and the Dashboard's "current focus" pick. */
export async function getProjectsForMember(staffId: string): Promise<StaffProject[]> {
  const projects = await getAllRealProjects();
  return projects.filter((p) => p.team.some((m) => m.id === staffId));
}
