import type { Metadata } from "next";
import Link from "next/link";
import CallerLayout from "@/components/caller/CallerLayout";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads, getMyCalls } from "@/lib/caller/leads";
import { getDashboardStats } from "@/lib/caller/metrics";
import "@/styles/caller.css";

export const metadata: Metadata = {
  title: "Dashboard — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

const TILES = [
  { key: "callsToday", label: "Calls today" },
  { key: "callsCompleted", label: "Calls completed" },
  { key: "connectedCalls", label: "Connected calls" },
  { key: "followUpsDue", label: "Follow-ups due" },
  { key: "interestedLeads", label: "Interested leads" },
  { key: "convertedLeads", label: "Converted leads" },
] as const;

export default async function CallerDashboardPage() {
  const user = await getCallerUser();
  const [leads, calls] = await Promise.all([getMyLeads(), getMyCalls()]);
  const stats = getDashboardStats(leads, calls);
  const targetProgress = user.dailyCallTarget > 0 ? Math.min(100, Math.round((stats.callsToday / user.dailyCallTarget) * 100)) : 0;

  return (
    <CallerLayout active="dashboard" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          01 <span className="text-accent">/ Dashboard</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Good to see you, {user.name.split(" ")[0]}.
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">{user.territory} territory.</p>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {TILES.map((tile) => (
            <div key={tile.key} className="border border-line p-5">
              <p className="font-display text-2xl font-black text-soft-white">
                {String(stats[tile.key]).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                {tile.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-sm border border-line p-6">
          <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Today&apos;s target</p>
          <p className="mt-2 text-sm font-medium text-soft-white/80">
            {stats.callsToday} / {user.dailyCallTarget || "—"} calls
          </p>
          <div className="dash-progress-track mt-3">
            <div className="dash-progress-fill" style={{ transform: `scaleX(${targetProgress / 100})` }} />
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/caller/queue"
            className="task-action text-xs font-semibold tracking-[0.15em] text-soft-white uppercase"
          >
            Start calling
            <span className="task-action-arrow text-accent" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </CallerLayout>
  );
}
