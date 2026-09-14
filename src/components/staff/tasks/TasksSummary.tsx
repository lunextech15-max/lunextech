import type { Task } from "@/lib/staff/types";

export default function TasksSummary({ tasks }: { tasks: Task[] }) {
  const pending = tasks.filter((t) => t.status !== "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  const items = [
    { label: "Pending", value: pending },
    { label: "In progress", value: inProgress },
    { label: "Completed", value: completed },
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((item) => (
        <p key={item.label} className="flex items-baseline gap-2">
          <span className="font-display text-lg font-black text-soft-white">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
            {item.label}
          </span>
        </p>
      ))}
    </div>
  );
}
