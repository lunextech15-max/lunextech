import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import ProjectsContent from "@/components/staff/projects/ProjectsContent";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_PROJECTS } from "@/lib/staff/projects-data";

export const metadata: Metadata = {
  title: "Projects — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffProjectsPage() {
  return (
    <StaffLayout active="projects" user={MOCK_STAFF_USER}>
      <ProjectsContent projects={MOCK_PROJECTS} />
    </StaffLayout>
  );
}
