import Link from "next/link";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";

export default function AnnouncementNotFound() {
  return (
    <StaffLayout active="announcements" user={MOCK_STAFF_USER}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          08 <span className="text-accent">/ Announcements</span>
        </p>
        <h1 className="mt-6 font-display text-3xl font-black tracking-tight text-soft-white uppercase">
          Announcement not found.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-soft-white/50">
          The requested announcement could not be found.
        </p>

        <Link
          href="/staff/announcements"
          className="dash-metric-link mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
        >
          ← Return to announcements
        </Link>
      </div>
    </StaffLayout>
  );
}
