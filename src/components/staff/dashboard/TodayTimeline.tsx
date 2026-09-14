"use client";

import { useSyncExternalStore } from "react";
import type { TimelineEvent } from "@/lib/staff/types";

// Which entry is "current" depends on the viewer's local clock, so it's read
// via useSyncExternalStore rather than computed during render: the server
// snapshot is empty (no highlight), the client snapshot is the real time —
// no server/client markup mismatch.
const noopSubscribe = () => () => {};
const getServerTime = () => "";
const getClientTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" });
}

export default function TodayTimeline({ events }: { events: TimelineEvent[] }) {
  const currentTime = useSyncExternalStore(noopSubscribe, getClientTime, getServerTime);
  const label = useSyncExternalStore(noopSubscribe, todayLabel, () => "");

  const activeId = currentTime
    ? [...events].reverse().find((event) => event.time <= currentTime)?.id
    : undefined;

  return (
    <section aria-labelledby="today-heading" className="border border-line p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h2 id="today-heading" className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
          Today
        </h2>
        <span className="text-[11px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">{label}</span>
      </div>

      {events.length > 0 ? (
        <ol className="mt-6">
          {events.map((event) => (
            <li
              key={event.id}
              className={`dash-today-item ${event.id === activeId ? "is-current" : ""}`}
            >
              <span className="dash-today-dot" aria-hidden />
              <span className="font-display text-xs text-soft-white/50">{event.time}</span>
              <span className="dash-today-title text-sm font-medium tracking-wide text-soft-white/70 uppercase">
                {event.title}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">Nothing scheduled</p>
          <p className="mt-2 text-sm text-soft-white/45">No priorities set for today.</p>
        </div>
      )}
    </section>
  );
}
