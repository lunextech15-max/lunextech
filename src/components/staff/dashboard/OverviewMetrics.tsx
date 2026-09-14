import MetricBlock from "./MetricBlock";
import type { DashboardMetrics } from "@/lib/staff/types";

export default function OverviewMetrics({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricBlock
        label="Active projects"
        value={metrics.activeProjects}
        ctaLabel="View projects"
        ctaHref="/staff/projects"
      />
      <MetricBlock label="Tasks pending" value={metrics.myTasks} ctaLabel="View tasks" ctaHref="/staff/tasks" />
      <MetricBlock label="Completed this week" value={metrics.completedThisWeek} ctaLabel="View activity" />
      <MetricBlock label="Next deadline" value={metrics.nextDeadline} ctaLabel="View calendar" />
    </div>
  );
}
