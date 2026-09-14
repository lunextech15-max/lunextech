import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import ProfileContent from "@/components/staff/profile/ProfileContent";
import { MOCK_STAFF_USER, MOCK_ACTIVITY } from "@/lib/staff/mock-data";
import { MOCK_TEAM, getMemberProjects, getActiveProjectCount, getMemberSinceYear } from "@/lib/staff/team-data";
import { CURRENT_USER_ID, getMyTasks } from "@/lib/staff/tasks-data";

export const metadata: Metadata = {
  title: "My Profile — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffProfilePage() {
  const member = MOCK_TEAM.find((m) => m.initials === CURRENT_USER_ID) ?? MOCK_TEAM[0];
  const myTasks = getMyTasks(CURRENT_USER_ID);

  return (
    <StaffLayout active="profile" user={MOCK_STAFF_USER}>
      <ProfileContent
        member={member}
        memberSince={getMemberSinceYear(member)}
        activeProjects={getActiveProjectCount(member)}
        tasksInProgress={myTasks.filter((t) => t.status === "in-progress").length}
        tasksCompleted={myTasks.filter((t) => t.status === "completed").length}
        projects={getMemberProjects(member)}
        activity={MOCK_ACTIVITY}
      />
    </StaffLayout>
  );
}
