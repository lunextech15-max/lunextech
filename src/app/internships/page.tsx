import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/internships/SectionHeader";
import ProgramRow from "@/components/internships/ProgramRow";
import Timeline from "@/components/internships/Timeline";
import { PROGRAMS } from "@/lib/programs";
import "@/styles/page-hero.css";
import "@/styles/internships.css";

export const metadata: Metadata = {
  title: "Internship Programs — LUNEX TECH",
  description: "Explore, build, and grow with LUNEX TECH — real technology and real product development.",
};

const EXPERIENCE = [
  {
    number: "01",
    title: "EXPLORE",
    description: "Understand technologies, ideas, and real-world problems.",
  },
  {
    number: "02",
    title: "BUILD",
    description: "Apply your knowledge through practical work and projects.",
  },
  {
    number: "03",
    title: "GROW",
    description: "Develop your skills through feedback, collaboration, and continuous learning.",
  },
];

const HOW_IT_WORKS = [
  { number: "01", title: "EXPLORE", description: "Browse available programs and discover areas that interest you." },
  { number: "02", title: "APPLY", description: "Submit your application for the program you want to explore." },
  { number: "03", title: "REVIEW", description: "Applications are reviewed by the LUNEX TECH team." },
  { number: "04", title: "JOIN", description: "Selected candidates receive access to the LUNEX TECH workspace." },
  { number: "05", title: "BUILD", description: "Learn, collaborate, and contribute to real work." },
];

const EXPECTATIONS = [
  { title: "PROJECT EXPERIENCE", description: "Work on practical ideas and digital projects." },
  { title: "COLLABORATION", description: "Learn how teams work together to move ideas forward." },
  { title: "GUIDANCE", description: "Receive direction and feedback throughout your experience." },
  { title: "GROWTH", description: "Develop practical skills through exploration and execution." },
];

const WHO_ITS_FOR = ["CURIOUS", "WILLING TO LEARN", "INTERESTED IN TECHNOLOGY", "OPEN TO FEEDBACK", "READY TO BUILD"];

export default function InternshipsPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      {/* Hero */}
      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 flex min-h-[85vh] flex-col justify-center px-6 pt-28 pb-20 md:px-10 lg:px-16">
          <div className="page-fade">
            <SectionHeader number="06" label="Internships" />
          </div>

          <h1 className="page-fade mt-8 max-w-3xl font-display text-[15vw] font-black leading-[0.9] tracking-tight text-soft-white sm:text-[11vw] lg:mt-12 lg:text-[7vw] xl:text-[6.4rem]">
            EXPLORE.
            <br />
            <span className="text-accent">BUILD.</span>
            <br />
            GROW.
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            Explore opportunities to learn, build, and contribute to real ideas and digital products with LUNEX TECH.
          </p>

          <div className="page-fade mt-12 flex flex-wrap items-center gap-6 lg:mt-14">
            <a
              href="#available-programs"
              className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
            >
              Explore programs
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
            <a
              href="#how-it-works"
              className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
            >
              How it works →
            </a>
          </div>
        </div>
      </main>

      {/* The experience */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="01" label="The experience" />

        <h2 className="mt-8 max-w-2xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          NOT JUST
          <br />
          AN INTERNSHIP.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          At LUNEX TECH, internships are designed around exploration, practical learning, and real work. Interns are
          encouraged to understand ideas, develop skills, collaborate with teams, and contribute to meaningful
          projects.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:mt-16">
          {EXPERIENCE.map((item) => (
            <div key={item.number} className="bg-carbon p-7 sm:p-9">
              <span className="font-display text-2xl text-accent">{item.number}</span>
              <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-soft-white uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available programs */}
      <section id="available-programs" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="Available programs" />

        <h2 className="mt-8 max-w-2xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          FIND YOUR
          <br />
          DIRECTION.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          Explore areas of technology and product development that match your interests and curiosity.
        </p>

        <div className="mt-14 lg:mt-16">
          {PROGRAMS.map((program) => (
            <ProgramRow key={program.slug} program={program} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="03" label="How it works" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          FROM INTEREST
          <br />
          TO IMPACT.
        </h2>

        <div className="mt-14 max-w-xl lg:mt-16">
          <Timeline items={HOW_IT_WORKS} />
        </div>
      </section>

      {/* What to expect */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="04" label="What to expect" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          REAL WORK.
          <br />
          REAL LEARNING.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {EXPECTATIONS.map((item) => (
            <div key={item.title} className="bg-carbon p-7 sm:p-8">
              <h3 className="font-display text-lg font-black tracking-tight text-soft-white uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-white/55">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who should apply */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="05" label="Who it's for" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          CURIOUS?
          <br />
          START HERE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          You do not need to know everything. We value curiosity, willingness to learn, problem-solving, and the
          motivation to explore technology.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {WHO_ITS_FOR.map((quality) => (
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
            YOUR <span className="text-accent">NEXT BUILD</span>
            <br />
            STARTS HERE.
          </h2>

          <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
            Explore our programs and find a direction that interests you.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#available-programs"
              className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
            >
              Explore programs
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </a>
            <Link
              href="/about"
              className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
            >
              Learn about LUNEX TECH →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
