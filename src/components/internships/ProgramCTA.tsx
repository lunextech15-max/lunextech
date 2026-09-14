import Link from "next/link";
import type { Program } from "@/lib/programs";

export default function ProgramCTA({ program }: { program: Program }) {
  if (!program.applicationsOpen) {
    return (
      <div className="border border-line p-8 text-center sm:p-12">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          Applications currently closed.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-soft-white/55">
          This program is not accepting applications at the moment.
        </p>
        <Link
          href="/internships"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
        >
          Explore other programs
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-line p-8 text-center sm:p-12">
      <p className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
        Ready to <span className="text-accent">explore?</span>
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-soft-white/55">
        Take the next step and apply for this program.
      </p>
      <div className="mt-8 flex flex-col items-center gap-5">
        <Link
          href={`/apply?program=${program.slug}`}
          className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
        >
          Apply for {program.title.join(" ")}
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
        <Link
          href="/internships"
          className="text-xs font-medium tracking-[0.15em] text-soft-white/50 uppercase transition-colors hover:text-soft-white"
        >
          ← Explore all programs
        </Link>
      </div>
    </div>
  );
}
