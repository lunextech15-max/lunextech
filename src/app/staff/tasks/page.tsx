import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TasksContent from "@/components/staff/tasks/TasksContent";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { CURRENT_USER_ID, getMyTasks } from "@/lib/staff/tasks-data";

export const metadata: Metadata = {
  title: "My Tasks — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default function StaffTasksPage() {
  return (
    <StaffLayout active="tasks" user={MOCK_STAFF_USER}>
      <TasksContent tasks={getMyTasks(CURRENT_USER_ID)} />
    </StaffLayout>
  );
}
