import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_TEAM, getMemberProjects } from "@/lib/staff/team-data";
import "@/styles/staff-team.css";

export function generateStaticParams() {
  return MOCK_TEAM.map((member) => ({ id: member.id }));
}

export async function generateMetadata({ params }: PageProps<"/staff/team/[id]">): Promise<Metadata> {
  const { id } = await params;
  const member = MOCK_TEAM.find((m) => m.id === id);
  return {
    title: member ? `${member.name} — LUNEX TECH Staff Portal` : "Team member — LUNEX TECH Staff Portal",
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

export default async function StaffTeamMemberPage({ params }: PageProps<"/staff/team/[id]">) {
  const { id } = await params;
  const member = MOCK_TEAM.find((m) => m.id === id);
  if (!member) notFound();

  const projects = getMemberProjects(member);

  return (
    <StaffLayout active="team" user={MOCK_STAFF_USER}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/staff/team" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← Team
        </Link>

        <div className="mt-6 flex items-center gap-5">
          <span className="dash-avatar" style={{ width: 56, height: 56, fontSize: 16 }} aria-hidden>
            {member.initials}
          </span>
          <div>
            <h1 className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
              {member.name}
            </h1>
            <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-accent uppercase">{member.role}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section aria-labelledby="member-profile-heading">
            <h2
              id="member-profile-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
            >
              01 / Profile
            </h2>

            <div className="mt-4">
              <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Discipline</p>
              <p className="mt-1.5 text-sm font-medium text-soft-white">{member.discipline}</p>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Skills</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {member.skills.map((skill) => (
                  <li key={skill} className="text-sm text-soft-white/70">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="member-projects-heading">
            <h2
              id="member-projects-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
            >
              02 / Projects
            </h2>

            {projects.length > 0 ? (
              <div className="mt-4 border-t border-line">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between gap-4 border-b border-line py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-wide text-soft-white/85 uppercase">
                        {project.name}
                      </p>
                      <span className={`dash-status dash-status--${project.status} mt-1`}>
                        {STATUS_LABEL[project.status]}
                      </span>
                    </div>
                    <Link
                      href={`/staff/projects/${project.slug}`}
                      className="dash-metric-link shrink-0 text-xs font-medium tracking-[0.15em] uppercase"
                    >
                      View project →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-soft-white/45">Not currently assigned to any projects.</p>
            )}
          </section>
        </div>
      </div>
    </StaffLayout>
  );
}
