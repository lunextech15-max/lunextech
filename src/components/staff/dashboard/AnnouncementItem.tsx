import type { StaffAnnouncement } from "@/lib/staff/types";

export default function AnnouncementItem({ announcement }: { announcement: StaffAnnouncement }) {
  return (
    <div className="dash-announcement">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold tracking-wide text-soft-white uppercase">{announcement.title}</p>
        <span className="shrink-0 text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
          {announcement.relativeTime}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-soft-white/55">{announcement.content}</p>
    </div>
  );
}
