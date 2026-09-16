import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import AnnouncementsContent from "@/components/staff/announcements/AnnouncementsContent";
import { getStaffSession } from "@/lib/staff/session";
import { MOCK_ANNOUNCEMENTS } from "@/lib/staff/announcements-data";

export const metadata: Metadata = {
  title: "Announcements — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffAnnouncementsPage() {
  const user = await getStaffSession();
  // Announcements aren't real yet (later phase) — still mock demo data.
  return (
    <StaffLayout active="announcements" user={user}>
      <AnnouncementsContent announcements={MOCK_ANNOUNCEMENTS} />
    </StaffLayout>
  );
}
