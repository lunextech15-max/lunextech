import Link from "next/link";
import AnnouncementItem from "./AnnouncementItem";
import type { StaffAnnouncement } from "@/lib/staff/types";

export default function AnnouncementList({ announcements }: { announcements: StaffAnnouncement[] }) {
  return (
    <section aria-labelledby="announcements-heading" className="border border-line p-6 sm:p-8">
      <h2
        id="announcements-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        Announcements
      </h2>

      {announcements.length > 0 ? (
        <div className="mt-4">
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No announcements</p>
          <p className="mt-2 text-sm text-soft-white/45">Nothing new to share right now.</p>
        </div>
      )}

      <Link
        href="/staff/announcements"
        className="dash-metric-link mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
      >
        View all announcements →
      </Link>
    </section>
  );
}
