export default function ProfileOverview({
  name,
  role,
  discipline,
  memberSince,
}: {
  name: string;
  role: string;
  discipline: string;
  memberSince: string;
}) {
  const fields = [
    { label: "Name", value: name },
    { label: "Role", value: role },
    { label: "Discipline", value: discipline },
    { label: "Status", value: "Active" },
    { label: "Member since", value: memberSince },
  ];

  return (
    <section aria-labelledby="profile-overview-heading">
      <h2
        id="profile-overview-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        01 / Profile overview
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-5">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">{field.label}</p>
            <p className="mt-1.5 text-sm font-medium text-soft-white/80">{field.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
