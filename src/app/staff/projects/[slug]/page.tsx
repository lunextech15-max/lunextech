import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import ProgressIndicator from "@/components/staff/dashboard/ProgressIndicator";
import TeamAvatars from "@/components/staff/dashboard/TeamAvatars";
import ProjectWorkspace from "@/components/staff/projects/ProjectWorkspace";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_PROJECTS } from "@/lib/staff/projects-data";
import "@/styles/staff-projects.css";

export function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/staff/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  return {
    title: project ? `${project.name} — LUNEX TECH Staff Portal` : "Project — LUNEX TECH Staff Portal",
    robots: { index: false, follow: false },
  };
}

const STATUS_LABEL: Record<string, string> = {
  planning: "Planning",
  "in-progress": "In progress",
  review: "Review",
  completed: "Completed",
  archived: "Archived",
};

export default async function StaffProjectDetailPage({ params }: PageProps<"/staff/projects/[slug]">) {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <StaffLayout active="projects" user={MOCK_STAFF_USER}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link
          href="/staff/projects"
          className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase"
        >
          ← All projects
        </Link>

        <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{project.category}</p>
        <h1 className="mt-2 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3.4vw] xl:text-4xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-soft-white/55">{project.description}</p>

        <div className="mt-10 grid grid-cols-1 gap-6 border border-line p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
            <span className={`dash-status dash-status--${project.status} mt-2`}>
              {STATUS_LABEL[project.status]}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Progress</p>
            <div className="mt-2 max-w-[160px]">
              <ProgressIndicator value={project.progress} label={`${project.name} progress`} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Team</p>
            <div className="mt-2">
              <TeamAvatars team={project.team} />
            </div>
          </div>
        </div>

        <ProjectWorkspace project={project} />
      </div>
    </StaffLayout>
  );
}
