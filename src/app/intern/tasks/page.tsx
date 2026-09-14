import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternTasksContent from "@/components/intern/tasks/InternTasksContent";
import { INTERN_USER, INTERN_TASKS } from "@/lib/intern/mock-data";

export const metadata: Metadata = {
  title: "My Tasks — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default function InternTasksPage() {
  return (
    <InternLayout active="tasks" user={INTERN_USER}>
      <InternTasksContent tasks={INTERN_TASKS} />
    </InternLayout>
  );
}
