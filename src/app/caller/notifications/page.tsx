import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import NotificationsPageContent from "@/components/shared/notifications/NotificationsPageContent";
import { getCallerUser } from "@/lib/caller/session";

export const metadata: Metadata = {
  title: "Notifications — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerNotificationsPage() {
  const user = await getCallerUser();

  return (
    <CallerLayout active="notifications" user={user}>
      <NotificationsPageContent breadcrumbNumber="08" />
    </CallerLayout>
  );
}
