import type { ActivityItem } from "@/lib/staff/types";

export default function RecentActivity({
  items,
  title = "Recent activity",
  emptyTitle = "No activity yet",
  emptyDescription = "Activity will appear here as work happens.",
}: {
  items: ActivityItem[];
  title?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  return (
    <section aria-labelledby="recent-activity-heading" className="border border-line p-6 sm:p-8">
      <h2
        id="recent-activity-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        {title}
      </h2>

      {items.length > 0 ? (
        <ol className="mt-6">
          {items.map((item) => (
            <li key={item.id} className="dash-activity-item">
              <span className="dash-activity-dot" aria-hidden />
              <p className="text-[11px] font-medium tracking-[0.15em] text-soft-white/45 uppercase">
                {item.label}
              </p>
              <p className="text-sm text-soft-white">{item.detail}</p>
              <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
                {item.relativeTime}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">{emptyTitle}</p>
          <p className="mt-2 text-sm text-soft-white/45">{emptyDescription}</p>
        </div>
      )}
    </section>
  );
}
