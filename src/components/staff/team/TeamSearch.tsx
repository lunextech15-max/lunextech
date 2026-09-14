export default function TeamSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="team-search" className="sr-only">
        Search team
      </label>
      <input
        id="team-search"
        type="search"
        placeholder="Search team…"
        className="proj-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
