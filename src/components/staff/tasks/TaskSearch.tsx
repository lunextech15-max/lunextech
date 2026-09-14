export default function TaskSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="task-search" className="sr-only">
        Search tasks
      </label>
      <input
        id="task-search"
        type="search"
        placeholder="Search tasks…"
        className="proj-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
