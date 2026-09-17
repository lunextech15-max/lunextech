import type { Metadata } from "next";
import Link from "next/link";
import InternLayout from "@/components/intern/InternLayout";
import ProgressIndicator from "@/components/staff/dashboard/ProgressIndicator";
import TeamAvatars from "@/components/staff/dashboard/TeamAvatars";
import InternProjectMilestones from "@/components/intern/InternProjectMilestones";
import { getInternUser } from "@/lib/intern/session";
import { getMyInternProject } from "@/lib/intern/real-project";

export const metadata: Metadata = {
  title: "My Project — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternProjectPage() {
  const user = await getInternUser();
  const project = await getMyInternProject(user.id);

  return (
    <InternLayout active="project" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/intern/dashboard" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← My workspace
        </Link>

        {!project ? (
          <div className="mt-10 border border-line p-8 text-center sm:p-12">
            <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">
              No project assigned yet.
            </p>
            <p className="mt-2 text-sm text-soft-white/45">Check back once you&apos;ve been added to a project.</p>
          </div>
        ) : (
          <>
            <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{project.category}</p>
            <h1 className="mt-2 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3.4vw] xl:text-4xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-soft-white/55">{project.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-6 border border-line p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
                <span className={`dash-status dash-status--${project.status} mt-2`}>
                  {project.status === "completed" ? "Completed" : "In progress"}
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

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-10">
                <section aria-labelledby="intern-goal-heading">
                  <h2
                    id="intern-goal-heading"
                    className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
                  >
                    Project goal
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-white/60">
                    {project.goal || "No objective recorded yet."}
                  </p>
                </section>

                <section aria-labelledby="intern-role-heading">
                  <h2
                    id="intern-role-heading"
                    className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
                  >
                    My role
                  </h2>
                  <p className="mt-4 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
                    {project.roleTitle}
                  </p>
                  {project.responsibilities.length > 0 ? (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {project.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-soft-white/65">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-soft-white/45">No responsibilities listed yet.</p>
                  )}
                </section>
              </div>

              <div>
                <InternProjectMilestones milestones={project.milestones} />
              </div>
            </div>
          </>
        )}
      </div>
    </InternLayout>
  );
}
