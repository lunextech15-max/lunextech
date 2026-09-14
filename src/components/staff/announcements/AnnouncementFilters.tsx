export type AnnouncementFilter = "all" | "general" | "project" | "team" | "system";

const FILTERS: { id: AnnouncementFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "project", label: "Project" },
  { id: "team", label: "Team" },
  { id: "system", label: "System" },
];

export default function AnnouncementFilters({
  available,
  active,
  onChange,
}: {
  available: AnnouncementFilter[];
  active: AnnouncementFilter;
  onChange: (filter: AnnouncementFilter) => void;
}) {
  const filters = FILTERS.filter((f) => f.id === "all" || available.includes(f.id));

  return (
    <div role="tablist" aria-label="Filter announcements" className="flex flex-wrap items-center gap-6">
      {filters.map((filter) => (
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
