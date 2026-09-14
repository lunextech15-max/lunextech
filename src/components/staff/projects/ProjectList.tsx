import ProjectRow from "./ProjectRow";
import type { StaffProject } from "@/lib/staff/types";

export default function ProjectList({
  projects,
  onClearFilters,
}: {
  projects: StaffProject[];
  onClearFilters: () => void;
}) {
  if (projects.length === 0) {
    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No projects found.</p>
        <p className="mt-2 text-sm text-soft-white/45">No projects currently match your selection.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="dash-metric-link mt-5 text-xs font-medium tracking-[0.15em] uppercase"
        >
          Clear filters →
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line px-6 sm:px-8">
      {projects.map((project) => (
        <ProjectRow key={project.id} project={project} />
      ))}
    </div>
  );
}
