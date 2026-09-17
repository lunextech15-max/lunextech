import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternTasksContent from "@/components/intern/tasks/InternTasksContent";
import { getInternUser } from "@/lib/intern/session";
import { getMyInternTasks } from "@/lib/intern/real-tasks";

export const metadata: Metadata = {
  title: "My Tasks — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternTasksPage() {
  const user = await getInternUser();
  const tasks = await getMyInternTasks(user.id);
  return (
    <InternLayout active="tasks" user={user}>
      <InternTasksContent tasks={tasks} />
    </InternLayout>
  );
}
