import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import NotificationsPageContent from "@/components/shared/notifications/NotificationsPageContent";
import { getStaffSession } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "Notifications — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffNotificationsPage() {
  const user = await getStaffSession();

  return (
    <StaffLayout active="notifications" user={user}>
      <NotificationsPageContent breadcrumbNumber="07" />
    </StaffLayout>
  );
}
