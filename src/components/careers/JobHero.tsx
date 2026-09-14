import Link from "next/link";
import type { Job } from "@/lib/jobs";
import SectionHeader from "@/components/internships/SectionHeader";

export default function JobHero({ job }: { job: Job }) {
  return (
    <div className="relative z-10 px-6 pt-28 pb-16 md:px-10 lg:px-16 lg:pt-36">
      <Link
        href="/careers"
        className="page-fade inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-soft-white/50 uppercase transition-colors hover:text-soft-white"
      >
        ← All open positions
      </Link>

      <div className="page-fade mt-8">
        <SectionHeader number={job.number} label="Open position" />
      </div>

      <h1 className="page-fade mt-8 max-w-4xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-10 lg:text-[5.6vw] xl:text-[5rem]">
        {job.title[0]}
        <br />
        {job.title[1]}.
      </h1>

      <p className="page-fade mt-6 max-w-lg font-display text-xl font-black tracking-tight text-accent uppercase sm:text-2xl">
        {job.subtitle}
      </p>

      <div className="page-fade mt-8 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-soft-white/70 uppercase">
        <span className={`status-dot ${job.status !== "OPEN" ? "is-closed" : ""}`} aria-hidden />
        {job.status === "OPEN" ? "Now hiring" : job.status}
      </div>

      <div className="page-fade mt-10 flex flex-wrap items-center gap-6 lg:mt-12">
        {job.status === "OPEN" ? (
          <Link
            href={`/careers/apply/${job.slug}`}
            className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
          >
            Apply for this role
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
        ) : (
          <Link
            href="/careers"
            className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
          >
            ← View open positions
          </Link>
        )}
      </div>
    </div>
  );
}
