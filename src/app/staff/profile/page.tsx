import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import ProfileContent from "@/components/staff/profile/ProfileContent";
import { getStaffSession } from "@/lib/staff/session";
import { getTeamMember, getStaffJoinedYear } from "@/lib/staff/real-team";
import { getProjectsForMember } from "@/lib/staff/real-projects";

export const metadata: Metadata = {
  title: "My Profile — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffProfilePage() {
  const user = await getStaffSession();
  const [member, memberSince, projects] = await Promise.all([
    getTeamMember(user.staffId),
    getStaffJoinedYear(user.staffId),
    getProjectsForMember(user.staffId),
  ]);
  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "review").length;

  return (
    <StaffLayout active="profile" user={user}>
      <ProfileContent
        member={member ?? { id: user.id, name: user.name, initials: user.initials, role: "—", discipline: "—", skills: [], projectIds: [], status: "active" }}
        memberSince={memberSince}
        activeProjects={activeProjects}
        // Tasks aren't real yet (later phase) — honestly 0 rather than
        // inventing numbers.
        tasksInProgress={0}
        tasksCompleted={0}
        projects={projects}
        activity={[]}
      />
    </StaffLayout>
  );
}
