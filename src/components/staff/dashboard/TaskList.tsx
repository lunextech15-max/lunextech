import Link from "next/link";
import TaskItem from "./TaskItem";
import type { Task } from "@/lib/staff/types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <section aria-labelledby="my-tasks-heading" className="border border-line p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2
          id="my-tasks-heading"
          className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
        >
          My tasks
        </h2>
        <span className="text-[11px] font-medium tracking-[0.15em] text-soft-white/30 uppercase">
          {tasks.length}
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="mt-4">
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} number={String(index + 1).padStart(2, "0")} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No tasks</p>
          <p className="mt-2 text-sm text-soft-white/45">You&apos;re all caught up.</p>
        </div>
      )}

      <Link
        href="/staff/tasks"
        className="dash-metric-link mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
      >
        View all tasks →
      </Link>
    </section>
  );
}
