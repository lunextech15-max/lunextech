import Link from "next/link";
import TaskPriority from "@/components/staff/tasks/TaskPriority";
import type { InternTask } from "@/lib/intern/types";

const STATUS_LABEL: Record<InternTask["status"], string> = {
  todo: "To do",
  "in-progress": "In progress",
  "in-review": "In review",
  completed: "Completed",
};

export default function InternNextTasks({ tasks }: { tasks: InternTask[] }) {
  return (
    <section aria-labelledby="intern-next-tasks-heading" className="border border-line p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2
          id="intern-next-tasks-heading"
          className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
        >
          My next tasks
        </h2>
        <span className="text-[11px] font-medium tracking-[0.15em] text-soft-white/30 uppercase">
          {tasks.length}
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="mt-4">
          {tasks.map((task, index) => (
            <Link key={task.id} href={`/intern/tasks/${task.id}`} className="dash-task">
              <span className="font-display text-xs text-soft-white/30">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-wide text-soft-white">{task.title}</p>
                <p className="mt-1 truncate text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                  {task.project}
                </p>
              </div>
              <TaskPriority priority={task.priority} />
              <span className={`dash-status dash-status--${task.status}`}>{STATUS_LABEL[task.status]}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No tasks found</p>
          <p className="mt-2 text-sm text-soft-white/45">You&apos;re all caught up.</p>
        </div>
      )}

      <Link
        href="/intern/tasks"
        className="dash-metric-link mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
      >
        View all tasks →
      </Link>
    </section>
  );
}
