export default function AnnouncementSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="announcement-search" className="sr-only">
        Search announcements
      </label>
      <input
        id="announcement-search"
        type="search"
        placeholder="Search announcements…"
        className="proj-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
