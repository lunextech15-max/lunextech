"use client";

import { useState } from "react";
import ProjectWorkspaceNav, { type WorkspaceSection } from "./ProjectWorkspaceNav";
import ProjectOverview from "./ProjectOverview";
import ProjectTaskList from "./ProjectTaskList";
import ProjectActivityTimeline from "./ProjectActivityTimeline";
import ProjectResources from "./ProjectResources";
import { getProjectTasks } from "@/lib/staff/tasks-data";
import type { StaffProject } from "@/lib/staff/types";

export default function ProjectWorkspace({ project }: { project: StaffProject }) {
  const [section, setSection] = useState<WorkspaceSection>("overview");

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
