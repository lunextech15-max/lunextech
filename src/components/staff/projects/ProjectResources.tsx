import type { ProjectResource } from "@/lib/staff/types";

export default function ProjectResources({ resources }: { resources: ProjectResource[] }) {
  return (
    <div>
      <h2 className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">Project resources</h2>

      {resources.length > 0 ? (
        <ul className="mt-6 divide-y divide-line">
          {resources.map((resource) => (
            <li key={resource.id} className="py-3 text-sm text-soft-white">
              {resource.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">
            No project resources available.
          </p>
          <p className="mt-2 max-w-md text-sm text-soft-white/45">
            Project files, documents and shared resources will appear here when they are added.
          </p>

          <span
            className="dash-quick-action is-disabled mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
            aria-disabled="true"
            title="File storage isn't connected yet"
          >
            <span aria-hidden>+</span> Add resource
          </span>
          <p className="mt-2 text-[11px] text-soft-white/30">File storage isn&apos;t connected yet.</p>
        </div>
      )}
    </div>
  );
}
