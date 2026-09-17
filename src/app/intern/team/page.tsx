import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import { getInternUser } from "@/lib/intern/session";
import { getAllTeamMembers } from "@/lib/staff/real-team";

export const metadata: Metadata = {
  title: "Team — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternTeamPage() {
  const [user, team] = await Promise.all([getInternUser(), getAllTeamMembers()]);

  return (
    <InternLayout active="team" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          05 <span className="text-accent">/ Team</span>
        </p>
        <h1 className="mt-4 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Team
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">People you&apos;re building with.</p>

        {team.length > 0 ? (
          <div className="mt-10 border border-line px-6 sm:px-8">
            {team.map((member) => (
              <div key={member.id} className="flex items-center gap-4 border-t border-line py-6 first:border-t-0">
                <span className="dash-avatar" aria-hidden>
                  {member.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-wide text-soft-white uppercase">
                    {member.name}
                  </p>
                  <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-accent uppercase">
                    {member.role}
                  </p>
                  <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                    {member.discipline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-soft-white/45">No team members yet.</p>
        )}
      </div>
    </InternLayout>
  );
}
