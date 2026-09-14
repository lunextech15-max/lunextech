"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessVisual, { type ProcessId } from "./ProcessVisuals";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import "@/styles/how-we-work.css";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  id: ProcessId;
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Understand the idea, problem, audience and goals.",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description: "Transform possibilities into a clear strategy and direction.",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    description: "Shape the experience, interface, identity and product vision.",
  },
  {
    id: "build",
    number: "04",
    title: "Build",
    description: "Turn the vision into a functional digital product.",
  },
  {
    id: "evolve",
    number: "05",
    title: "Evolve",
    description: "Test, improve and prepare the product to grow.",
  },
];

export default function HowWeWork() {
  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const { ready } = useLoadingState();

  // Triggers are created while the loading screen still locks the page; re-measure once it is gone.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  useEffect(() => {
    const root = rootRef.current;
    const journey = journeyRef.current;
    if (!root || !journey) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Static: every step reads clearly, no scroll-linked motion.
      root.querySelectorAll(".hww-step").forEach((step) => step.classList.add("is-active"));
      const fill = root.querySelector<HTMLElement>(".hww-track-fill");
      if (fill) fill.style.transform = "scaleY(1)";
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // Entry: label → headline lines → microcopy
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        .from(q(".hww-label"), { opacity: 0, y: 12, duration: 0.6 })
        .from(
          q(".hww-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.3"
        )
        .from(q(".hww-micro"), { opacity: 0, y: 10, duration: 0.6 }, "-=0.5");

      // Each step activates as it crosses the middle of the viewport — normal scroll,
      // no pinning or hijacking. Previous/future steps simply fall back to their dim resting state.
      gsap.utils.toArray<HTMLElement>(q(".hww-step")).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: step, className: "is-active" },
        });
      });

      // The red line fills continuously across the whole journey, in step with scroll.
      gsap.to(q(".hww-track-fill"), {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: journey,
          start: "top 75%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // Closing statement
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: q(".hww-closing"), start: "top 80%", once: true },
        })
        .from(q(".hww-closing-rule"), { scaleX: 0, transformOrigin: "left center", duration: 0.7 })
        .from(
          q(".hww-closing-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.15 },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="hww-grid" aria-hidden />
      <div className="hww-grain" aria-hidden />
      <div className="hww-glow" aria-hidden />

      <div className="relative z-10 px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Section label */}
        <div className="hww-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">05</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>How we work</span>
        </div>

        {/* Headline */}
        <div className="mt-8 max-w-4xl lg:mt-12">
          <h2
            id="how-we-work-heading"
            className="font-display text-[11vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[8vw] lg:text-[4.6vw] xl:text-[4.2rem]"
          >
            <span className="block overflow-hidden">
              <span className="hww-line block">EVERY GREAT IDEA</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hww-line block">STARTS SOMEWHERE.</span>
            </span>
          </h2>

          <p className="font-display mt-5 text-[7vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[5vw] lg:mt-6 lg:text-[2.6vw] xl:text-[2.4rem]">
            <span className="block overflow-hidden">
              <span className="hww-line block">WE TAKE IT</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hww-line block text-accent">FURTHER.</span>
            </span>
          </p>
        </div>

        {/* Microcopy */}
        <div className="hww-micro mt-8 flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-soft-white/35 uppercase lg:mt-10">
          <span>Idea</span>
          <span aria-hidden className="text-accent">
            →
          </span>
          <span>Impact</span>
        </div>

        {/* Journey */}
        <div ref={journeyRef} className="relative mt-16 lg:mt-20">
          <div className="hww-track absolute" aria-hidden>
            <div
              className="hww-track-fill"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {STEPS.map((step) => (
            <article
              key={step.id}
              className="hww-step relative border-t border-line py-14 pl-8 first:border-t-0 lg:py-20 lg:pl-14"
            >
              <span className="hww-bg-number" aria-hidden>
                {step.number}
              </span>

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-16">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <span className="hww-step-num font-display text-[11px] tracking-[0.25em]">
                      {step.number}
                    </span>
                    <span aria-hidden className="hww-step-rule h-px w-8" />
                  </div>

                  <h3 className="hww-step-title mt-4 font-display text-[10vw] font-black uppercase leading-none tracking-tight sm:text-[6vw] lg:text-[3vw] xl:text-[2.6rem]">
                    {step.title}
                  </h3>

                  <p className="hww-step-body mt-5 max-w-sm text-sm leading-relaxed text-soft-white/60 sm:text-base">
                    {step.description}
                  </p>
                </div>

                <div className="hww-stage flex justify-start lg:col-span-5 lg:justify-end">
                  <div className="w-36 sm:w-44 lg:w-52 xl:w-56">
                    <ProcessVisual id={step.id} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="hww-closing border-t border-line pt-16 lg:pt-24">
          <span aria-hidden className="hww-closing-rule block h-px w-10 bg-accent" />
          <p className="mt-6 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[7vw] lg:text-[4vw] xl:text-[3.6rem]">
            <span className="block overflow-hidden">
              <span className="hww-closing-line block">FROM IDEA</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hww-closing-line block">
                TO <span className="text-accent">IMPACT.</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
