import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import DashboardContent from "@/components/staff/dashboard/DashboardContent";
import {
  MOCK_ACTIVITY,
  MOCK_CURRENT_FOCUS,
  MOCK_METRICS,
  MOCK_STAFF_USER,
  MOCK_TODAY_TIMELINE,
} from "@/lib/staff/mock-data";
import { CURRENT_USER_ID, getMyTasks } from "@/lib/staff/tasks-data";
import { MOCK_ANNOUNCEMENTS } from "@/lib/staff/announcements-data";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffDashboardPage() {
  const myTasks = getMyTasks(CURRENT_USER_ID);
  const pendingTasks = myTasks.filter((task) => task.status !== "completed").length;

  return (
    <StaffLayout active="dashboard" user={MOCK_STAFF_USER}>
      <DashboardContent
        data={{
          user: MOCK_STAFF_USER,
          metrics: { ...MOCK_METRICS, myTasks: pendingTasks },
          currentFocus: MOCK_CURRENT_FOCUS,
          today: MOCK_TODAY_TIMELINE,
          tasks: myTasks.slice(0, 4),
          announcements: MOCK_ANNOUNCEMENTS.slice(0, 2),
          activity: MOCK_ACTIVITY,
        }}
      />
    </StaffLayout>
  );
}
