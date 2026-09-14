"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/who-we-are.css";

gsap.registerPlugin(ScrollTrigger);

const PROCESS = ["Idea", "Design", "Technology", "Impact"];
const ACCENT = "#ff1a1a";
const SOFT_WHITE = "#e5e5e5";

export default function WhoWeAre() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const steps = q<HTMLElement>(".wa-step");

      if (reduce) {
        // Static: show the finished state, no scroll choreography.
        gsap.set(q(".wa-track-fill"), { scaleX: 1, scaleY: 1 });
        gsap.set(q(".wa-step-num, .wa-dot"), { color: ACCENT, backgroundColor: ACCENT });
        gsap.set(q(".wa-step-label"), { color: SOFT_WHITE });
        return;
      }

      // Entrance
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        .from(q(".wa-label"), { opacity: 0, y: 12, duration: 0.6 })
        .from(
          q(".wa-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.3"
        )
        .from(q(".wa-accent"), { opacity: 0, y: 10, duration: 0.7 }, "-=0.45")
        .from(q(".wa-desc"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.4")
        .from(q(".wa-process"), { opacity: 0, y: 12, duration: 0.8 }, "-=0.4");

      // Scroll-driven process: the track fills and each step ignites as the line reaches it.
      // Driven by the section so the range is reachable even when this is the last block on the page.
      const progress = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 35%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      progress.to(q(".wa-track-fill"), { scaleX: 1, scaleY: 1, ease: "none", duration: 1 }, 0);

      steps.forEach((step, i) => {
        const at = Math.min(i / (steps.length - 1), 0.94);
        progress
          .to(step.querySelector(".wa-step-num"), { color: ACCENT, duration: 0.06 }, at)
          .to(step.querySelector(".wa-step-label"), { color: SOFT_WHITE, duration: 0.06 }, at)
          .to(
            step.querySelector(".wa-dot"),
            {
              backgroundColor: ACCENT,
              boxShadow: "0 0 12px rgba(255,26,26,0.75)",
              scale: 1.5,
              duration: 0.06,
            },
            at
          );
      });

      // Slow parallax on the decorative slab.
      gsap.to(q(".wa-visual"), {
        yPercent: -16,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-carbon"
    >
      {/* Background depth — all barely visible */}
      <div className="wa-grid" aria-hidden />
      <div className="wa-grain" aria-hidden />
      <div className="wa-reflection" aria-hidden />
      <div className="wa-glow" aria-hidden />

      {/* Decorative metallic geometry — desktop only */}
      <div className="wa-visual hidden lg:block" aria-hidden>
        <div className="wa-slab wa-slab--back" />
        <div className="wa-slab-outline" />
        <div className="wa-slab">
          <div className="wa-slab-light" />
          <div className="wa-slab-light wa-slab-light--low" />
          <div className="wa-slab-sheen" />
          <div className="wa-slab-scan" />
          <div className="wa-slab-edge" />
          <div className="wa-slab-tick" style={{ top: "34%" }} />
          <div className="wa-slab-tick" style={{ top: "68%" }} />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Section label */}
        <div className="wa-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">02</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>Who we are</span>
        </div>

        {/* Headline */}
        <div className="mt-10 max-w-5xl lg:mt-14">
          <h2 className="font-display text-[12vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[9vw] lg:text-[5.6vw] xl:text-[5rem]">
            <span className="block overflow-hidden">
              <span className="wa-line block">WE DON&apos;T JUST</span>
            </span>
            <span className="block overflow-hidden">
              <span className="wa-line block">BUILD DIGITAL PRODUCTS.</span>
            </span>
          </h2>

          <p className="font-display mt-6 text-[8vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:mt-8 lg:text-[3.6vw] xl:text-[3.2rem]">
            <span className="block overflow-hidden">
              <span className="wa-line block">WE BUILD</span>
            </span>
            <span className="block overflow-hidden">
              <span className="wa-line block">
                <span className="wa-accent text-accent">WHAT&apos;S NEXT.</span>
              </span>
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="wa-desc mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
          LUNEX TECH is a technology-driven creative studio built for ambitious
          ideas. We combine strategy, design, and technology to create digital
          experiences that don&apos;t just look good—they move businesses
          forward.
        </p>

        {/* Process — scroll-driven */}
        <div className="wa-process relative mt-auto pt-16 lg:pt-20">
          <div className="relative">
            {/* Track: vertical on mobile, horizontal on desktop */}
            {/* Initial scale is inline: Tailwind's scale utilities use the `scale` property, which GSAP's transform tweens don't touch. */}
            <div aria-hidden className="absolute top-1 bottom-1 left-[3px] w-px bg-line md:hidden">
              <div
                className="wa-track-fill h-full w-full origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            <div aria-hidden className="absolute right-0 bottom-0 left-0 hidden h-px bg-line md:block">
              <div
                className="wa-track-fill h-full w-full origin-left bg-accent"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <ol className="flex flex-col gap-7 md:flex-row md:justify-between md:gap-4">
              {PROCESS.map((step, i) => (
                <li
                  key={step}
                  className="wa-step relative flex items-center gap-3 pl-7 md:flex-col md:items-start md:gap-3 md:pb-6 md:pl-0"
                >
                  <span
                    aria-hidden
                    className="wa-dot absolute top-1/2 left-0 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-line md:top-auto md:-bottom-[3px] md:translate-y-0"
                  />
                  <span className="wa-step-num font-display text-[10px] tracking-[0.25em] text-soft-white/30">
                    0{i + 1}
                  </span>
                  <span className="wa-step-label text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
