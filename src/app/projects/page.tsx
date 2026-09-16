import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/shared/SectionHeader";
import { PROJECTS } from "@/lib/projects";
import "@/styles/page-hero.css";

export const metadata: Metadata = {
  title: "Projects — LUNEX TECH",
  description: "Selected work from LUNEX TECH — real, live products we've built.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col bg-carbon">
      <Nav />

      <main className="relative w-full overflow-hidden border-b border-line bg-carbon">
        <div className="page-grid" aria-hidden />
        <div className="page-grain" aria-hidden />
        <div className="page-glow" aria-hidden />

        <div className="relative z-10 px-6 pt-32 pb-20 md:px-10 lg:px-16 lg:pt-40">
          <SectionHeader number="03" label="Selected work" className="page-fade" />

          <h1 className="page-fade mt-8 max-w-4xl font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:mt-12 lg:text-[5.6vw] xl:text-[5rem]">
            PRODUCTS WE&apos;VE <span className="text-accent">BROUGHT TO LIFE.</span>
          </h1>

          <p className="page-fade mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
            A selection of real, live projects across e-commerce, AI, fintech,
            edtech and more.
          </p>
        </div>
      </main>

      <section aria-label="Projects" className="relative w-full bg-carbon px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {PROJECTS.map((project, i) => (
            <article key={project.id} className="page-card flex flex-col overflow-hidden !p-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-carbon-deep">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] font-medium tracking-[0.25em] text-soft-white/30 uppercase">
                    Case study coming soon
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <span className="font-display text-xs tracking-[0.25em] text-soft-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-soft-white uppercase">
                  {project.title}
                </h2>
                <p className="mt-2 text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
                  {project.category}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-soft-white/55">{project.shortDescription}</p>

                {project.technologies.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border border-line px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-soft-white/50 uppercase"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6">
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="page-link inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
                    >
                      Explore project
                      <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white/30 uppercase">
                      Case study coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
