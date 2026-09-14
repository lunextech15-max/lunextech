import MyTaskItem from "./MyTaskItem";
import type { Task } from "@/lib/staff/types";

export default function MyTaskList({
  tasks,
  hasAnyTasks,
  onClearFilters,
}: {
  tasks: Task[];
  hasAnyTasks: boolean;
  onClearFilters: () => void;
}) {
  if (tasks.length === 0) {
    if (!hasAnyTasks) {
      return (
        <div className="border border-line p-8 text-center sm:p-12">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">
            You&apos;re all caught up.
          </p>
          <p className="mt-2 text-sm text-soft-white/45">No active tasks are currently assigned to you.</p>
        </div>
      );
    }

    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No tasks found.</p>
        <p className="mt-2 text-sm text-soft-white/45">No tasks currently match your selection.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="dash-metric-link mt-5 text-xs font-medium tracking-[0.15em] uppercase"
        >
          Clear filters →
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line px-6 sm:px-8">
      {tasks.map((task, index) => (
        <MyTaskItem key={task.id} task={task} number={String(index + 1).padStart(2, "0")} />
      ))}
    </div>
  );
}
