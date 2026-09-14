import type { Task } from "@/lib/staff/types";

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To do",
  "in-progress": "In progress",
  "in-review": "In review",
  completed: "Completed",
};

// Rows are visually prepared for a future task-detail route (hover
// affordance + chevron) but not wired to one yet — no fake navigation.
export default function TaskItem({ task, number }: { task: Task; number: string }) {
  return (
    <div className="dash-task">
      <span className="font-display text-xs text-soft-white/30">{number}</span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tracking-wide text-soft-white">{task.title}</p>
        <p className="mt-1 truncate text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
          {task.projectName}
        </p>
      </div>
      <span className={`dash-status dash-status--${task.status}`}>{STATUS_LABEL[task.status]}</span>
      <span className="dash-task-chevron" aria-hidden>
        →
      </span>
    </div>
  );
}
