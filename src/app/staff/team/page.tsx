import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TeamContent from "@/components/staff/team/TeamContent";
import { getStaffSession } from "@/lib/staff/session";
import { getAllTeamMembers } from "@/lib/staff/real-team";
import { getAllRealProjects } from "@/lib/staff/real-projects";

export const metadata: Metadata = {
  title: "Team — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffTeamPage() {
  const [user, team, projects] = await Promise.all([getStaffSession(), getAllTeamMembers(), getAllRealProjects()]);
  const disciplines = Array.from(new Set(team.map((m) => m.discipline).filter((d) => d !== "—")));

  return (
    <StaffLayout active="team" user={user}>
      <TeamContent team={team} projects={projects} disciplines={disciplines} />
    </StaffLayout>
  );
}
