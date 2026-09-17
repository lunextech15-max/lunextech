import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CallerLayout from "@/components/caller/CallerLayout";
import LeadWorkspace from "@/components/caller/LeadWorkspace";
import { getCallerUser } from "@/lib/caller/session";
import { getLead, getLeadCalls } from "@/lib/caller/leads";

export async function generateMetadata({ params }: PageProps<"/caller/leads/[id]">): Promise<Metadata> {
  const { id } = await params;
  const lead = await getLead(id);
  return {
    title: lead ? `${lead.name} — LUNEX TECH Cold Caller Portal` : "Lead — LUNEX TECH Cold Caller Portal",
    robots: { index: false, follow: false },
  };
}

export default async function CallerLeadDetailPage({ params }: PageProps<"/caller/leads/[id]">) {
  const { id } = await params;
  const [user, lead] = await Promise.all([getCallerUser(), getLead(id)]);
  if (!lead) notFound();
  const calls = await getLeadCalls(lead.id);

  return (
    <CallerLayout active="leads" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/caller/leads" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← All leads
        </Link>

        <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
          {lead.company || "Lead"}
        </p>
        <h1 className="mt-2 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          {lead.name}
        </h1>

        <LeadWorkspace lead={lead} calls={calls} callerStaffId={user.staffId} />
      </div>
    </CallerLayout>
  );
}
