import TeamMemberRow from "./TeamMemberRow";
import type { StaffTeamMember } from "@/lib/staff/types";

export default function TeamMemberList({
  members,
  onClearFilters,
}: {
  members: StaffTeamMember[];
  onClearFilters: () => void;
}) {
  if (members.length === 0) {
    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No team members found.</p>
        <p className="mt-2 text-sm text-soft-white/45">Try adjusting your search or filters.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="dash-metric-link mt-5 text-xs font-medium tracking-[0.15em] uppercase"
        >
          Clear filters →
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line px-6 sm:px-8">
      {members.map((member) => (
        <TeamMemberRow key={member.id} member={member} />
      ))}
    </div>
  );
}
