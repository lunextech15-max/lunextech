"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/staff/dashboard/DashboardHeader";
import MetricBlock from "@/components/staff/dashboard/MetricBlock";
import CurrentFocus from "@/components/staff/dashboard/CurrentFocus";
import RecentActivity from "@/components/staff/dashboard/RecentActivity";
import InternNextTasks from "./InternNextTasks";
import InternQuickActions from "./InternQuickActions";
import type { InternActivityEntry, InternProject, InternTask, InternUser } from "@/lib/intern/types";

function loadDashboard(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 450));
}

export default function InternDashboardContent({
  user,
  project,
  tasks,
  activity,
  learningPercent,
}: {
  user: InternUser;
  project: InternProject;
  tasks: InternTask[];
  activity: InternActivityEntry[];
  learningPercent: number;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadDashboard().then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="dash-skeleton h-4 w-40" />
        <div className="dash-skeleton mt-4 h-10 w-72" />
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="dash-skeleton h-24" />
          <div className="dash-skeleton h-24" />
          <div className="dash-skeleton h-24" />
          <div className="dash-skeleton h-24" />
        </div>
        <div className="dash-skeleton mt-6 h-56" />
      </div>
    );
  }

  const activeProjects = project.status === "in-progress" ? 1 : 0;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const pendingTasks = tasks.filter((t) => t.status !== "completed").length;
  const nextTasks = tasks.filter((t) => t.status !== "completed").slice(0, 3);

  const currentFocusProject = {
    name: project.name,
    category: project.category,
    description: project.description,
    progress: project.progress,
    role: project.roleTitle,
    team: project.team,
    nextMilestone: project.nextMilestone,
    href: "/intern/project",
  };

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <DashboardHeader name={user.name} pendingTasks={pendingTasks} />
      </div>

      <div className="dash-fade mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4" style={{ animationDelay: "0.06s" }}>
        <MetricBlock label="Internship progress" value={`${project.progress}%`} ctaLabel="View project" ctaHref="/intern/project" />
        <MetricBlock
          label="Active project"
          value={String(activeProjects).padStart(2, "0")}
          ctaLabel="View project"
          ctaHref="/intern/project"
        />
        <MetricBlock label="My tasks" value={String(inProgressTasks).padStart(2, "0")} ctaLabel="View tasks" ctaHref="/intern/tasks" />
        <MetricBlock label="Learning progress" value={`${learningPercent}%`} ctaLabel="Continue learning" ctaHref="/intern/learning" />
      </div>

      <div className="dash-fade mt-6" style={{ animationDelay: "0.12s" }}>
        <CurrentFocus project={currentFocusProject} />
      </div>

      <div className="dash-fade mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3" style={{ animationDelay: "0.18s" }}>
        <div className="lg:col-span-2">
          <InternNextTasks tasks={nextTasks} />
        </div>
        <InternQuickActions />
      </div>

      <div className="dash-fade mt-6" style={{ animationDelay: "0.24s" }}>
        <RecentActivity items={activity} />
      </div>
    </div>
  );
}
