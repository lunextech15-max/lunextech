"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroVideo from "./HeroVideo";
import { useLoadingState } from "@/components/loading/LoadingProvider";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { revealed } = useLoadingState();

  useEffect(() => {
    // Hold the entrance until the loading screen starts to leave, so it plays in view.
    if (!revealed) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-masthead", { opacity: 0, duration: 0.5 })
        .from(
          ".hero-line",
          {
            yPercent: reduce ? 0 : 110,
            opacity: 0,
            duration: reduce ? 0.4 : 1,
            stagger: reduce ? 0 : 0.09,
          },
          "-=0.2"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: reduce ? 0 : 16, duration: 0.7 },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: reduce ? 0 : 16, duration: 0.6 },
          "-=0.45"
        )
        .from(".hero-footline", { opacity: 0, duration: 0.6 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-carbon"
    >
      <HeroVideo />

      {/* Masthead strip */}
      <div className="hero-masthead relative z-10 flex items-center justify-between border-b border-line px-6 pt-24 pb-4 md:px-10 xl:px-16">
        <span className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
          N&deg;01 — Lunex Tech
        </span>
        <span className="hidden text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase sm:flex sm:gap-2">
          Technology <span className="text-accent">×</span> Creativity{" "}
          <span className="text-accent">×</span> People{" "}
          <span className="text-accent">×</span> Impact
        </span>
        <span className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
          Scroll
        </span>
      </div>

      {/* Main content over the background video */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-16 md:px-10 xl:px-16 xl:py-20">
        <h1 className="font-display overflow-hidden text-[15vw] font-black leading-[0.9] tracking-tight text-soft-white sm:text-[11vw] lg:text-[6.4vw] xl:text-[5.8rem]">
          <span className="block overflow-hidden">
            <span className="hero-line block">FROM IDEA</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">
              TO <span className="text-accent">IMPACT.</span>
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-10 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
          We build technology, products, and experiences that create real
          value in the world.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 border border-soft-white/25 px-6 py-4 text-xs font-semibold tracking-[0.15em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
          >
            Explore Our Work
            <span className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
          >
            Start a Project
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Footline */}
      <div className="hero-footline relative z-10 flex items-center justify-between border-t border-line px-6 py-5 md:px-10 xl:px-16">
        <span className="text-[11px] font-medium tracking-[0.2em] text-soft-white/62 uppercase">
          Same vision. A brighter tomorrow.
        </span>
        <span aria-hidden className="h-px w-10 bg-accent" />
      </div>
    </section>
  );
}
