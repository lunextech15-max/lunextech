import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import CallQueueContent from "@/components/caller/CallQueueContent";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads } from "@/lib/caller/leads";

export const metadata: Metadata = {
  title: "Call Queue — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerQueuePage() {
  const [user, leads] = await Promise.all([getCallerUser(), getMyLeads()]);
  return (
    <CallerLayout active="queue" user={user}>
      <CallQueueContent leads={leads} callerStaffId={user.staffId} />
    </CallerLayout>
  );
}
