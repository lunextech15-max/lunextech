import type { StaffAnnouncement } from "@/lib/staff/types";

export default function AnnouncementsSummary({
  announcements,
  readIds,
}: {
  announcements: StaffAnnouncement[];
  readIds: Set<string>;
}) {
  const total = announcements.length;
  const unread = announcements.filter((a) => !readIds.has(a.id)).length;
  const important = announcements.filter((a) => a.priority === "important").length;

  const items = [
    { label: "Total updates", value: total },
    { label: "New", value: unread },
    { label: "Important", value: important },
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
