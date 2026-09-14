import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TeamContent from "@/components/staff/team/TeamContent";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_TEAM, getDisciplines } from "@/lib/staff/team-data";
import { MOCK_PROJECTS } from "@/lib/staff/projects-data";

export const metadata: Metadata = {
  title: "Team — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffTeamPage() {
  return (
    <StaffLayout active="team" user={MOCK_STAFF_USER}>
      <TeamContent team={MOCK_TEAM} projects={MOCK_PROJECTS} disciplines={getDisciplines()} />
    </StaffLayout>
  );
}
