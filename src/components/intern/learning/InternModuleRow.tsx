import Link from "next/link";
import type { InternLearningModule } from "@/lib/intern/types";

const STATUS_LABEL: Record<InternLearningModule["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  locked: "Locked / upcoming",
};

const STATUS_CLASS: Record<InternLearningModule["status"], string> = {
  completed: "dash-status--completed",
  "in-progress": "dash-status--in-progress",
  locked: "dash-status--todo",
};

export default function InternModuleRow({ module }: { module: InternLearningModule }) {
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs text-soft-white/30">{module.number}</span>
          <p className="team-row-name text-base font-semibold tracking-wide text-soft-white/85 uppercase">
            {module.title}
          </p>
        </div>
        <span className={`dash-status ${STATUS_CLASS[module.status]} mt-2`}>{STATUS_LABEL[module.status]}</span>

        <ul className="mt-3 flex flex-wrap gap-x-2 text-sm">
          {module.topics.map((topic) => (
            <li key={topic} className="team-skill">
              {topic}
            </li>
          ))}
        </ul>

        {module.status === "in-progress" && module.progress !== undefined && (
          <div className="mt-3 max-w-[180px]">
            <div className="dash-progress-track">
              <div className="dash-progress-fill" style={{ transform: `scaleX(${module.progress / 100})` }} />
            </div>
            <p className="mt-1.5 text-[11px] font-medium tracking-[0.15em] text-soft-white/50 uppercase">
              {module.progress}%
            </p>
          </div>
        )}
      </div>

      {module.status !== "locked" && (
        <span className="team-row-arrow shrink-0 text-xs font-semibold tracking-[0.15em] text-soft-white/70 uppercase">
          Open module <span aria-hidden>→</span>
        </span>
      )}
    </>
  );

  if (module.status === "locked") {
    return <div className="team-row flex items-center justify-between gap-6 opacity-60">{content}</div>;
  }

  return (
    <Link href={`/intern/learning/${module.id}`} className="team-row group flex items-center justify-between gap-6">
      {content}
    </Link>
  );
}
