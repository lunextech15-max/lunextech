import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/internships/SectionHeader";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import { JOBS, getJobBySlug } from "@/lib/jobs";
import "@/styles/page-hero.css";
import "@/styles/internships.css";
import "@/styles/careers.css";

export function generateStaticParams() {
  return JOBS.map((job) => ({ jobSlug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/apply/[jobSlug]">): Promise<Metadata> {
  const { jobSlug } = await params;
  const job = getJobBySlug(jobSlug);
  if (!job) return { title: "Apply — LUNEX TECH Careers" };
  return {
    title: `Apply — ${job.title.join(" ")} — LUNEX TECH Careers`,
    description: `Apply for the ${job.title.join(" ")} role at LUNEX TECH.`,
  };
}

export default async function JobApplyPage({ params }: PageProps<"/careers/apply/[jobSlug]">) {
  const { jobSlug } = await params;
  const job = getJobBySlug(jobSlug);
  if (!job || job.status !== "OPEN") notFound();

  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 px-6 pt-28 pb-16 md:px-10 lg:px-16 lg:pt-36">
          <div className="page-fade">
            <SectionHeader number="→" label="Application" />
          </div>

          <h1 className="page-fade mt-8 max-w-2xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-10 lg:text-[5.2vw] xl:text-[4.6rem]">
            START YOUR
            <br />
            APPLICATION.
          </h1>

          <p className="page-fade mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
            Tell us about yourself and your experience.
          </p>

          <p className="page-fade mt-6 text-[11px] font-medium tracking-[0.25em] text-accent uppercase">
            Applying for: {job.title.join(" ")}
          </p>
        </div>
      </main>

      <section className="relative w-full bg-carbon px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <JobApplicationForm job={job} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
