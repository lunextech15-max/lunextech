import type { StaffProject } from "@/lib/staff/types";

export default function ProjectsSummary({ projects }: { projects: StaffProject[] }) {
  const active = projects.filter((p) => p.status === "in-progress" || p.status === "review").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const upcoming = projects.filter((p) => p.status === "planning").length;

  const items = [
    { label: "Active projects", value: active },
    { label: "Completed", value: completed },
    { label: "Upcoming", value: upcoming },
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((item) => (
        <p key={item.label} className="flex items-baseline gap-2">
          <span className="font-display text-lg font-black text-soft-white">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
            {item.label}
          </span>
        </p>
      ))}
    </div>
  );
}
