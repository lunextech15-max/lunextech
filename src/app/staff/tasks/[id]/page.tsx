import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import TaskWorkspace from "@/components/staff/tasks/TaskWorkspace";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_TASKS } from "@/lib/staff/tasks-data";
import { MOCK_PROJECTS } from "@/lib/staff/projects-data";
import "@/styles/staff-tasks.css";
import "@/styles/staff-task-detail.css";

export function generateStaticParams() {
  return MOCK_TASKS.map((task) => ({ id: task.id }));
}

export async function generateMetadata({ params }: PageProps<"/staff/tasks/[id]">): Promise<Metadata> {
  const { id } = await params;
  const task = MOCK_TASKS.find((t) => t.id === id);
  return {
    title: task ? `${task.title} — LUNEX TECH Staff Portal` : "Task — LUNEX TECH Staff Portal",
    robots: { index: false, follow: false },
  };
}

export default async function StaffTaskDetailPage({ params }: PageProps<"/staff/tasks/[id]">) {
  const { id } = await params;
  const task = MOCK_TASKS.find((t) => t.id === id);
  if (!task) notFound();

  const project = MOCK_PROJECTS.find((p) => p.code === task.projectId);

  return (
    <StaffLayout active="tasks" user={MOCK_STAFF_USER}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/staff/tasks" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← All tasks
        </Link>

        <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{task.projectName}</p>
        <h1 className="mt-2 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          {task.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">{task.id}</span>
          {project && (
            <Link
              href={`/staff/projects/${project.slug}`}
              className="dash-metric-link text-[11px] font-medium tracking-[0.15em] uppercase"
            >
              View project →
            </Link>
          )}
        </div>

        <div className="mt-8">
          <TaskWorkspace task={task} />
        </div>
      </div>
    </StaffLayout>
  );
}
