import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternDashboardContent from "@/components/intern/InternDashboardContent";
import { getInternUser } from "@/lib/intern/session";
import { getMyInternProject } from "@/lib/intern/real-project";
import { getMyInternTasks } from "@/lib/intern/real-tasks";
import { getMyRecentActivity } from "@/lib/staff/activity";
import { getMyLearningProgress } from "@/lib/intern/learning";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternDashboardPage() {
  const user = await getInternUser();
  const [project, tasks, activity, learning] = await Promise.all([
    getMyInternProject(user.id),
    getMyInternTasks(user.id),
    getMyRecentActivity(),
    getMyLearningProgress(user.id),
  ]);

  return (
    <InternLayout active="dashboard" user={user}>
      <InternDashboardContent
        user={user}
        project={project}
        tasks={tasks}
        activity={activity}
        learningPercent={learning.percent}
      />
    </InternLayout>
  );
}
