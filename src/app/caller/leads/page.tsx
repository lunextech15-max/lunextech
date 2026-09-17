import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import LeadsContent from "@/components/caller/LeadsContent";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads } from "@/lib/caller/leads";

export const metadata: Metadata = {
  title: "Leads — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerLeadsPage() {
  const [user, leads] = await Promise.all([getCallerUser(), getMyLeads()]);
  return (
    <CallerLayout active="leads" user={user}>
      <LeadsContent leads={leads} />
    </CallerLayout>
  );
}
