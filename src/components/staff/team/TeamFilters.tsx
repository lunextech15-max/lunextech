export default function TeamFilters({
  disciplines,
  active,
  onChange,
}: {
  disciplines: string[];
  active: string;
  onChange: (discipline: string) => void;
}) {
  return (
    <div role="tablist" aria-label="Filter team by discipline" className="flex flex-wrap items-center gap-6">
      <button
        type="button"
        role="tab"
        aria-selected={active === "all"}
        onClick={() => onChange("all")}
        className={`proj-filter ${active === "all" ? "is-active" : ""}`}
      >
        All
      </button>
      {disciplines.map((discipline) => (
        <button
          key={discipline}
          type="button"
          role="tab"
          aria-selected={active === discipline}
          onClick={() => onChange(discipline)}
          className={`proj-filter ${active === discipline ? "is-active" : ""}`}
        >
          {discipline}
        </button>
      ))}
    </div>
  );
}
