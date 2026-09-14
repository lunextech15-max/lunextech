"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BuildVisual from "./BuildVisuals";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import { CAPABILITIES as CATEGORIES } from "@/lib/capabilities";
import "@/styles/what-we-build.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = String(CATEGORIES.length).padStart(2, "0");

export default function WhatWeBuild() {
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

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // Header: label → headline lines → intro
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        })
        .from(q(".wwb-label"), { opacity: 0, y: 12, duration: 0.6 })
        .from(
          q(".wwb-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.3",
        )
        .from(q(".wwb-intro"), { opacity: 0, y: 16, duration: 0.8 }, "-=0.55");

      // Each band reveals on its own as it scrolls into view.
      gsap.utils.toArray<HTMLElement>(q(".wwb-band")).forEach((band) => {
        const b = gsap.utils.selector(band);
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: band, start: "top 70%", once: true },
          })
          .from(b(".wwb-num"), { opacity: 0, y: 10, duration: 0.5 })
          .from(
            b(".wwb-title"),
            { yPercent: 110, opacity: 0, duration: 1 },
            "-=0.25",
          )
          .from(b(".wwb-desc"), { opacity: 0, y: 16, duration: 0.7 }, "-=0.6")
          .from(
            b(".wwb-build-label"),
            { opacity: 0, y: 8, duration: 0.5 },
            "-=0.45",
          )
          .from(
            b(".wwb-example"),
            { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 },
            "-=0.35",
          );

        // The stage gets its own trigger so it lands after the text on desktop and
        // reveals when it actually scrolls into view on mobile (where it sits below the text).
        gsap.from(b(".wwb-stage"), {
          opacity: 0,
          y: 24,
          scale: 0.985,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: b(".wwb-stage")[0],
            start: "top 78%",
            once: true,
          },
        });

        // SVG accents only run while the band is on screen (not an entrance, so not once).
        ScrollTrigger.create({
          trigger: band,
          start: "top bottom",
          end: "bottom top",
          toggleClass: { targets: band, className: "is-live" },
        });
      });

      // Closing statement
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: q(".wwb-closing"),
            start: "top 80%",
            once: true,
          },
        })
        .from(q(".wwb-closing-rule"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
        })
        .from(
          q(".wwb-closing-line"),
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="what-we-build"
      aria-labelledby="what-we-build-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Section label */}
        <div className="wwb-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">04</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>What we build</span>
        </div>

        {/* Header: headline + intro */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <h2
            id="what-we-build-heading"
            className="font-display text-[8.5vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[8vw] lg:col-span-8 lg:text-[4.6vw] xl:text-[4.2rem]"
          >
            <span className="block overflow-hidden">
              <span className="wwb-line block">WHAT CAN WE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="wwb-line block text-accent">BUILD FOR YOU?</span>
            </span>
          </h2>

          <p className="wwb-intro max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base lg:col-span-4 lg:self-end">
            Every idea needs a different solution. From high-impact websites to
            complex digital platforms, we design and build technology around
            what your business actually needs.
          </p>
        </div>

        {/* Category bands */}
        <div className="mt-16 lg:mt-24">
          {CATEGORIES.map((category, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={category.id}
                className="wwb-band grid grid-cols-1 gap-10 border-t border-line py-14 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24 xl:gap-16"
              >
                {/* Text block: number, title, description, examples */}
                <div
                  className={`flex flex-col lg:col-span-5 ${
                    flipped ? "lg:col-start-8" : "lg:col-start-1"
                  }`}
                >
                  <div className="wwb-num flex items-baseline gap-3 font-display text-[11px] tracking-[0.25em]">
                    <span className="text-accent">{category.number}</span>
                    <span className="text-soft-white/25">/ {TOTAL}</span>
                  </div>

                  <h3 className="mt-5 font-display text-[8vw] font-black leading-[1] tracking-tight break-words text-soft-white uppercase sm:text-[5.5vw] lg:text-[2.8vw] xl:text-[2.6rem]">
                    <span className="block overflow-hidden pb-[0.08em]">
                      <span className="wwb-title block">{category.title}</span>
                    </span>
                  </h3>

                  <p className="wwb-desc mt-6 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-soft-white/60 sm:text-base">
                    {category.description}
                  </p>

                  <div
                    id={`wwb-build-${category.id}`}
                    className="wwb-build-label mt-8 text-[10px] font-medium tracking-[0.25em] text-soft-white/55 uppercase"
                  >
                    We build:
                  </div>

                  {/* Every build type: what it's used for and who typically needs it. */}
                  <ul
                    role="list"
                    aria-labelledby={`wwb-build-${category.id}`}
                    className="mt-1"
                  >
                    {category.examples.map((example) => (
                      <li
                        key={example.title}
                        className="wwb-example border-b border-line py-3.5"
                      >
                        <span className="block text-[12px] font-medium tracking-[0.15em] text-soft-white/85 uppercase transition-colors duration-300 sm:text-sm">
                          {example.title}
                        </span>
                        <span className="mt-1.5 block text-[11.5px] leading-relaxed text-soft-white/45 sm:text-[12.5px]">
                          {example.useCase}
                          <span className="text-soft-white/25">
                            {" "}
                            — {example.audience.join(" · ")}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual stage — renders after the text on mobile, alternates sides on desktop */}
                <div
                  className={`lg:col-span-7 lg:row-start-1 ${
                    flipped ? "lg:col-start-1" : "lg:col-start-6"
                  }`}
                >
                  <div
                    className={`wwb-stage wwb-stage--${i + 1} aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]`}
                  >
                    <div className="wwb-stage-reflection" />
                    <div className="wwb-visual">
                      <BuildVisual id={category.id} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="wwb-closing border-t border-line pt-16 lg:pt-24">
          <span aria-hidden className="wwb-closing-rule block h-px w-10 bg-accent" />
          <p className="mt-6 font-display text-[8vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[5.5vw] lg:text-[3.2vw] xl:text-[3rem]">
            <span className="block overflow-hidden">
              <span className="wwb-closing-line block">FROM A SIMPLE IDEA</span>
            </span>
            <span className="block overflow-hidden">
              <span className="wwb-closing-line block">TO A COMPLETE DIGITAL PRODUCT.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
