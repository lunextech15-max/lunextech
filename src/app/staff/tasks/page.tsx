import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TasksContent from "@/components/staff/tasks/TasksContent";
import { getStaffSession } from "@/lib/staff/session";
import { getTasksForAssignee } from "@/lib/staff/real-tasks";

export const metadata: Metadata = {
  title: "My Tasks — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffTasksPage() {
  const user = await getStaffSession();
  const tasks = await getTasksForAssignee(user.staffId);
  return (
    <StaffLayout active="tasks" user={user}>
      <TasksContent tasks={tasks} />
    </StaffLayout>
  );
}
