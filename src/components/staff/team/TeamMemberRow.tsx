import Link from "next/link";
import { getActiveProjectCount } from "@/lib/staff/team-data";
import { CURRENT_USER_ID } from "@/lib/staff/tasks-data";
import type { StaffTeamMember } from "@/lib/staff/types";

export default function TeamMemberRow({ member }: { member: StaffTeamMember }) {
  const activeProjects = getActiveProjectCount(member);
  const isCurrentUser = member.initials === CURRENT_USER_ID;

  return (
    <Link href={`/staff/team/${member.id}`} className="team-row group">
      <div className="flex items-center gap-4">
        <span className="dash-avatar" aria-hidden>
          {member.initials}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="team-row-name truncate text-sm font-semibold tracking-wide text-soft-white/85 uppercase">
              {member.name}
            </p>
            {isCurrentUser && <span className="team-you-badge">YOU</span>}
          </div>
          <p className="mt-1 truncate text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
            {member.role}
          </p>
        </div>
      </div>

      <div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Discipline</p>
        <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-accent uppercase">{member.discipline}</p>
      </div>

      <div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Skills</p>
        <p className="mt-1 text-sm">
          {member.skills.map((skill) => (
            <span key={skill} className="team-skill text-[13px]">
              {skill}
            </span>
          ))}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end lg:justify-center lg:gap-2">
        <p className="text-[11px] font-medium tracking-[0.15em] text-soft-white/50 uppercase">
          {String(activeProjects).padStart(2, "0")} active {activeProjects === 1 ? "project" : "projects"}
        </p>
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-soft-white/70 uppercase">
          View profile
          <span className="team-row-arrow" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
