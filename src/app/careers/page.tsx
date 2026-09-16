import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import JobsBoard from "@/components/careers/JobsBoard";
import { CAREER_VALUES } from "@/lib/career-values";
import { getOpenJobs } from "@/lib/jobs";
import "@/styles/page-hero.css";
import "@/styles/internships.css";
import "@/styles/careers.css";

export const metadata: Metadata = {
  title: "Careers — LUNEX TECH",
  description: "Build the next with LUNEX TECH — explore open roles and internship programs.",
};

const ENVIRONMENT = [
  { title: "BUILD", description: "Work on ideas and products." },
  { title: "LEARN", description: "Continuously explore new technologies and approaches." },
  { title: "EVOLVE", description: "Improve your thinking, skills, and work over time." },
];

const WHO_WE_LOOK_FOR = ["CURIOUS", "PROBLEM SOLVERS", "WILLING TO LEARN", "RESPONSIBLE", "OPEN TO FEEDBACK"];

export default function CareersPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      {/* Hero */}
      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 flex min-h-[75vh] flex-col justify-center px-6 pt-28 pb-20 md:px-10 lg:px-16">
          <div className="page-fade">
            <SectionHeader number="→" label="Work with us" />
          </div>

          <h1 className="page-fade mt-8 max-w-3xl font-display text-[14vw] font-black leading-[0.9] tracking-tight text-soft-white sm:text-[10vw] lg:mt-12 lg:text-[6.5vw] xl:text-[5.8rem]">
            BUILD THE
            <br />
            <span className="text-accent">NEXT.</span>
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            We&apos;re looking for curious people who want to explore ideas, solve problems, and build meaningful
            technology.
          </p>

          <div className="page-fade mt-12 flex flex-wrap items-center gap-6 lg:mt-14">
            <a
              href="#open-positions"
              className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
            >
              Explore open roles
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
            <Link
              href="/internships"
              className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
            >
              Explore internship programs →
            </Link>
          </div>
        </div>
      </main>

      {/* Working at LUNEX */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="01" label="Working at LUNEX" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          IDEAS NEED
          <br />
          PEOPLE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          Technology does not move forward because of tools alone. It moves forward because curious people explore
          problems, challenge assumptions, and work together to build better solutions.
        </p>
      </section>

      {/* What we value */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="What we value" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          HOW WE
          <br />
          THINK.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CAREER_VALUES.map((value) => (
            <div key={value.number} className="bg-carbon p-7 sm:p-9">
              <span className="font-display text-2xl text-accent">{value.number}</span>
              <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-soft-white uppercase">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="03" label="Open positions" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          FIND YOUR
          <br />
          PLACE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          Explore opportunities to build with LUNEX TECH.
        </p>

        <div className="mt-14 lg:mt-16">
          <JobsBoard jobs={getOpenJobs()} />
        </div>
      </section>

      {/* The environment */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="04" label="The environment" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          BUILD. LEARN.
          <br />
          EVOLVE.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:mt-16">
          {ENVIRONMENT.map((item) => (
            <div key={item.title} className="bg-carbon p-7 sm:p-9">
              <h3 className="font-display text-xl font-black tracking-tight text-soft-white uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="05" label="Who we look for" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          CURIOUS
          <br />
          PEOPLE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          We value people who are interested in understanding problems, learning continuously, and contributing
          thoughtfully.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {WHO_WE_LOOK_FOR.map((quality) => (
            <li
              key={quality}
              className="flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] text-soft-white/70 uppercase"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {quality}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="relative w-full overflow-hidden bg-carbon px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="page-glow" aria-hidden />
        <div className="relative z-10">
          <SectionHeader number="06" label="Your next step" />

          <h2 className="mt-8 max-w-2xl font-display text-[11vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[8vw] lg:mt-10 lg:text-[4.6vw] xl:text-[4rem]">
            SEE A ROLE
            <br />
            THAT <span className="text-accent">FITS?</span>
          </h2>

          <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
            Explore open positions and learn more about where you could contribute.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#open-positions"
              className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
            >
              Explore open roles
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </a>
            <Link
              href="/internships"
              className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
            >
              Explore programs →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
