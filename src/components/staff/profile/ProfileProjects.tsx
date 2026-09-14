import Link from "next/link";
import ProgressIndicator from "@/components/staff/dashboard/ProgressIndicator";
import type { StaffProject } from "@/lib/staff/types";

export default function ProfileProjects({ projects }: { projects: StaffProject[] }) {
  return (
    <section aria-labelledby="profile-projects-heading">
      <h2
        id="profile-projects-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        04 / My projects
      </h2>

      {projects.length > 0 ? (
        <div className="mt-4 border-t border-line">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-6 border-b border-line py-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-wide text-soft-white/85 uppercase">
                  {project.name}
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
                  {project.category}
                </p>
                <div className="mt-3 max-w-[180px]">
                  <ProgressIndicator value={project.progress} label={`${project.name} progress`} />
                </div>
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
        <div className="mt-4">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No active projects.</p>
          <p className="mt-2 text-sm text-soft-white/45">New project assignments will appear here.</p>
        </div>
      )}
    </section>
  );
}
