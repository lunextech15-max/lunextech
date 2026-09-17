// Server-only: reads real activity from Supabase public.activity_log. RLS
// (0014_activity_log.sql): admin sees everyone's; everyone else sees only
// their own.

import { createClient } from "@/lib/supabase/server";
import type { ActivityItem } from "./types";

type ActivityRow = {
  id: string;
  category: string;
  action: string;
  target_label: string;
  created_at: string;
};

function formatRelative(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** The signed-in user's own recent activity (RLS-scoped), most recent
 * first. Used by Staff/Intern/Caller dashboard "recent activity" widgets. */
export async function getMyRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getMyRecentActivity: query failed", error);
    return [];
  }

  return ((data ?? []) as ActivityRow[]).map((row) => ({
    id: row.id,
    label: row.action,
    detail: row.target_label,
    relativeTime: formatRelative(row.created_at),
  }));
}
