import ProgressIndicator from "./ProgressIndicator";
import TeamAvatars from "./TeamAvatars";
import type { CurrentFocusProject } from "@/lib/staff/types";

export default function CurrentFocus({ project }: { project: CurrentFocusProject | null }) {
  return (
    <section aria-labelledby="current-focus-heading" className="border border-line p-6 sm:p-8">
      <h2
        id="current-focus-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        Current focus
      </h2>

      {project ? (
        <div className="mt-6">
          <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{project.category}</p>
          <h3 className="mt-2 font-display text-2xl font-black tracking-tight text-soft-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-soft-white/55">{project.description}</p>

          <div className="mt-6 max-w-md">
            <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">Progress</p>
            <div className="mt-3">
              <ProgressIndicator value={project.progress} label={`${project.name} progress`} />
            </div>
          </div>

          <div className="dash-project-info mt-8 grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Your role</p>
              <p className="mt-2 text-sm font-medium text-soft-white">{project.role}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Team</p>
              <div className="mt-2">
                <TeamAvatars team={project.team} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
                Next milestone
              </p>
              <p className="mt-2 text-sm font-medium text-soft-white">{project.nextMilestone}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            {project.href ? (
              <a href={project.href} className="dash-open-project text-xs font-semibold tracking-[0.15em] uppercase">
                Open project <span aria-hidden>→</span>
              </a>
            ) : (
              <span className="dash-open-project is-disabled text-xs font-semibold tracking-[0.15em] uppercase" aria-disabled="true">
                Open project <span aria-hidden>→</span>
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No active projects</p>
          <p className="mt-2 text-sm text-soft-white/45">No projects are currently assigned to you.</p>
        </div>
      )}
    </section>
  );
}
