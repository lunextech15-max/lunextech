import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternDashboardContent from "@/components/intern/InternDashboardContent";
import {
  INTERN_USER,
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

export default function InternDashboardPage() {
  return (
    <InternLayout active="dashboard" user={INTERN_USER}>
      <InternDashboardContent
        user={INTERN_USER}
        project={INTERN_PROJECT}
        tasks={INTERN_TASKS}
        activity={INTERN_ACTIVITY}
        learningPercent={getLearningProgress().percent}
      />
    </InternLayout>
  );
}
