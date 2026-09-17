import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternDashboardContent from "@/components/intern/InternDashboardContent";
import { getInternUser } from "@/lib/intern/session";
import {
  INTERN_PROJECT,
  INTERN_TASKS,
  INTERN_ACTIVITY,
  getLearningProgress,
} from "@/lib/intern/mock-data";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternDashboardPage() {
  const user = await getInternUser();
  return (
    <InternLayout active="dashboard" user={user}>
      <InternDashboardContent
        user={user}
        project={INTERN_PROJECT}
        tasks={INTERN_TASKS}
        activity={INTERN_ACTIVITY}
        learningPercent={getLearningProgress().percent}
      />
    </InternLayout>
  );
}
