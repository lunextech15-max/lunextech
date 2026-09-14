import Link from "next/link";
import type { StaffAnnouncement } from "@/lib/staff/types";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

export default function AnnouncementRow({
  announcement,
  isRead,
}: {
  announcement: StaffAnnouncement;
  isRead: boolean;
}) {
  return (
    <Link
      href={`/staff/announcements/${announcement.id}`}
      className={`announcement-row group block ${announcement.priority === "important" ? "announcement-important" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="announcement-category text-[10px] font-medium tracking-[0.2em] uppercase">
          {announcement.category}
        </span>
        {!isRead && (
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] text-accent uppercase">
            <span className="announcement-new-dot" aria-hidden />
            New
          </span>
        )}
      </div>

      <p className="announcement-row-title mt-2 text-base font-semibold tracking-wide text-soft-white/85 uppercase">
        {announcement.title}
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft-white/55">{announcement.content}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
          {announcement.authorName} · {formatDate(announcement.createdAt)}
        </p>
        <span className="text-xs font-semibold tracking-[0.15em] text-soft-white/70 uppercase">Read more →</span>
      </div>
    </Link>
  );
}
