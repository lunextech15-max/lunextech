import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import { getCallerUser } from "@/lib/caller/session";
import { getMyLeads, getMyCalls } from "@/lib/caller/leads";
import { getPerformanceStats } from "@/lib/caller/metrics";

export const metadata: Metadata = {
  title: "Profile — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerProfilePage() {
  const [user, leads, calls] = await Promise.all([getCallerUser(), getMyLeads(), getMyCalls()]);
  const stats = getPerformanceStats(calls, leads);

  return (
    <CallerLayout active="profile" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          08 <span className="text-accent">/ Profile</span>
        </p>
        <h1 className="mt-4 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Profile
        </h1>

        <div className="mt-10 flex items-center gap-5">
          <span className="dash-avatar" style={{ width: 56, height: 56, fontSize: 16 }} aria-hidden>
            {user.initials}
          </span>
          <div>
            <h2 className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
              {user.name}
            </h2>
            <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-accent uppercase">Cold Caller</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 border border-line p-6 sm:grid-cols-4 sm:p-8">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Lunex ID</p>
            <p className="mt-1.5 text-sm font-medium text-soft-white">{user.staffId}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Territory / team</p>
            <p className="mt-1.5 text-sm font-medium text-soft-white">{user.territory}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Daily target</p>
            <p className="mt-1.5 text-sm font-medium text-soft-white">{user.dailyCallTarget || "—"} calls</p>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
            <span className="dash-status dash-status--completed mt-1.5">Active</span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
            Performance summary
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: "Calls (30 days)", value: stats.callsLast30Days },
              { label: "Connection rate", value: `${stats.connectionRate}%` },
              { label: "Conversions", value: stats.conversions },
            ].map((item) => (
              <div key={item.label} className="border border-line p-4">
                <p className="font-display text-2xl font-black text-soft-white">{item.value}</p>
                <p className="mt-2 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CallerLayout>
  );
}
