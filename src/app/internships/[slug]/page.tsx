import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/internships/SectionHeader";
import ProgramHero from "@/components/internships/ProgramHero";
import ProgramDetails from "@/components/internships/ProgramDetails";
import ExplorationList from "@/components/internships/ExplorationList";
import Timeline from "@/components/internships/Timeline";
import ProgramCTA from "@/components/internships/ProgramCTA";
import ProgramRow from "@/components/internships/ProgramRow";
import { PROGRAMS, getProgramBySlug } from "@/lib/programs";
import "@/styles/page-hero.css";
import "@/styles/internships.css";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/internships/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found — LUNEX TECH" };
  return {
    title: `${program.title.join(" ")} — LUNEX TECH Internships`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: PageProps<"/internships/[slug]">) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const otherPrograms = PROGRAMS.filter((p) => p.slug !== program.slug);

  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />
        <ProgramHero program={program} />
      </main>

      {/* Program information */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-16 md:px-10 lg:px-16">
        <ProgramDetails program={program} />
      </section>

      {/* About the program */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="About" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          WHAT YOU&apos;LL
          <br />
          EXPLORE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          {program.description}
        </p>

        <div className="mt-14 max-w-2xl lg:mt-16">
          <ExplorationList areas={program.explorationAreas} />
        </div>
      </section>

      {/* Program structure */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="03" label="Program structure" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          THE
          <br />
          JOURNEY.
        </h2>

        <div className="mt-14 max-w-xl lg:mt-16">
          <Timeline
            items={program.programPhases.map((phase) => ({
              number: phase.phase,
              title: phase.title,
              description: phase.description,
            }))}
          />
        </div>
      </section>

      {/* What you may work on */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="04" label="Possibilities" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          BUILT AROUND
          <br />
          REAL IDEAS.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          Depending on active projects and program requirements, interns may have the opportunity to contribute to
          practical work such as:
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {program.possibleWork.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] text-soft-white/70 uppercase"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Who this program is for */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="05" label="Who it's for" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          START
          <br />
          WHERE YOU ARE.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          {program.targetAudience.description}
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {program.targetAudience.qualities.map((quality) => (
            <li
              key={quality}
              className="flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] text-soft-white/70 uppercase"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {quality}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          You do not need to know everything before you start.
        </p>
      </section>

      {/* Final CTA */}
      <section id="program-cta" className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <ProgramCTA program={program} />
      </section>

      {/* Other programs */}
      <section id="other-programs" className="relative w-full bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="→" label="Explore other programs" />
        <div className="mt-12 lg:mt-14">
          {otherPrograms.map((p) => (
            <ProgramRow key={p.slug} program={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
