import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import { PROCESS_STEPS } from "@/lib/process";
import { PRINCIPLES } from "@/lib/principles";
import "@/styles/page-hero.css";

export const metadata: Metadata = {
  title: "About — LUNEX TECH",
  description: "LUNEX TECH is a technology-driven creative studio built for ambitious ideas.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 px-6 pt-32 pb-24 md:px-10 lg:px-16 lg:pt-40">
          {/* Section label */}
          <SectionHeader number="01" label="About" className="page-fade" />

          {/* Headline */}
          <h1 className="page-fade mt-8 max-w-5xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-12 lg:text-[5.6vw] xl:text-[5rem]">
            WE DON&apos;T JUST BUILD DIGITAL PRODUCTS.
            <br />
            WE BUILD <span className="text-accent">WHAT&apos;S NEXT.</span>
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            LUNEX TECH is a technology-driven creative studio built for
            ambitious ideas. We combine strategy, design, and technology to
            create digital experiences that don&apos;t just look
            good—they move businesses forward.
          </p>

          {/* Process */}
          <ol className="page-fade mt-16 grid grid-cols-2 gap-6 lg:mt-20 lg:grid-cols-4">
            {["Idea", "Design", "Technology", "Impact"].map((step, i) => (
              <li key={step} className="border-t border-accent/60 pt-4">
                <span className="font-display text-[10px] tracking-[0.25em] text-soft-white/30">0{i + 1}</span>
                <p className="mt-2 text-[11px] font-medium tracking-[0.25em] text-soft-white/70 uppercase">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </main>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="How we think" />
        <h2 id="principles-heading" className="sr-only">
          Our principles
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

      {/* Process detail */}
      <section aria-labelledby="process-heading" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="03" label="How we work" />
        <h2 id="process-heading" className="sr-only">
          Our process
        </h2>

        <ol className="mt-12 flex flex-col lg:mt-16">
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} className="grid grid-cols-1 gap-4 border-t border-line py-8 first:border-t-0 sm:grid-cols-[auto_1fr_2fr] sm:items-center sm:gap-8">
              <span className="font-display text-xs tracking-[0.25em] text-soft-white/30">{step.number}</span>
              <h3 className="font-display text-2xl font-black tracking-tight text-soft-white uppercase">{step.title}</h3>
              <p className="text-sm leading-relaxed text-soft-white/55 sm:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </div>
  );
}
