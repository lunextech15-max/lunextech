// Server-only: reads real milestones from Supabase public.project_milestones
// (0015_project_milestones.sql) — any authenticated user can read, per RLS.

import { createClient } from "@/lib/supabase/server";

export type MilestoneStatus = "completed" | "in-progress" | "upcoming";

export type ProjectMilestoneItem = {
  id: string;
  number: string;
  title: string;
  status: MilestoneStatus;
};

type MilestoneRow = { id: string; title: string; status: MilestoneStatus };

export async function getProjectMilestones(projectCode: string): Promise<ProjectMilestoneItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_milestones")
    .select("id, title, status")
    .eq("project_code", projectCode)
    .order("position", { ascending: true });

  if (error) {
    console.error(`getProjectMilestones: query failed for ${projectCode}`, error);
    return [];
  }

  return ((data ?? []) as MilestoneRow[]).map((row, index) => ({
    id: row.id,
    number: String(index + 1).padStart(2, "0"),
    title: row.title,
    status: row.status,
  }));
}
