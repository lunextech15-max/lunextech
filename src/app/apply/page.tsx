import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import ApplicationForm from "@/components/internships/ApplicationForm";
import "@/styles/page-hero.css";
import "@/styles/internships.css";

export const metadata: Metadata = {
  title: "Apply — LUNEX TECH Internships",
  description: "Start your application for a LUNEX TECH internship program.",
};

export default function ApplyPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 px-6 pt-28 pb-16 md:px-10 lg:px-16 lg:pt-36">
          <div className="page-fade">
            <SectionHeader number="07" label="Application" />
          </div>

          <h1 className="page-fade mt-8 max-w-2xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-10 lg:text-[5.2vw] xl:text-[4.6rem]">
            START YOUR
            <br />
            APPLICATION.
          </h1>

          <p className="page-fade mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
            Tell us a little about yourself and what you would like to explore.
          </p>
        </div>
      </main>

      <section className="relative w-full bg-carbon px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={null}>
            <ApplicationForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}
