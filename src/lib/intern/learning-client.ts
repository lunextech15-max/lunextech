// Client-only: writes to public.intern_lesson_completions. RLS requires
// staff_id to match the caller's own — see 0016_intern_learning_progress.sql.

"use client";

import { createClient } from "@/lib/supabase/client";

export async function markLessonComplete(
  staffId: string,
  moduleId: string,
  lessonId: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("intern_lesson_completions")
    .insert({ staff_id: staffId, module_id: moduleId, lesson_id: lessonId });
  return { error: error?.message ?? null };
}
