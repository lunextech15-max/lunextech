"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrincipleVisual from "./PrincipleVisuals";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import { PRINCIPLES } from "@/lib/principles";
import "@/styles/why-lunex-tech.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhyLunexTech() {
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

    if (reduce) {
      // Static: every principle reads clearly, no scroll-linked motion.
      root.querySelectorAll(".why-principle").forEach((el) => el.classList.add("is-active"));
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // Entry: label → headline lines → intro
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        .from(q(".why-label"), { opacity: 0, y: 12, duration: 0.6 })
        .from(
          q(".why-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.3"
        )
        .from(q(".why-intro"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.55");

      // Each principle activates as it crosses the middle of the viewport — normal scroll,
      // no pinning. Previous/future principles fall back to their muted resting state.
      gsap.utils.toArray<HTMLElement>(q(".why-principle")).forEach((principle) => {
        ScrollTrigger.create({
          trigger: principle,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: principle, className: "is-active" },
        });
      });

      // Closing statement
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: q(".why-closing"), start: "top 80%", once: true },
        })
        .from(q(".why-closing-rule"), { scaleX: 0, transformOrigin: "left center", duration: 0.7 })
        .from(
          q(".why-closing-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="why-lunex-tech"
      aria-labelledby="why-lunex-tech-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="why-grid" aria-hidden />
      <div className="why-grain" aria-hidden />
      <div className="why-glow" aria-hidden />

      <div className="relative z-10 px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Section label */}
        <div className="why-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
          <span className="font-display text-accent">07</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>Why Lunex Tech</span>
        </div>

        {/* Headline */}
        <div className="mt-8 max-w-4xl lg:mt-12">
          <h2
            id="why-lunex-tech-heading"
            className="font-display text-[11vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[8vw] lg:text-[4.6vw] xl:text-[4.2rem]"
          >
            <span className="block overflow-hidden">
              <span className="why-line block">BUILT DIFFERENT.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="why-line block text-accent">FOR A REASON.</span>
            </span>
          </h2>

          <p className="why-intro mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-8">
            Technology alone doesn&apos;t create impact. The difference is in
            how ideas are understood, challenged, designed and built.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-16 lg:mt-24">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.id}
              className="why-principle relative grid grid-cols-1 gap-8 border-t border-line py-14 first:border-t-0 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20 xl:gap-16"
            >
              <span className="why-bg-number" aria-hidden>
                {principle.number}
              </span>

              <div className="relative z-10 flex flex-col lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="why-num font-display text-[11px] tracking-[0.25em]">
                    {principle.number}
                  </span>
                  <span aria-hidden className="why-rule h-px w-8" />
                </div>

                <h3 className="why-title mt-5 font-display text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[6vw] lg:text-[3vw] xl:text-[2.6rem]">
                  {principle.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="why-desc mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
                  {principle.description}
                </p>
              </div>

              <div className="relative z-10 hidden justify-end lg:col-span-5 lg:flex">
                <div className="why-stage w-40 xl:w-48">
                  <PrincipleVisual id={principle.id} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="why-closing border-t border-line pt-16 lg:pt-24">
          <span aria-hidden className="why-closing-rule block h-px w-10 bg-accent" />
          <p className="mt-6 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[7vw] lg:text-[3.6vw] xl:text-[3.2rem]">
            <span className="block overflow-hidden">
              <span className="why-closing-line block">WE DON&apos;T BUILD FOR TODAY.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="why-closing-line block">
                WE BUILD FOR <span className="text-accent">WHAT&apos;S NEXT.</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
