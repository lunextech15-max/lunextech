"use client";

import { useState } from "react";
import type { InternLesson } from "@/lib/intern/types";

const STATUS_LABEL: Record<InternLesson["status"], string> = {
  completed: "Completed ✓",
  "in-progress": "In progress",
  locked: "Locked",
};

export default function InternModuleWorkspace({
  moduleTitle,
  lessons: initialLessons,
}: {
  moduleTitle: string;
  lessons: InternLesson[];
}) {
  const [lessons, setLessons] = useState(initialLessons);
  const firstOpenable = lessons.find((l) => l.status !== "locked")?.id ?? lessons[0].id;
  const [activeId, setActiveId] = useState(firstOpenable);

  const activeIndex = lessons.findIndex((l) => l.id === activeId);
  const active = lessons[activeIndex];
  const completedCount = lessons.filter((l) => l.status === "completed").length;

  const openLesson = (id: string) => {
    const lesson = lessons.find((l) => l.id === id);
    if (lesson && lesson.status !== "locked") setActiveId(id);
  };

  const markComplete = () => {
    setLessons((prev) =>
      prev.map((lesson, index) => {
        if (lesson.id === active.id) return { ...lesson, status: "completed" };
        if (index === activeIndex + 1 && lesson.status === "locked") return { ...lesson, status: "in-progress" };
        return lesson;
      })
    );
  };

  const goPrevious = () => {
    if (activeIndex > 0) setActiveId(lessons[activeIndex - 1].id);
  };

  const goNext = () => {
    const next = lessons[activeIndex + 1];
    if (next && next.status !== "locked") setActiveId(next.id);
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
      <section aria-labelledby="intern-lessons-heading">
        <div className="flex items-baseline justify-between">
          <h2
            id="intern-lessons-heading"
            className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
          >
            Lessons
          </h2>
          <span className="text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
            {completedCount} / {lessons.length}
          </span>
        </div>

        <div className="mt-4 border-t border-line">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              disabled={lesson.status === "locked"}
              onClick={() => openLesson(lesson.id)}
              className={`proj-tab block w-full border-b border-line py-3 text-left ${
                lesson.id === activeId ? "is-active" : ""
              } ${lesson.status === "locked" ? "cursor-not-allowed opacity-40" : ""}`}
            >
              <span className="proj-tab-num">{lesson.number}</span>
              {lesson.title}
              <span className="ml-2 text-[10px] tracking-[0.15em] text-soft-white/35 uppercase">
                {STATUS_LABEL[lesson.status]}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="intern-lesson-content-heading" className="border border-line p-6 sm:p-8">
        <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
          Lesson {active.number} · {moduleTitle}
        </p>
        <h2
          id="intern-lesson-content-heading"
          className="mt-2 font-display text-2xl font-black tracking-tight text-soft-white"
        >
          {active.title}
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          {active.content.length > 0 ? (
            active.content.map((paragraph, index) => (
              <p key={index} className="max-w-xl text-sm leading-relaxed text-soft-white/60">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-sm text-soft-white/45">This lesson isn&apos;t available yet.</p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <button
            type="button"
            onClick={goPrevious}
            disabled={activeIndex === 0}
            className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={markComplete}
            disabled={active.status === "completed"}
            className="task-action text-xs font-semibold tracking-[0.15em] text-soft-white uppercase disabled:cursor-not-allowed disabled:opacity-40"
          >
            {active.status === "completed" ? "Completed ✓" : "Mark as complete"}
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!lessons[activeIndex + 1] || lessons[activeIndex + 1].status === "locked"}
            className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next lesson →
          </button>
        </div>
      </section>
    </div>
  );
}
