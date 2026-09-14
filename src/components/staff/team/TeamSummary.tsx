import { getDisciplines } from "@/lib/staff/team-data";
import type { StaffProject, StaffTeamMember } from "@/lib/staff/types";

export default function TeamSummary({
  team,
  projects,
}: {
  team: StaffTeamMember[];
  projects: StaffProject[];
}) {
  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "review").length;
  const disciplines = getDisciplines().length;

  const items = [
    { label: "Team members", value: team.length },
    { label: "Active projects", value: activeProjects },
    { label: "Disciplines", value: disciplines },
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
