import Link from "next/link";
import TaskPriority from "./TaskPriority";
import type { Task } from "@/lib/staff/types";

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To do",
  "in-progress": "In progress",
  "in-review": "In review",
  completed: "Completed",
};

function formatDueDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}

// Visually prepared for a future task-detail route — links to a real,
// lightweight stub page rather than nowhere.
export default function MyTaskItem({ task, number }: { task: Task; number: string }) {
  return (
    <Link href={`/staff/tasks/${task.id}`} className="task-row group">
      <div>
        <span className="font-display text-xs text-soft-white/30">{number}</span>
        <p className="task-row-title mt-1 text-sm font-semibold tracking-wide text-soft-white/85">
          {task.title}
        </p>
        <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-accent uppercase">{task.projectName}</p>
      </div>

      <div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Priority</p>
        <div className="mt-1">
          <TaskPriority priority={task.priority} />
        </div>
      </div>

      <div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Status</p>
        <span className={`dash-status dash-status--${task.status} mt-1`}>{STATUS_LABEL[task.status]}</span>
      </div>

      <div>
        <p className="text-[9px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Due</p>
        <p className="mt-1 text-sm font-medium text-soft-white/80">{formatDueDate(task.dueDate)}</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-soft-white/70 uppercase">
        Open task
        <span className="task-row-arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
