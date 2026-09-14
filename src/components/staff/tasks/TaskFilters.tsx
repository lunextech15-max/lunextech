export type TaskFilter = "all" | "todo" | "in-progress" | "in-review" | "completed";

const FILTERS: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "todo", label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "in-review", label: "In review" },
  { id: "completed", label: "Completed" },
];

export default function TaskFilters({
  active,
  onChange,
}: {
  active: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}) {
  return (
    <div role="tablist" aria-label="Filter tasks" className="flex flex-wrap items-center gap-6">
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
