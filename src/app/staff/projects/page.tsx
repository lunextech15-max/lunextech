import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import ProjectsContent from "@/components/staff/projects/ProjectsContent";
import { getStaffSession } from "@/lib/staff/session";
import { getAllRealProjects } from "@/lib/staff/real-projects";

export const metadata: Metadata = {
  title: "Projects — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffProjectsPage() {
  const [user, projects] = await Promise.all([getStaffSession(), getAllRealProjects()]);

  return (
    <StaffLayout active="projects" user={user}>
      <ProjectsContent projects={projects} />
    </StaffLayout>
  );
}
