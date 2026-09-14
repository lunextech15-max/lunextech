export type WorkspaceSection = "overview" | "tasks" | "activity" | "resources";

const SECTIONS: { id: WorkspaceSection; number: string; label: string }[] = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "tasks", number: "02", label: "Tasks" },
  { id: "activity", number: "03", label: "Activity" },
  { id: "resources", number: "04", label: "Resources" },
];

export default function ProjectWorkspaceNav({
  active,
  onChange,
}: {
  active: WorkspaceSection;
  onChange: (section: WorkspaceSection) => void;
}) {
  return (
    <div role="tablist" aria-label="Project workspace" className="proj-workspace-nav border-b border-line">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          role="tab"
          id={`workspace-tab-${section.id}`}
          aria-selected={section.id === active}
          aria-controls={`workspace-panel-${section.id}`}
          onClick={() => onChange(section.id)}
          className={`proj-tab ${section.id === active ? "is-active" : ""}`}
        >
          <span className="proj-tab-num">{section.number}</span>
          {section.label}
        </button>
      ))}
    </div>
  );
}
