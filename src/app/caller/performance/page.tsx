import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads, getMyCalls } from "@/lib/caller/leads";
import { getPerformanceStats } from "@/lib/caller/metrics";
import "@/styles/caller.css";

export const metadata: Metadata = {
  title: "Performance — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function CallerPerformancePage() {
  const [user, leads, calls] = await Promise.all([getCallerUser(), getMyLeads(), getMyCalls()]);
  const stats = getPerformanceStats(calls, leads);
  const maxDaily = Math.max(1, ...stats.dailyActivity.map((d) => d.count));

  return (
    <CallerLayout active="performance" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          07 <span className="text-accent">/ Performance</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Performance.
        </h1>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {[
            { label: "Calls (7 days)", value: stats.callsLast7Days },
            { label: "Calls (30 days)", value: stats.callsLast30Days },
            { label: "Connection rate", value: `${stats.connectionRate}%` },
            { label: "Interested leads", value: stats.interestedLeads },
            { label: "Follow-ups", value: stats.followUps },
            { label: "Conversions", value: stats.conversions },
          ].map((item) => (
            <div key={item.label} className="border border-line p-5">
              <p className="font-display text-2xl font-black text-soft-white">{item.value}</p>
              <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
            Weekly activity
          </h2>
          <div className="activity-chart mt-6 max-w-xl border border-line p-6">
            {stats.dailyActivity.map((day) => (
              <div key={day.date} className="activity-bar-col">
                <div className="activity-bar" style={{ height: `${(day.count / maxDaily) * 100}%` }} />
                <p className="activity-bar-label">{WEEKDAY[new Date(`${day.date}T00:00:00`).getDay()]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CallerLayout>
  );
}
