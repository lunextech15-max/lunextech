export default function TaskProjectFilter({
  projects,
  active,
  onChange,
}: {
  projects: string[];
  active: string;
  onChange: (project: string) => void;
}) {
  return (
    <div>
      <label htmlFor="task-project-filter" className="sr-only">
        Filter by project
      </label>
      <select
        id="task-project-filter"
        className="task-project-select"
        value={active}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">All projects</option>
        {projects.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
    </div>
  );
}
