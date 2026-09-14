"use client";

import { useEffect, useMemo, useState } from "react";
import AnnouncementsHeader from "./AnnouncementsHeader";
import AnnouncementsSummary from "./AnnouncementsSummary";
import AnnouncementFilters, { type AnnouncementFilter } from "./AnnouncementFilters";
import AnnouncementSearch from "./AnnouncementSearch";
import AnnouncementList from "./AnnouncementList";
import { getReadIds } from "@/lib/staff/announcements-read-state";
import type { StaffAnnouncement } from "@/lib/staff/types";
import "@/styles/staff-projects.css";
import "@/styles/staff-announcements.css";

// Stands in for the future Supabase fetch — brief and genuine (skeletons
// really are shown while this resolves).
function loadAnnouncements(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 450));
}

export default function AnnouncementsContent({ announcements }: { announcements: StaffAnnouncement[] }) {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AnnouncementFilter>("all");
  const [sortOldestFirst, setSortOldestFirst] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    loadAnnouncements().then(() => {
      if (!cancelled) {
        setReadIds(getReadIds());
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

  if (loading) {
    return (
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="dash-skeleton h-4 w-32" />
        <div className="dash-skeleton mt-4 h-10 w-56" />
        <div className="dash-skeleton mt-8 h-10 w-full" />
        <div className="dash-skeleton mt-6 h-24" />
        <div className="dash-skeleton mt-4 h-24" />
        <div className="dash-skeleton mt-4 h-24" />
      </div>
    );
  }

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
