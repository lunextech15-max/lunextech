"use client";

import { useMemo, useState } from "react";
import TaskFilters, { type TaskFilter } from "@/components/staff/tasks/TaskFilters";
import TaskSearch from "@/components/staff/tasks/TaskSearch";
import TaskProjectFilter from "@/components/staff/tasks/TaskProjectFilter";
import InternTaskList from "./InternTaskList";
import type { InternTask } from "@/lib/intern/types";
import "@/styles/staff-projects.css";
import "@/styles/staff-tasks.css";

export default function InternTasksContent({ tasks }: { tasks: InternTask[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [projectFilter, setProjectFilter] = useState("all");

  const projectNames = useMemo(() => Array.from(new Set(tasks.map((t) => t.project))), [tasks]);

  const pending = tasks.filter((t) => t.status !== "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((t) => statusFilter === "all" || t.status === statusFilter)
      .filter((t) => projectFilter === "all" || t.project === projectFilter)
      .filter((t) => !q || t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q));
  }, [tasks, query, statusFilter, projectFilter]);

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          03 <span className="text-accent">/ Tasks</span>
        </p>
        <h1 className="mt-4 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          My Tasks
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Tasks assigned to you across your internship.</p>
      </div>

      <div className="dash-fade mt-8 flex flex-wrap gap-x-8 gap-y-3" style={{ animationDelay: "0.06s" }}>
        <p className="flex items-baseline gap-2">
          <span className="font-display text-lg font-black text-soft-white">{String(pending).padStart(2, "0")}</span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Pending</span>
        </p>
        <p className="flex items-baseline gap-2">
          <span className="font-display text-lg font-black text-soft-white">
            {String(inProgress).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">In progress</span>
        </p>
        <p className="flex items-baseline gap-2">
          <span className="font-display text-lg font-black text-soft-white">
            {String(completed).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Completed</span>
        </p>
      </div>

      <div
        className="dash-fade mt-8 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between"
        style={{ animationDelay: "0.12s" }}
      >
        <TaskFilters active={statusFilter} onChange={setStatusFilter} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <TaskProjectFilter projects={projectNames} active={projectFilter} onChange={setProjectFilter} />
          <div className="sm:w-64">
            <TaskSearch value={query} onChange={setQuery} />
          </div>
        </div>
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.18s" }}>
        <InternTaskList
          tasks={filtered}
          hasAny={tasks.length > 0}
          onClearFilters={() => {
            setQuery("");
            setStatusFilter("all");
            setProjectFilter("all");
          }}
        />
      </div>
    </div>
  );
}
