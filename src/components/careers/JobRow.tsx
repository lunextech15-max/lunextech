import Link from "next/link";
import type { Job } from "@/lib/jobs";

export default function JobRow({ job }: { job: Job }) {
  return (
    <Link href={`/careers/${job.slug}`} className="job-row group block">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        <div className="flex items-baseline gap-5 lg:w-64">
          <span className="font-display text-sm text-soft-white/30">{job.number}</span>
          <h3 className="job-row-title font-display text-2xl leading-[1.05] font-black tracking-tight uppercase sm:text-3xl lg:text-[2.1vw] xl:text-3xl">
            {job.title[0]}
            <br />
            {job.title[1]}
          </h3>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
          <p className="max-w-md text-sm leading-relaxed text-soft-white/55">{job.subtitle}</p>

          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Type</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{job.employmentType}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Team</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{job.department}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Location</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{job.location}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-xs font-medium text-soft-white/70">
                <span className={`status-dot ${job.status !== "OPEN" ? "is-closed" : ""}`} aria-hidden />
                {job.status}
              </dd>
            </div>
          </dl>
        </div>

        <span className="job-row-title inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase lg:justify-self-end">
          Explore role
          <span className="job-row-arrow" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
