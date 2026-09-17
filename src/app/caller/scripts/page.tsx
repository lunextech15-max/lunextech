import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import { getCallerUser } from "@/lib/caller/session";
import { getCallScripts } from "@/lib/caller/scripts";
import "@/styles/caller.css";

export const metadata: Metadata = {
  title: "Scripts — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerScriptsPage() {
  const [user, scripts] = await Promise.all([getCallerUser(), getCallScripts()]);

  return (
    <CallerLayout active="scripts" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          06 <span className="text-accent">/ Scripts</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Scripts.
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Admin-provided talking points.</p>

        {scripts.length > 0 ? (
          <div className="script-grid mt-10">
            {scripts.map((script) => (
              <div key={script.id} className="script-card">
                <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{script.category}</p>
                <h2 className="mt-2 font-display text-lg font-black tracking-tight text-soft-white uppercase">
                  {script.title}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-soft-white/60">
                  {script.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 border border-line px-6 py-10 text-center text-sm text-soft-white/45">
            No scripts have been added yet.
          </p>
        )}
      </div>
    </CallerLayout>
  );
}
