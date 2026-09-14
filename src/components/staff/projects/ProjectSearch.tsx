export default function ProjectSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects…"
        className="proj-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
