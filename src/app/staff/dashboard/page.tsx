import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import DashboardContent from "@/components/staff/dashboard/DashboardContent";
import { getStaffSession } from "@/lib/staff/session";
import { getProjectsForMember } from "@/lib/staff/real-projects";
import { MOCK_ANNOUNCEMENTS } from "@/lib/staff/announcements-data";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffDashboardPage() {
  const user = await getStaffSession();
  const myProjects = await getProjectsForMember(user.staffId);
  const activeProjects = myProjects.filter((p) => p.status === "in-progress" || p.status === "review");
  // Highest-progress active project stands in for "current focus" until a
  // real assignment-priority concept exists.
  const currentFocus = activeProjects.sort((a, b) => b.progress - a.progress)[0] ?? null;

  return (
    <StaffLayout active="dashboard" user={user}>
      <DashboardContent
        data={{
          user,
          // Tasks aren't real yet (later phase) — honestly 0/empty rather
          // than inventing numbers. Same for "today" (no real calendar/
          // meetings system exists at all) and "activity" (no real
          // activity-log system exists yet).
          metrics: {
            activeProjects: activeProjects.length,
            myTasks: 0,
            completedThisWeek: 0,
            nextDeadline: "—",
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
          tasks: [],
          announcements: MOCK_ANNOUNCEMENTS.slice(0, 2),
          activity: [],
        }}
      />
    </StaffLayout>
  );
}
