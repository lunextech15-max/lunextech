"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsSummary from "./ProjectsSummary";
import ProjectSearch from "./ProjectSearch";
import ProjectFilters, { type ProjectFilter } from "./ProjectFilters";
import ProjectList from "./ProjectList";
import type { StaffProject } from "@/lib/staff/types";
import "@/styles/staff-projects.css";

// Stands in for the future Supabase fetch — brief and genuine (skeletons
// really are shown while this resolves).
function loadProjects(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 450));
}

function matchesFilter(project: StaffProject, filter: ProjectFilter) {
  if (filter === "all") return true;
  if (filter === "completed") return project.status === "completed";
  if (filter === "archived") return project.status === "archived";
  return project.status !== "completed" && project.status !== "archived";
}

export default function ProjectsContent({ projects }: { projects: StaffProject[] }) {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("all");

  useEffect(() => {
    let cancelled = false;
    loadProjects().then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((project) => matchesFilter(project, filter))
      .filter(
        (project) =>
          !q ||
          project.name.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q)
      );
  }, [projects, query, filter]);

  if (loading) {
    return (
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="dash-skeleton h-4 w-32" />
        <div className="dash-skeleton mt-4 h-10 w-56" />
        <div className="dash-skeleton mt-8 h-10 w-full" />
        <div className="dash-skeleton mt-6 h-24" />
        <div className="dash-skeleton mt-4 h-24" />
        <div className="dash-skeleton mt-4 h-24" />
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <ProjectsHeader />
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.06s" }}>
        <ProjectsSummary projects={projects} />
      </div>

      <div
        className="dash-fade mt-8 flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between"
        style={{ animationDelay: "0.12s" }}
      >
        <ProjectFilters active={filter} onChange={setFilter} />
        <div className="sm:w-64">
          <ProjectSearch value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.18s" }}>
        <ProjectList
          projects={filtered}
          onClearFilters={() => {
            setQuery("");
            setFilter("all");
          }}
        />
      </div>
    </div>
  );
}
