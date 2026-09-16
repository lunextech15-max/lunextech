"use client";

import { useMemo, useState } from "react";
import TasksHeader from "./TasksHeader";
import TasksSummary from "./TasksSummary";
import TaskSearch from "./TaskSearch";
import TaskFilters, { type TaskFilter } from "./TaskFilters";
import TaskProjectFilter from "./TaskProjectFilter";
import MyTaskList from "./MyTaskList";
import type { Task } from "@/lib/staff/types";
import "@/styles/staff-projects.css";
import "@/styles/staff-tasks.css";

export default function TasksContent({ tasks }: { tasks: Task[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [projectFilter, setProjectFilter] = useState("all");

  const projectNames = useMemo(
    () => Array.from(new Set(tasks.map((task) => task.projectName))),
    [tasks]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((task) => statusFilter === "all" || task.status === statusFilter)
      .filter((task) => projectFilter === "all" || task.projectName === projectFilter)
      .filter(
        (task) =>
          !q || task.title.toLowerCase().includes(q) || task.projectName.toLowerCase().includes(q)
      );
  }, [tasks, query, statusFilter, projectFilter]);

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <TasksHeader />
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.06s" }}>
        <TasksSummary tasks={tasks} />
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
        <MyTaskList
          tasks={filtered}
          hasAnyTasks={tasks.length > 0}
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
