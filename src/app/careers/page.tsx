import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { PRINCIPLES } from "@/lib/principles";
import "@/styles/page-hero.css";

export const metadata: Metadata = {
  title: "Careers — LUNEX TECH",
  description: "Work with LUNEX TECH — how we think, how we build, and how to reach us.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 pt-28 pb-20 md:px-10 lg:px-16">
          <div className="page-fade flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
            <span className="font-display text-accent">→</span>
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            <span>Careers</span>
          </div>

          <h1 className="page-fade mt-8 max-w-4xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-12 lg:text-[5.6vw] xl:text-[5rem]">
            BUILD WHAT&apos;S <span className="text-accent">NEXT, WITH US.</span>
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            We&apos;re a small, technology-driven studio — we grow the team
            when the right project and the right person meet at the same
            time, not on a fixed hiring calendar.
          </p>

          <div className="page-fade mt-12 max-w-xl page-card">
            <p className="text-[11px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
              Open positions
            </p>
            <p className="mt-2 text-sm leading-relaxed text-soft-white/70">
              There are no open roles listed right now. If you think
              you&apos;d be a strong fit for LUNEX TECH, reach out anyway —
              tell us what you&apos;d want to work on.
            </p>
            <a
              href="/contact"
              className="page-link mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
            >
              Get in touch
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </main>

      {/* How we think — reused so a candidate knows what they're applying into */}
      <section aria-labelledby="careers-principles-heading" className="relative w-full bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">01</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>How we think</span>
        </div>
        <h2 id="careers-principles-heading" className="sr-only">
          What it&apos;s like to work here
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => (
            <div key={principle.id} className="bg-carbon p-7 sm:p-8">
              <span className="font-display text-xs text-accent">{principle.number}</span>
              <h3 className="mt-4 font-display text-2xl leading-[1.05] font-black tracking-tight text-soft-white uppercase">
                {principle.title[0]}
                <br />
                {principle.title[1]}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-soft-white/55">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
