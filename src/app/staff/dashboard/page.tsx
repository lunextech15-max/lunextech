import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import DashboardContent from "@/components/staff/dashboard/DashboardContent";
import { getStaffSession } from "@/lib/staff/session";
import { getProjectsForMember } from "@/lib/staff/real-projects";
import { getTasksForAssignee } from "@/lib/staff/real-tasks";
import { getRealAnnouncements } from "@/lib/staff/real-announcements";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

function daysAgo(iso: string, days: number): boolean {
  const date = new Date(`${iso}T00:00:00`);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff;
}

export default async function StaffDashboardPage() {
  const user = await getStaffSession();
  const [myProjects, myTasks, announcements] = await Promise.all([
    getProjectsForMember(user.staffId),
    getTasksForAssignee(user.staffId),
    getRealAnnouncements(),
  ]);
  const activeProjects = myProjects.filter((p) => p.status === "in-progress" || p.status === "review");
  // Highest-progress active project stands in for "current focus" until a
  // real assignment-priority concept exists.
  const currentFocus = activeProjects.sort((a, b) => b.progress - a.progress)[0] ?? null;
  const pendingTasks = myTasks.filter((t) => t.status !== "completed");
  const completedThisWeek = myTasks.filter((t) => t.status === "completed" && daysAgo(t.updatedAt, 7)).length;
  const nextDeadline = pendingTasks
    .filter((t) => t.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]?.dueDate;

  return (
    <StaffLayout active="dashboard" user={user}>
      <DashboardContent
        data={{
          user,
          // "today" (no real calendar/meetings system exists at all) and
          // "activity" (no real activity-log system exists yet) stay empty.
          metrics: {
            activeProjects: activeProjects.length,
            myTasks: pendingTasks.length,
            completedThisWeek,
            nextDeadline: nextDeadline ?? "—",
          },
          currentFocus: currentFocus
            ? {
                name: currentFocus.name,
                category: currentFocus.category,
                description: currentFocus.description,
                progress: currentFocus.progress,
                role: currentFocus.team.find((m) => m.id === user.staffId)?.role ?? "—",
                team: currentFocus.team.map((m) => ({ id: m.id, initials: m.initials })),
                nextMilestone: currentFocus.nextMilestone,
                href: `/staff/projects/${currentFocus.slug}`,
              }
            : null,
          today: [],
          tasks: myTasks.slice(0, 4),
          announcements: announcements.slice(0, 2),
          activity: [],
        }}
      />
    </StaffLayout>
  );
}
