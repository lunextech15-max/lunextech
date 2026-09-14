import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import AnnouncementsContent from "@/components/staff/announcements/AnnouncementsContent";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_ANNOUNCEMENTS } from "@/lib/staff/announcements-data";

export const metadata: Metadata = {
  title: "Announcements — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffAnnouncementsPage() {
  return (
    <StaffLayout active="announcements" user={MOCK_STAFF_USER}>
      <AnnouncementsContent announcements={MOCK_ANNOUNCEMENTS} />
    </StaffLayout>
  );
}
