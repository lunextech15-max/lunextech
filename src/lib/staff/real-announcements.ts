// Server-only: reads real announcements from Supabase public.announcements.
// Replaces MOCK_ANNOUNCEMENTS (announcements-data.ts). RLS
// (0012_announcements.sql): staff/admin see everything (drafts included);
// interns see only published rows meant for them.

import { createClient } from "@/lib/supabase/server";
import type { AnnouncementCategory, AnnouncementPriority, StaffAnnouncement } from "./types";

type AnnouncementRow = {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  author_staff_id: string;
  created_at: string;
};

type StaffNameRow = { staff_id: string; full_name: string };

function formatRelative(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export async function getRealAnnouncements(): Promise<StaffAnnouncement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getRealAnnouncements: query failed", error);
    return [];
  }

  const rows = (data ?? []) as AnnouncementRow[];
  const authorIds = Array.from(new Set(rows.map((r) => r.author_staff_id)));
  const { data: staffRows } = authorIds.length
    ? await supabase.from("staff").select("staff_id, full_name").in("staff_id", authorIds)
    : { data: [] as StaffNameRow[] };
  const nameByStaffId = new Map(((staffRows ?? []) as StaffNameRow[]).map((s) => [s.staff_id, s.full_name]));

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    priority: row.priority,
    authorId: row.author_staff_id,
    authorName: nameByStaffId.get(row.author_staff_id) ?? row.author_staff_id,
    createdAt: row.created_at.slice(0, 10),
    relativeTime: formatRelative(row.created_at),
  }));
}

export async function getRealAnnouncement(id: string): Promise<StaffAnnouncement | null> {
  const announcements = await getRealAnnouncements();
  return announcements.find((a) => a.id === id) ?? null;
}
