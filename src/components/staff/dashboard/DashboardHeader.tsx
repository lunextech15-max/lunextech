"use client";

import { useSyncExternalStore } from "react";

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// The time-of-day greeting is inherently client-only (the server has no
// notion of the visitor's local time), so it's read via useSyncExternalStore
// rather than an effect: the server snapshot stays a neutral fallback and
// the real value appears as soon as the client subscribes — no
// server/client markup mismatch, no post-mount setState.
const noopSubscribe = () => () => {};
const getServerGreeting = () => "Welcome back";
const getClientGreeting = () => greetingForHour(new Date().getHours());

// Summarizes what needs attention today. Built around `pendingTasks` so it
// stays accurate once real task data replaces the mock layer — this is demo
// data until then, not a claim about real work.
function summaryFor(pendingTasks: number) {
  if (pendingTasks <= 0) {
    return "You're all caught up. Nothing urgent right now.";
  }
  if (pendingTasks === 1) {
    return "You have 1 task requiring your attention.";
  }
  return `You have ${pendingTasks} tasks requiring your attention.`;
}

export default function DashboardHeader({ name, pendingTasks }: { name: string; pendingTasks: number }) {
  const greeting = useSyncExternalStore(noopSubscribe, getClientGreeting, getServerGreeting);
  const firstName = name.split(" ")[0];

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
        Lunex Tech <span className="text-accent">/ Internal</span>
      </p>
      <h1 className="mt-4 font-display text-[9vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[5vw] lg:text-[2.6vw] xl:text-4xl">
        {greeting}, {firstName}.
      </h1>
      <p className="mt-3 text-sm text-soft-white/50 sm:text-base">{summaryFor(pendingTasks)}</p>
    </div>
  );
}
