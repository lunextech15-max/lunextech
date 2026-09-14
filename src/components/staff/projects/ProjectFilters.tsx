export type ProjectFilter = "all" | "active" | "completed" | "archived";

const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "archived", label: "Archived" },
];

export default function ProjectFilters({
  active,
  onChange,
}: {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}) {
  return (
    <div role="tablist" aria-label="Filter projects" className="flex items-center gap-6">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          role="tab"
          aria-selected={filter.id === active}
          onClick={() => onChange(filter.id)}
          className={`proj-filter ${filter.id === active ? "is-active" : ""}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
