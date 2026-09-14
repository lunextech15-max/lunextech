import { DEPARTMENTS } from "@/lib/jobs";

type JobFiltersProps = {
  department: string;
  onDepartmentChange: (department: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
};

export default function JobFilters({ department, onDepartmentChange, search, onSearchChange }: JobFiltersProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-3">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => onDepartmentChange(dept)}
            className={`job-filter-tab ${department === dept ? "is-active" : ""}`}
            aria-pressed={department === dept}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="max-w-xs">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search open positions…"
          aria-label="Search open positions"
          className="apply-input"
        />
      </div>
    </div>
  );
}
