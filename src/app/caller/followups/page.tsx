import type { Metadata } from "next";
import Link from "next/link";
import CallerLayout from "@/components/caller/CallerLayout";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads } from "@/lib/caller/leads";
import { STATUS_CLASS, STATUS_LABEL, type Lead } from "@/lib/caller/types";
import "@/styles/caller.css";

export const metadata: Metadata = {
  title: "Follow-ups — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

function FollowUpGroup({ title, leads }: { title: string; leads: Lead[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
        {title} ({leads.length})
      </h2>
      {leads.length > 0 ? (
        <div className="mt-4 border border-line px-6 sm:px-8">
          {leads.map((lead) => (
            <Link key={lead.id} href={`/caller/leads/${lead.id}`} className="lead-row group">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-wide text-soft-white/85 uppercase">{lead.name}</p>
                <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                  {lead.phone} {lead.company && `· ${lead.company}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <p className="text-xs text-soft-white/60">{lead.followUpDate}</p>
                <span className={`dash-status ${STATUS_CLASS[lead.status]}`}>{STATUS_LABEL[lead.status]}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-soft-white/45">Nothing here.</p>
      )}
    </section>
  );
}

export default async function CallerFollowUpsPage() {
  const [user, leads] = await Promise.all([getCallerUser(), getMyLeads()]);
  const today = new Date().toISOString().slice(0, 10);

  const withFollowUp = leads.filter((l) => l.followUpDate);
  const overdue = withFollowUp.filter((l) => l.followUpDate! < today);
  const dueToday = withFollowUp.filter((l) => l.followUpDate === today);
  const upcoming = withFollowUp.filter((l) => l.followUpDate! > today);

  return (
    <CallerLayout active="followups" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          05 <span className="text-accent">/ Follow-ups</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Follow-ups.
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Leads with a scheduled follow-up date.</p>

        <FollowUpGroup title="Overdue" leads={overdue} />
        <FollowUpGroup title="Due today" leads={dueToday} />
        <FollowUpGroup title="Upcoming" leads={upcoming} />
      </div>
    </CallerLayout>
  );
}
