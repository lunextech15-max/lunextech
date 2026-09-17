// Server-only: reads admin-authored call scripts from Supabase
// public.call_scripts. RLS (0013_cold_caller_portal.sql): admin + caller
// can read; only admin can write.

import { createClient } from "@/lib/supabase/server";
import type { CallScript } from "./types";

type ScriptRow = { id: string; title: string; category: string; content: string };

export async function getCallScripts(): Promise<CallScript[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("call_scripts")
    .select("id, title, category, content")
    .order("position", { ascending: true });

  if (error) {
    console.error("getCallScripts: query failed", error);
    return [];
  }

  return (data ?? []) as ScriptRow[];
}
