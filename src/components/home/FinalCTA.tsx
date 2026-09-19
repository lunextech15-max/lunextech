"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import "@/styles/final-cta.css";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
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
      // Static: everything visible, signature line fully drawn, no scroll-linked motion.
      root.querySelector(".cta-signature")?.classList.add("is-drawn");
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 68%", once: true },
        })
        .from(q(".cta-atmosphere"), { opacity: 0, duration: 1.2 })
        .from(q(".cta-label"), { opacity: 0, y: 12, duration: 0.6 }, "-=0.9")
        .from(
          q(".cta-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.3"
        )
        .from(q(".cta-intro"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.55")
        .from(
          q(".cta-actions"),
          { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        )
        .from(q(".cta-micro"), { opacity: 0, duration: 0.6 }, "-=0.3")
        .call(() => root.querySelector(".cta-signature")?.classList.add("is-drawn"), [], "-=0.4");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="start-a-project"
      aria-labelledby="start-a-project-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="cta-atmosphere">
        <div className="cta-grid" aria-hidden />
        <div className="cta-grain" aria-hidden />
        <div className="cta-glow" aria-hidden />

        <div className="cta-orbit hidden lg:block" aria-hidden>
          <svg viewBox="0 0 600 600">
            <g className="cta-orbit-ring">
              <ellipse
                cx="300"
                cy="300"
                rx="280"
                ry="180"
                fill="none"
                stroke="rgba(229,229,229,0.14)"
                strokeWidth="1"
              />
            </g>
            <g className="cta-orbit-ring cta-orbit-ring--reverse">
              <ellipse
                cx="300"
                cy="300"
                rx="200"
                ry="260"
                fill="none"
                stroke="rgba(255,26,26,0.16)"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
        {/* Section label */}
        <div className="cta-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">
          <span className="font-display text-accent">08</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>Start a project</span>
        </div>

        {/* Headline */}
        <h2
          id="start-a-project-heading"
          className="mt-8 max-w-5xl font-display text-[15vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[10vw] lg:mt-12 lg:text-[6.4vw] xl:text-[5.8rem]"
        >
          <span className="block overflow-hidden">
            <span className="cta-line block">HAVE AN IDEA?</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block">LET&apos;S MAKE</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block">
              AN <span className="text-accent">IMPACT.</span>
            </span>
          </span>
        </h2>

        {/* Supporting text */}
        <p className="cta-intro mt-8 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:mt-10">
          Whether you&apos;re starting with an idea, improving an existing
          product, or building something entirely new — let&apos;s explore
          what&apos;s possible.
        </p>

        {/* Signature visual: idea → impact */}
        <div className="mt-12 max-w-xl lg:mt-14">
          <div className="cta-signature" aria-hidden>
            <svg
              viewBox="0 0 400 40"
              preserveAspectRatio="none"
              className="h-10 w-full overflow-visible"
            >
              <line
                x1="12"
                y1="20"
                x2="370"
                y2="20"
                stroke="rgba(229,229,229,0.14)"
                strokeWidth="1"
              />
              <path
                className="cta-signature-path"
                d="M12 20 L370 20"
                pathLength={1}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle className="cta-signature-origin" cx="12" cy="20" r="3" fill="var(--color-accent)" />
              <g className="cta-signature-impact">
                <circle cx="370" cy="20" r="9" fill="none" stroke="var(--color-accent)" opacity="0.4" />
                <circle cx="370" cy="20" r="4.5" fill="var(--color-accent)" className="cta-signature-pulse" />
              </g>
            </svg>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:mt-12">
          <Link
            href="/contact"
            className="cta-actions cta-primary inline-flex items-center gap-3 border border-soft-white/25 px-8 py-5 text-sm font-semibold tracking-[0.15em] text-soft-white uppercase transition-colors duration-300 hover:border-accent"
          >
            Start a Project
            <span className="cta-primary-arrow text-accent" aria-hidden>
              →
            </span>
          </Link>

          <Link
            href="/contact"
            className="cta-actions cta-secondary group inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-soft-white/70 uppercase transition-colors duration-300 hover:text-soft-white"
          >
            Talk to Us
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Microcopy */}
        <p className="cta-micro mt-8 text-[11px] font-medium tracking-[0.25em] text-soft-white/55 uppercase lg:mt-10">
          No idea is too early to start a conversation.
        </p>
      </div>
    </section>
  );
}
