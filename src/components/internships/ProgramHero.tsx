import Link from "next/link";
import type { Program } from "@/lib/programs";
import SectionHeader from "./SectionHeader";

export default function ProgramHero({ program }: { program: Program }) {
  return (
    <div className="relative z-10 px-6 pt-28 pb-16 md:px-10 lg:px-16 lg:pt-36">
      <Link
        href="/internships"
        className="page-fade inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-soft-white/50 uppercase transition-colors hover:text-soft-white"
      >
        ← All programs
      </Link>

      <div className="page-fade mt-8">
        <SectionHeader number={program.number} label="Internship program" />
      </div>

      <h1 className="page-fade mt-8 max-w-4xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-10 lg:text-[5.6vw] xl:text-[5rem]">
        {program.title[0]}
        <br />
        {program.title[1]}.
      </h1>

      <p className="page-fade mt-6 max-w-lg font-display text-xl font-black tracking-tight text-accent uppercase sm:text-2xl">
        {program.subheadline}
      </p>

      <p className="page-fade mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
        {program.description}
      </p>

      <div className="page-fade mt-10 flex flex-wrap items-center gap-6 lg:mt-12">
        <Link
          href={program.applicationsOpen ? `/apply?program=${program.slug}` : "#program-cta"}
          className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
        >
          Apply for this program
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
        <a
          href="#other-programs"
          className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
        >
          Explore other programs ↓
        </a>
      </div>
    </div>
  );
}
