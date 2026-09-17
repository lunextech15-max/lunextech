// Server-only: overlays real per-intern completion (public
// .intern_lesson_completions, 0016_intern_learning_progress.sql) onto the
// static curriculum content in mock-data.ts. The lesson/module titles,
// topics, and lesson text stay authored content — only "is this lesson
// done" becomes real, computed per signed-in intern instead of the same
// hardcoded state for everyone.

import { createClient } from "@/lib/supabase/server";
import { INTERN_LEARNING_MODULES } from "./mock-data";
import type { InternLearningModule, InternLesson } from "./types";

async function getCompletedKeys(staffId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("intern_lesson_completions")
    .select("module_id, lesson_id")
    .eq("staff_id", staffId);

  if (error) {
    console.error(`getCompletedKeys: query failed for ${staffId}`, error);
    return new Set();
  }

  return new Set((data ?? []).map((row) => `${row.module_id}:${row.lesson_id}`));
}

/** The full curriculum with real per-intern status: a lesson is completed
 * if there's a real completion row; the first not-yet-completed lesson in
 * the whole sequence is "in-progress" (the current one to work on);
 * everything after it is "locked". Module status/progress follows from
 * its lessons. */
export async function getMyLearningModules(staffId: string): Promise<InternLearningModule[]> {
  const completed = await getCompletedKeys(staffId);
  let foundCurrent = false;

  return INTERN_LEARNING_MODULES.map((module) => {
    const lessons: InternLesson[] = module.lessons.map((lesson) => {
      const key = `${module.id}:${lesson.id}`;
      if (completed.has(key)) {
        return { ...lesson, status: "completed" };
      }
      if (!foundCurrent) {
        foundCurrent = true;
        return { ...lesson, status: "in-progress" };
      }
      return { ...lesson, status: "locked" };
    });

    const completedCount = lessons.filter((l) => l.status === "completed").length;
    const moduleStatus =
      completedCount === lessons.length
        ? "completed"
        : lessons.some((l) => l.status !== "locked")
          ? "in-progress"
          : "locked";

    return {
      ...module,
      status: moduleStatus,
      progress: moduleStatus === "in-progress" ? Math.round((completedCount / lessons.length) * 100) : undefined,
      lessons,
    };
  });
}

export async function getMyLearningProgress(
  staffId: string
): Promise<{ completed: number; total: number; percent: number }> {
  const modules = await getMyLearningModules(staffId);
  const total = modules.length;
  const completed = modules.filter((m) => m.status === "completed").length;
  const percentSum = modules.reduce((sum, m) => {
    if (m.status === "completed") return sum + 100;
    if (m.status === "in-progress") return sum + (m.progress ?? 0);
    return sum;
  }, 0);
  return { completed, total, percent: total > 0 ? Math.round(percentSum / total) : 0 };
}
