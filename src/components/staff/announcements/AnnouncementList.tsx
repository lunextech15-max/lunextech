import AnnouncementRow from "./AnnouncementRow";
import type { StaffAnnouncement } from "@/lib/staff/types";

export default function AnnouncementList({
  announcements,
  hasAny,
  readIds,
  onClearFilters,
}: {
  announcements: StaffAnnouncement[];
  hasAny: boolean;
  readIds: Set<string>;
  onClearFilters: () => void;
}) {
  if (announcements.length === 0) {
    if (!hasAny) {
      return (
        <div className="border border-line p-8 text-center sm:p-12">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No new updates.</p>
          <p className="mt-2 text-sm text-soft-white/45">The LUNEX TECH workspace is quiet.</p>
        </div>
      );
    }

    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">
          No announcements found.
        </p>
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
      {announcements.map((announcement) => (
        <AnnouncementRow key={announcement.id} announcement={announcement} isRead={readIds.has(announcement.id)} />
      ))}
    </div>
  );
}
