import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import AnnouncementsContent from "@/components/staff/announcements/AnnouncementsContent";
import { getStaffSession } from "@/lib/staff/session";
import { getRealAnnouncements } from "@/lib/staff/real-announcements";

export const metadata: Metadata = {
  title: "Announcements — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffAnnouncementsPage() {
  const [user, announcements] = await Promise.all([getStaffSession(), getRealAnnouncements()]);
  return (
    <StaffLayout active="announcements" user={user}>
      <AnnouncementsContent announcements={announcements} />
    </StaffLayout>
  );
}
