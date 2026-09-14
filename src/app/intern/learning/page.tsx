import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternModuleRow from "@/components/intern/learning/InternModuleRow";
import { INTERN_USER, INTERN_LEARNING_MODULES, getLearningProgress } from "@/lib/intern/mock-data";
import "@/styles/staff-team.css";

export const metadata: Metadata = {
  title: "Learning — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default function InternLearningPage() {
  const { completed, total, percent } = getLearningProgress();

  return (
    <InternLayout active="learning" user={INTERN_USER}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          04 <span className="text-accent">/ Learning</span>
        </p>
        <h1 className="mt-4 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Learning
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Build the skills you need to contribute.</p>

        <div className="mt-8 max-w-xs border border-line p-6">
          <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Learning progress</p>
          <div className="mt-3">
            <div className="dash-progress-track">
              <div className="dash-progress-fill" style={{ transform: `scaleX(${percent / 100})` }} />
            </div>
            <p className="mt-2 text-sm font-medium text-soft-white/80">{percent}%</p>
          </div>
          <p className="mt-3 text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
            {String(completed).padStart(2, "0")} / {String(total).padStart(2, "0")} modules
          </p>
        </div>

        <div className="mt-10 border border-line px-6 sm:px-8">
          {INTERN_LEARNING_MODULES.map((module) => (
            <InternModuleRow key={module.id} module={module} />
          ))}
        </div>
      </div>
    </InternLayout>
  );
}
