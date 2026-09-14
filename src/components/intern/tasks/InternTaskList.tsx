import InternTaskRow from "./InternTaskRow";
import type { InternTask } from "@/lib/intern/types";

export default function InternTaskList({
  tasks,
  hasAny,
  onClearFilters,
}: {
  tasks: InternTask[];
  hasAny: boolean;
  onClearFilters: () => void;
}) {
  if (tasks.length === 0) {
    if (!hasAny) {
      return (
        <div className="border border-line p-8 text-center sm:p-12">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No tasks found.</p>
          <p className="mt-2 text-sm text-soft-white/45">You&apos;re all caught up.</p>
          <a
            href="/intern/project"
            className="dash-metric-link mt-5 inline-block text-xs font-medium tracking-[0.15em] uppercase"
          >
            Check project →
          </a>
        </div>
      );
    }

    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No tasks found.</p>
        <p className="mt-2 text-sm text-soft-white/45">Try adjusting your search or filters.</p>
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
        <InternTaskRow key={task.id} task={task} number={String(index + 1).padStart(2, "0")} />
      ))}
    </div>
  );
}
