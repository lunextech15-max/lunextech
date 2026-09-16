import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TasksContent from "@/components/staff/tasks/TasksContent";
import { getStaffSession } from "@/lib/staff/session";
import { CURRENT_USER_ID, getMyTasks } from "@/lib/staff/tasks-data";

export const metadata: Metadata = {
  title: "My Tasks — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffTasksPage() {
  const user = await getStaffSession();
  // Tasks aren't real yet (later phase) — this list is still the mock
  // demo data, keyed to a fake CURRENT_USER_ID rather than this real user.
  return (
    <StaffLayout active="tasks" user={user}>
      <TasksContent tasks={getMyTasks(CURRENT_USER_ID)} />
    </StaffLayout>
  );
}
