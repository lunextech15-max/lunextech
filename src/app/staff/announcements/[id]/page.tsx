import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import MarkAnnouncementRead from "@/components/staff/announcements/MarkAnnouncementRead";
import { MOCK_STAFF_USER } from "@/lib/staff/mock-data";
import { MOCK_ANNOUNCEMENTS } from "@/lib/staff/announcements-data";
import "@/styles/staff-announcements.css";

export function generateStaticParams() {
  return MOCK_ANNOUNCEMENTS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps<"/staff/announcements/[id]">): Promise<Metadata> {
  const { id } = await params;
  const announcement = MOCK_ANNOUNCEMENTS.find((a) => a.id === id);
  return {
    title: announcement ? `${announcement.title} — LUNEX TECH Staff Portal` : "Announcement — LUNEX TECH Staff Portal",
    robots: { index: false, follow: false },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

export default async function StaffAnnouncementDetailPage({
  params,
}: PageProps<"/staff/announcements/[id]">) {
  const { id } = await params;
  const announcement = MOCK_ANNOUNCEMENTS.find((a) => a.id === id);
  if (!announcement) notFound();

  return (
    <StaffLayout active="announcements" user={MOCK_STAFF_USER}>
      <MarkAnnouncementRead id={announcement.id} />
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link
          href="/staff/announcements"
          className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase"
        >
          ← Announcements
        </Link>

        <p className="announcement-category mt-6 text-[10px] font-medium tracking-[0.2em] uppercase">
          {announcement.category}
        </p>
        <h1 className="mt-2 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          {announcement.title}
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-soft-white/60">{announcement.content}</p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
            {announcement.authorName}
          </p>
          <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-soft-white/30 uppercase">
            {formatDate(announcement.createdAt)}
          </p>
        </div>
      </div>
    </StaffLayout>
  );
}
