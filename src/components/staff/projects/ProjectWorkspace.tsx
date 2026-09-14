"use client";

import { useEffect, useState } from "react";
import ProjectWorkspaceNav, { type WorkspaceSection } from "./ProjectWorkspaceNav";
import ProjectOverview from "./ProjectOverview";
import ProjectTaskList from "./ProjectTaskList";
import ProjectActivityTimeline from "./ProjectActivityTimeline";
import ProjectResources from "./ProjectResources";
import { getProjectTasks } from "@/lib/staff/tasks-data";
import type { StaffProject } from "@/lib/staff/types";

// Stands in for the future Supabase fetch — brief and genuine (a skeleton
// really is shown while this resolves), not a fake progress animation.
function loadWorkspace(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export default function ProjectWorkspace({ project }: { project: StaffProject }) {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<WorkspaceSection>("overview");

  useEffect(() => {
    let cancelled = false;
    loadWorkspace().then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-10">
        <div className="dash-skeleton h-8 w-full max-w-md" />
        <div className="dash-skeleton mt-8 h-40" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <ProjectWorkspaceNav active={section} onChange={setSection} />

      <div key={section} id={`workspace-panel-${section}`} role="tabpanel" aria-labelledby={`workspace-tab-${section}`} className="proj-section mt-8">
        {section === "overview" && <ProjectOverview project={project} />}
        {section === "tasks" && <ProjectTaskList tasks={getProjectTasks(project.code)} />}
        {section === "activity" && <ProjectActivityTimeline activity={project.activity} />}
        {section === "resources" && <ProjectResources resources={project.resources} />}
      </div>
    </div>
  );
}
