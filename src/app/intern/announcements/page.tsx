import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import { getInternUser } from "@/lib/intern/session";
import { getRealAnnouncements } from "@/lib/staff/real-announcements";
import "@/styles/staff-announcements.css";

export const metadata: Metadata = {
  title: "Announcements — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternAnnouncementsPage() {
  const [user, announcements] = await Promise.all([getInternUser(), getRealAnnouncements()]);
  return (
    <InternLayout active="announcements" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          06 <span className="text-accent">/ Announcements</span>
        </p>
        <h1 className="mt-4 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Announcements
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Updates from LUNEX TECH.</p>

        {announcements.length > 0 ? (
          <div className="mt-10 border border-line px-6 sm:px-8">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`announcement-row ${announcement.priority === "important" ? "announcement-important" : ""}`}
              >
                <p className="announcement-category text-[10px] font-medium tracking-[0.2em] uppercase">
                  {announcement.category}
                </p>
                <p className="announcement-row-title mt-2 text-base font-semibold tracking-wide text-soft-white/85">
                  {announcement.title}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft-white/55">{announcement.content}</p>
                <p className="mt-3 text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                  {announcement.relativeTime}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-line p-8 text-center sm:p-12">
            <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">No announcements</p>
            <p className="mt-2 text-sm text-soft-white/45">Nothing new right now.</p>
          </div>
        )}
      </div>
    </InternLayout>
  );
}
