// Adapts the real Project shape (real-projects.ts, public.projects) to the
// InternProject shape the existing "My Project" page/dashboard components
// already render. Fields with no real backing (responsibilities,
// milestones — no itemized-responsibility or milestone system exists yet)
// come back honestly empty rather than invented.

import { getProjectsForMember } from "@/lib/staff/real-projects";
import type { InternProject, InternTeamMember } from "./types";

function toInternStatus(status: string): "in-progress" | "completed" {
  return status === "completed" ? "completed" : "in-progress";
}

/** The intern's primary project — their highest-progress active
 * assignment, or their most recent one if none are active. Null if they
 * aren't on any real project yet. */
export async function getMyInternProject(staffId: string): Promise<InternProject | null> {
  const projects = await getProjectsForMember(staffId);
  if (projects.length === 0) return null;

  const active = projects.filter((p) => p.status === "in-progress" || p.status === "review");
  const project = (active.length > 0 ? active : projects).sort((a, b) => b.progress - a.progress)[0];

  const team: InternTeamMember[] = project.team.map((m) => ({
    id: m.id,
    initials: m.initials,
    name: m.name,
    role: m.role,
    department: "—",
  }));

  return {
    name: project.name,
    category: project.category,
    description: project.description,
    status: toInternStatus(project.status),
    progress: project.progress,
    team,
    goal: project.objective,
    roleTitle: project.team.find((m) => m.id === staffId)?.role ?? "—",
    // No itemized per-person responsibilities or real milestone system
    // exists yet — honestly empty rather than invented.
    responsibilities: [],
    nextMilestone: project.nextMilestone,
    milestones: [],
  };
}
