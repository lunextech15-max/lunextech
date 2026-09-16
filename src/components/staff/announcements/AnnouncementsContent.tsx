"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import AnnouncementsHeader from "./AnnouncementsHeader";
import AnnouncementsSummary from "./AnnouncementsSummary";
import AnnouncementFilters, { type AnnouncementFilter } from "./AnnouncementFilters";
import AnnouncementSearch from "./AnnouncementSearch";
import AnnouncementList from "./AnnouncementList";
import { getReadIds } from "@/lib/staff/announcements-read-state";
import type { StaffAnnouncement } from "@/lib/staff/types";
import "@/styles/staff-projects.css";
import "@/styles/staff-announcements.css";

const EMPTY_READ_IDS = new Set<string>();
const noopSubscribe = () => () => {};
const getServerReadIds = () => EMPTY_READ_IDS;

export default function AnnouncementsContent({ announcements }: { announcements: StaffAnnouncement[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AnnouncementFilter>("all");
  const [sortOldestFirst, setSortOldestFirst] = useState(false);
  // localStorage isn't available during SSR, so the server snapshot stays a
  // neutral "all unread" and the real value appears once the client
  // subscribes — same pattern as DashboardHeader's greeting, no
  // server/client markup mismatch, no post-mount setState.
  const readIds = useSyncExternalStore(noopSubscribe, getReadIds, getServerReadIds);

  const availableCategories = useMemo(
    () => Array.from(new Set(announcements.map((a) => a.category))),
    [announcements]
  );

  const sorted = useMemo(() => {
    const list = [...announcements].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return sortOldestFirst ? list : list.reverse();
  }, [announcements, sortOldestFirst]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted
      .filter((a) => category === "all" || a.category === category)
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q)
      );
  }, [sorted, query, category]);


  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <AnnouncementsHeader />
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.06s" }}>
        <AnnouncementsSummary announcements={announcements} readIds={readIds} />
      </div>

      <div
        className="dash-fade mt-8 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between"
        style={{ animationDelay: "0.12s" }}
      >
        <AnnouncementFilters available={availableCategories} active={category} onChange={setCategory} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setSortOldestFirst((v) => !v)}
            className="proj-filter"
          >
            {sortOldestFirst ? "Oldest first" : "Newest first"}
          </button>
          <div className="sm:w-64">
            <AnnouncementSearch value={query} onChange={setQuery} />
          </div>
        </div>
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.18s" }}>
        <AnnouncementList
          announcements={filtered}
          hasAny={announcements.length > 0}
          readIds={readIds}
          onClearFilters={() => {
            setQuery("");
            setCategory("all");
          }}
        />
      </div>
    </div>
  );
}
