import Link from "next/link";
import type { Program } from "@/lib/programs";

export default function ProgramRow({ program }: { program: Program }) {
  return (
    <Link href={`/internships/${program.slug}`} className="program-row group block">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        <div className="flex items-baseline gap-5 lg:w-64">
          <span className="font-display text-sm text-soft-white/30">{program.number}</span>
          <h3 className="program-row-title font-display text-2xl leading-[1.05] font-black tracking-tight uppercase sm:text-3xl lg:text-[2.1vw] xl:text-3xl">
            {program.title[0]}
            <br />
            {program.title[1]}
          </h3>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
          <p className="max-w-md text-sm leading-relaxed text-soft-white/55">{program.shortDescription}</p>

          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Duration</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{program.duration}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Format</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{program.format}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/35 uppercase">Level</dt>
              <dd className="mt-1 text-xs font-medium text-soft-white/70">{program.level}</dd>
            </div>
          </dl>
        </div>

        <span className="program-row-title inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase lg:justify-self-end">
          Explore program
          <span className="program-row-arrow" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
