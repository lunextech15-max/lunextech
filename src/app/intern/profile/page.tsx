import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import ProgressIndicator from "@/components/staff/dashboard/ProgressIndicator";
import { getInternUser } from "@/lib/intern/session";
import { getMyInternProject } from "@/lib/intern/real-project";
import { getMyInternTasks } from "@/lib/intern/real-tasks";
import { getMyLearningProgress } from "@/lib/intern/learning";
import NotificationPreferencesPanel from "@/components/shared/notifications/NotificationPreferencesPanel";
import { INTERN_JOURNEY } from "@/lib/intern/mock-data";

export const metadata: Metadata = {
  title: "Profile — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

const SKILLS = ["Python", "JavaScript", "React", "Machine Learning", "Git"];

const JOURNEY_STATUS_CLASS: Record<string, string> = {
  completed: "dash-status--completed",
  "in-progress": "dash-status--in-progress",
  upcoming: "dash-status--todo",
};

const JOURNEY_STATUS_LABEL: Record<string, string> = {
  completed: "Completed ✓",
  "in-progress": "In progress",
  upcoming: "Upcoming",
};

export default async function InternProfilePage() {
  const user = await getInternUser();
  const [project, tasks, learning] = await Promise.all([
    getMyInternProject(user.id),
    getMyInternTasks(user.id),
    getMyLearningProgress(user.id),
  ]);
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const taskCompletion = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const currentStage = INTERN_JOURNEY.find((s) => s.status === "in-progress");

  return (
    <InternLayout active="profile" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          07 <span className="text-accent">/ Profile</span>
        </p>
        <h1 className="mt-4 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Profile
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Your LUNEX TECH internship profile.</p>

        <div className="mt-10 flex items-center gap-5">
          <span className="dash-avatar" style={{ width: 56, height: 56, fontSize: 16 }} aria-hidden>
            {user.initials}
          </span>
          <div>
            <h2 className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
              {user.name}
            </h2>
            <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
              {user.role}
            </p>
            <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
              LUNEX TECH
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <section aria-labelledby="intern-info-heading">
              <h2
                id="intern-info-heading"
                className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
              >
                Internship information
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Role</p>
                  <p className="mt-1.5 text-sm font-medium text-soft-white/80">{user.role}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Department</p>
                  <p className="mt-1.5 text-sm font-medium text-soft-white/80">{user.department}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Start date</p>
                  <p className="mt-1.5 text-sm font-medium text-soft-white/80">{user.startDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
                  <span className="dash-status dash-status--in-progress mt-1.5">Active</span>
                </div>
              </div>
            </section>

            <section aria-labelledby="intern-skills-heading">
              <h2
                id="intern-skills-heading"
                className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
              >
                Skills
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {SKILLS.map((skill) => (
                  <li key={skill} className="text-sm text-soft-white/70">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="intern-projects-heading">
              <h2
                id="intern-projects-heading"
                className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
              >
                Projects
              </h2>
              {project ? (
                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <p className="text-sm font-semibold tracking-wide text-soft-white/85 uppercase">{project.name}</p>
                  <span className={`dash-status dash-status--${project.status}`}>
                    {project.status === "completed" ? "Completed" : "In progress"}
                  </span>
                </div>
              ) : (
                <p className="mt-4 text-sm text-soft-white/45">No project assigned yet.</p>
              )}
            </section>
          </div>

          <div className="flex flex-col gap-10">
            <section aria-labelledby="intern-progress-heading">
              <h2
                id="intern-progress-heading"
                className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
              >
                Progress
              </h2>
              <div className="mt-4 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
                    Internship progress
                  </p>
                  <div className="mt-2 max-w-[220px]">
                    <ProgressIndicator value={project?.progress ?? 0} label="Internship progress" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
                    Learning progress
                  </p>
                  <div className="mt-2 max-w-[220px]">
                    <ProgressIndicator value={learning.percent} label="Learning progress" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
                    Task completion
                  </p>
                  <div className="mt-2 max-w-[220px]">
                    <ProgressIndicator value={taskCompletion} label="Task completion" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">Your Journey</p>
          <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-soft-white">
            Track your growth throughout the internship.
          </h2>

          <ol className="mt-8 max-w-2xl">
            {INTERN_JOURNEY.map((stage) => (
              <li key={stage.id} className="dash-activity-item">
                <span className="dash-activity-dot" aria-hidden />
                <p className="font-display text-xs text-soft-white/40">{stage.number}</p>
                <p className="text-sm font-semibold tracking-wide text-soft-white uppercase">{stage.title}</p>
                <span className={`dash-status ${JOURNEY_STATUS_CLASS[stage.status]}`}>
                  {JOURNEY_STATUS_LABEL[stage.status]}
                </span>
              </li>
            ))}
          </ol>

          {currentStage && (
            <div className="mt-8 max-w-xl border border-line p-6 sm:p-8">
              <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">Current phase</p>
              <p className="mt-2 font-display text-xl font-black tracking-tight text-soft-white uppercase">
                {currentStage.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/60">
                You are currently contributing to a real LUNEX TECH project while building practical technical
                skills.
              </p>
            </div>
          )}
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
            Notification preferences
          </h2>
          <div className="mt-4 max-w-lg border border-line px-6 py-2 sm:px-8">
            <NotificationPreferencesPanel staffId={user.id} />
          </div>
        </div>
      </div>
    </InternLayout>
  );
}
