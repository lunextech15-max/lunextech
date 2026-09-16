import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import ExplorationList from "@/components/internships/ExplorationList";
import JobHero from "@/components/careers/JobHero";
import JobInformation from "@/components/careers/JobInformation";
import RequirementsList from "@/components/careers/RequirementsList";
import TechnologyList from "@/components/careers/TechnologyList";
import JobRow from "@/components/careers/JobRow";
import { JOBS, getJobBySlug, type Job } from "@/lib/jobs";
import { SITE_URL } from "@/lib/site";
import "@/styles/page-hero.css";
import "@/styles/internships.css";
import "@/styles/careers.css";

// Google Jobs structured data — only meaningful for genuinely open roles.
// `location` is currently a free-text string ("REMOTE / AS SPECIFIED" for
// every job today); jobLocationType: TELECOMMUTE is the correct field for
// that. If an on-site role is ever added with a real address, extend this
// to emit `jobLocation` instead rather than fabricating one now.
function jobPostingJsonLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title.join(" "),
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "LUNEX TECH",
      value: job.id,
    },
    datePosted: job.createdAt,
    ...(job.validThrough ? { validThrough: job.validThrough } : {}),
    employmentType: job.employmentType.replace(/\s+/g, "_").toUpperCase(),
    hiringOrganization: {
      "@type": "Organization",
      name: "LUNEX TECH",
      sameAs: SITE_URL,
    },
    jobLocationType: "TELECOMMUTE",
  };
}

export function generateStaticParams() {
  return JOBS.map((job) => ({ jobSlug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[jobSlug]">): Promise<Metadata> {
  const { jobSlug } = await params;
  const job = getJobBySlug(jobSlug);
  if (!job) return { title: "Role Not Found — LUNEX TECH" };
  return {
    title: `${job.title.join(" ")} — LUNEX TECH Careers`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: PageProps<"/careers/[jobSlug]">) {
  const { jobSlug } = await params;
  const job = getJobBySlug(jobSlug);
  if (!job) notFound();

  const otherJobs = JOBS.filter((j) => j.slug !== job.slug && j.status === "OPEN");

  return (
    <div className="flex flex-1 flex-col bg-carbon">
      {job.status === "OPEN" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
        />
      )}
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />
        <JobHero job={job} />
      </main>

      {/* Role details */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-16 md:px-10 lg:px-16">
        <JobInformation job={job} />
      </section>

      {/* About the role */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="01" label="About the role" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          WHAT YOU&apos;LL
          <br />
          DO.
        </h2>

        <p className="mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          {job.description}
        </p>
      </section>

      {/* Responsibilities */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="02" label="Responsibilities" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          YOUR
          <br />
          WORK.
        </h2>

        <div className="mt-14 max-w-2xl lg:mt-16">
          <ExplorationList areas={job.responsibilities} />
        </div>
      </section>

      {/* What we're looking for */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeader number="03" label="What we look for" />

        <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
          YOUR
          <br />
          APPROACH.
        </h2>

        <div className="mt-14 lg:mt-16">
          <RequirementsList requirements={job.requirements} />
        </div>
      </section>

      {/* Technologies */}
      {job.technologies.length > 0 && (
        <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <SectionHeader number="04" label="Technology" />

          <h2 className="mt-8 max-w-xl font-display text-[10vw] font-black leading-[0.94] tracking-tight text-soft-white sm:text-[7vw] lg:mt-10 lg:text-[4vw] xl:text-[3.6rem]">
            TECHNOLOGIES YOU
            <br />
            MAY WORK WITH.
          </h2>

          <div className="mt-10 lg:mt-12">
            <TechnologyList technologies={job.technologies} />
          </div>
        </section>
      )}

      {/* Application CTA */}
      <section className="relative w-full border-b border-line bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="border border-line p-8 text-center sm:p-12">
          {job.status === "OPEN" ? (
            <>
              <p className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
                Ready to <span className="text-accent">build?</span>
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-soft-white/55">
                Tell us about yourself and your interest in this role.
              </p>
              <div className="mt-8 flex flex-col items-center gap-5">
                <Link
                  href={`/careers/apply/${job.slug}`}
                  className="group inline-flex items-center gap-2 border border-soft-white/25 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
                >
                  Apply for this role
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </Link>
                <Link
                  href="/careers"
                  className="text-xs font-medium tracking-[0.15em] text-soft-white/50 uppercase transition-colors hover:text-soft-white"
                >
                  ← View all positions
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
                This position is no longer open.
              </p>
              <Link
                href="/careers"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
              >
                ← View open positions
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Other open positions */}
      {otherJobs.length > 0 && (
        <section className="relative w-full bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <SectionHeader number="→" label="Other open positions" />
          <div className="mt-12 lg:mt-14">
            {otherJobs.map((j) => (
              <JobRow key={j.slug} job={j} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
