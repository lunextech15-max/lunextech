import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import NotificationsPageContent from "@/components/shared/notifications/NotificationsPageContent";
import { getInternUser } from "@/lib/intern/session";

export const metadata: Metadata = {
  title: "Notifications — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternNotificationsPage() {
  const user = await getInternUser();

  return (
    <InternLayout active="notifications" user={user}>
      <NotificationsPageContent breadcrumbNumber="08" />
    </InternLayout>
  );
}
