import type { InternMilestone } from "@/lib/intern/types";

const STATUS_LABEL: Record<InternMilestone["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  upcoming: "Upcoming",
};

export default function InternProjectMilestones({ milestones }: { milestones: InternMilestone[] }) {
  return (
    <section aria-labelledby="intern-milestones-heading">
      <h2
        id="intern-milestones-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        Project milestones
      </h2>
      <ol className="mt-6">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="dash-activity-item">
            <span className="dash-activity-dot" aria-hidden />
            <p className="font-display text-xs text-soft-white/40">{milestone.number}</p>
            <p className="text-sm font-semibold tracking-wide text-soft-white uppercase">{milestone.title}</p>
            <span
              className={`dash-status ${
                milestone.status === "in-progress"
                  ? "dash-status--in-progress"
                  : milestone.status === "completed"
                    ? "dash-status--completed"
                    : "dash-status--todo"
              }`}
            >
              {STATUS_LABEL[milestone.status]}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
