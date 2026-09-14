"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/projects";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import "@/styles/selected-work.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = String(PROJECTS.length).padStart(2, "0");

function CategoryLine({ category }: { category: string }) {
  const parts = category.split("×");
  return (
    <div className="sw-meta mt-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
      {parts.map((part, idx) => (
        <span key={idx}>
          {part.trim()}
          {idx < parts.length - 1 && <span className="text-accent"> × </span>}
        </span>
      ))}
    </div>
  );
}

const gridPlacement = (flipped: boolean) => ({
  header: `lg:col-span-5 lg:row-start-1 ${flipped ? "lg:col-start-8" : "lg:col-start-1"}`,
  visual: `lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:self-center ${
    flipped ? "lg:col-start-1" : "lg:col-start-6"
  }`,
  body: `lg:col-span-5 lg:row-start-2 ${flipped ? "lg:col-start-8" : "lg:col-start-1"}`,
});

export default function SelectedWork() {
  const rootRef = useRef<HTMLElement>(null);
  const { ready } = useLoadingState();

  // Triggers are created while the loading screen still locks the page; re-measure once it is gone.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        .from(q(".sw-label"), { opacity: 0, y: 12, duration: 0.6 })
        .from(q(".sw-line"), { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.3")
        .from(q(".sw-intro"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.55");

      gsap.utils.toArray<HTMLElement>(q(".sw-project")).forEach((project) => {
        const p = gsap.utils.selector(project);
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: project, start: "top 78%", once: true },
          })
          .from(p(".sw-num"), { opacity: 0, y: 10, duration: 0.5 })
          .from(p(".sw-title"), { opacity: 0, y: 16, duration: 0.7 }, "-=0.3")
          .from(p(".sw-meta"), { opacity: 0, y: 10, duration: 0.5 }, "-=0.4")
          .from(p(".sw-visual"), { opacity: 0, y: 28, scale: 0.97, duration: 1 }, "-=0.4")
          .from(p(".sw-body"), { opacity: 0, y: 14, duration: 0.6 }, "-=0.5");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="work"
      aria-labelledby="selected-work-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="sw-grid" aria-hidden />
      <div className="sw-grain" aria-hidden />

      <div className="relative z-10 px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Section label */}
        <div className="sw-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">06</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>Selected work</span>
        </div>

        {/* Headline */}
        <div className="mt-8 max-w-4xl lg:mt-12">
          <h2
            id="selected-work-heading"
            className="font-display text-[10vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[8vw] lg:text-[5.2vw] xl:text-[4.6rem]"
          >
            <span className="block overflow-hidden">
              <span className="sw-line block">BUILT TO BE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="sw-line block text-accent">EXPERIENCED.</span>
            </span>
          </h2>

          <p className="sw-intro mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-8">
            A selection of ideas, products and digital experiences brought to
            life.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-16 lg:mt-24">
          {PROJECTS.map((project, i) => {
            const g = gridPlacement(i % 2 === 1);
            return (
              <article
                key={project.id}
                className="sw-project grid grid-cols-1 gap-8 border-t border-line py-14 first:border-t-0 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 xl:gap-x-16"
              >
                {/* Header: number, title, category — always first on mobile */}
                <div className={`flex flex-col ${g.header}`}>
                  <div className="sw-num flex items-baseline gap-3 font-display text-[11px] tracking-[0.25em]">
                    <span className="text-accent">0{i + 1}</span>
                    <span className="text-soft-white/25">/ {TOTAL}</span>
                  </div>

                  <h3 className="sw-title mt-4 font-display text-[10vw] font-black uppercase leading-none tracking-tight text-soft-white sm:text-[6vw] lg:text-[3.4vw] xl:text-[3rem]">
                    {project.title}
                  </h3>

                  <CategoryLine category={project.category} />
                </div>

                {/* Visual — comes before the description on mobile */}
                <div className={g.visual}>
                  <div className="sw-visual sw-stage aspect-[4/3] sm:aspect-[16/10] lg:min-h-[380px]">
                    {project.image ? (
                      <div className="sw-stage-media">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover object-top"
                        />
                        <div className="sw-stage-vignette" aria-hidden />
                        <div className="sw-stage-edge" aria-hidden />
                      </div>
                    ) : (
                      <div className="sw-placeholder flex h-full w-full items-center justify-center">
                        <div className="sw-placeholder-scan" aria-hidden />
                        <span className="relative z-10 text-[11px] font-medium tracking-[0.3em] text-soft-white/30 uppercase">
                          Case study visual coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body: description, technologies, action */}
                <div className={`sw-body flex flex-col ${g.body}`}>
                  <p className="max-w-sm border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
                    {project.shortDescription}
                  </p>

                  {project.technologies.length > 0 && (
                    <ul role="list" className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="border border-line px-3 py-1.5 text-[10px] tracking-[0.2em] text-soft-white/60 uppercase"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8">
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sw-explore group/link inline-flex items-center gap-3 text-xs font-semibold tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
                      >
                        Explore Project
                        <span className="text-accent transition-transform group-hover/link:translate-x-1">
                          →
                        </span>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.15em] text-soft-white/35 uppercase"
                      >
                        Explore Project
                        <span aria-hidden>→</span>
                        <span className="text-[10px] font-medium tracking-[0.2em] text-soft-white/25 normal-case">
                          (Case study coming soon)
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
