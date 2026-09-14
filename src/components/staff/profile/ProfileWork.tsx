export default function ProfileWork({
  activeProjects,
  tasksInProgress,
  tasksCompleted,
}: {
  activeProjects: number;
  tasksInProgress: number;
  tasksCompleted: number;
}) {
  const items = [
    { label: "Active projects", value: activeProjects },
    { label: "Tasks in progress", value: tasksInProgress },
    { label: "Tasks completed", value: tasksCompleted },
  ];

  return (
    <section aria-labelledby="profile-work-heading">
      <h2 id="profile-work-heading" className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
        03 / My work
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="border border-line p-4">
            <p className="font-display text-2xl font-black text-soft-white">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
