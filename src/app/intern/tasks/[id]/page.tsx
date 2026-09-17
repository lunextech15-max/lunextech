import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InternLayout from "@/components/intern/InternLayout";
import InternTaskWorkspace from "@/components/intern/tasks/InternTaskWorkspace";
import { getInternUser } from "@/lib/intern/session";
import { getInternTask } from "@/lib/intern/real-tasks";
import "@/styles/staff-tasks.css";
import "@/styles/staff-task-detail.css";

export async function generateMetadata({ params }: PageProps<"/intern/tasks/[id]">): Promise<Metadata> {
  const { id } = await params;
  const task = await getInternTask(id);
  return {
    title: task ? `${task.title} — LUNEX TECH Intern Portal` : "Task — LUNEX TECH Intern Portal",
    robots: { index: false, follow: false },
  };
}

export default async function InternTaskDetailPage({ params }: PageProps<"/intern/tasks/[id]">) {
  const { id } = await params;
  const [task, user] = await Promise.all([getInternTask(id), getInternUser()]);
  if (!task) notFound();

  return (
    <InternLayout active="tasks" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/intern/tasks" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← All tasks
        </Link>

        <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{task.project}</p>
        <h1 className="mt-2 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          {task.title}
        </h1>

        <InternTaskWorkspace task={task} viewer={{ staffId: user.id, name: user.name }} />
      </div>
    </InternLayout>
  );
}
