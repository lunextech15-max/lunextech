"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceVisual from "./ServiceVisuals";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import { SERVICES } from "@/lib/services";
import "@/styles/what-we-do.css";

gsap.registerPlugin(ScrollTrigger);

// How much scroll the pinned desktop stage consumes, in viewport heights.
const PIN_LENGTH_VH = 2.4;

export default function WhatWeDo() {
  const rootRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;
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
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      if (!reduce) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          })
          .from(q(".wwd-label"), { opacity: 0, y: 12, duration: 0.6 })
          .from(
            q(".wwd-line"),
            { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 },
            "-=0.3"
          )
          .from(q(".wwd-item"), { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, "-=0.5")
          .from(q(".wwd-stage--main"), { opacity: 0, y: 20, duration: 0.9 }, "-=0.6");
      }

      // Desktop only, and only with enough height for the pinned layout to fit.
      mm.add(
        "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          let last = -1;
          ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * PIN_LENGTH_VH}`,
            pin: true,
            // The page wrapper is a flex column, where GSAP turns pin spacing off by default.
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const next = Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length));
              if (next !== last) {
                last = next;
                setSelected(next);
              }
            },
          });
        }
      );
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="what-we-do"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <div className="flex min-h-screen flex-col justify-center px-6 py-20 md:px-10 lg:py-14 xl:px-16">
        {/* Section label */}
        <div className="wwd-label flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          <span className="font-display text-accent">03</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
          <span>What we do</span>
        </div>

        <div className="mt-8 grid gap-12 lg:mt-8 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Left: headline + service navigation */}
          <div className="flex flex-col lg:col-span-5">
            <h2 className="font-display text-[11vw] font-black leading-[0.92] tracking-tight text-soft-white sm:text-[8vw] lg:text-[3.6vw] xl:text-[3.4rem]">
              <span className="block overflow-hidden">
                <span className="wwd-line block">WE TURN IDEAS</span>
              </span>
              <span className="block overflow-hidden">
                <span className="wwd-line block">INTO DIGITAL</span>
              </span>
              <span className="block overflow-hidden">
                <span className="wwd-line block text-accent">REALITY.</span>
              </span>
            </h2>

            <ol
              className="mt-8 border-t border-line lg:mt-8"
              onMouseLeave={() => setHovered(null)}
            >
              {SERVICES.map((service, i) => {
                const isActive = active === i;
                return (
                  <li key={service.id} className="wwd-item border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`wwd-panel-${service.id}`}
                      onClick={() => setSelected(i)}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className="group flex w-full cursor-pointer items-baseline gap-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:py-3.5"
                    >
                      <span
                        className={`font-display text-[10px] tracking-[0.25em] transition-colors duration-500 ${
                          isActive ? "text-accent" : "text-soft-white/30"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-base font-bold tracking-[0.06em] uppercase transition-colors duration-500 sm:text-lg lg:text-[1.05rem] xl:text-lg ${
                          isActive ? "text-soft-white" : "text-soft-white/45 group-hover:text-soft-white/70"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span
                        aria-hidden
                        className={`ml-auto text-xs transition-all duration-500 ${
                          isActive ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 text-soft-white/30 opacity-0"
                        }`}
                      >
                        →
                      </span>
                    </button>

                    <div
                      id={`wwd-panel-${service.id}`}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`max-w-md pb-5 pl-[calc(10px+1.25rem+0.6ch)] text-sm leading-relaxed text-soft-white/60 transition-opacity duration-500 ${
                            isActive ? "opacity-100 delay-100" : "opacity-0"
                          }`}
                        >
                          {service.description}
                        </p>

                        {/* Mobile / tablet: visual lives inside the expanded item */}
                        {isActive && (
                          <div className="wwd-stage wwd-stage--inline mb-6 lg:hidden">
                            <div className="wwd-stage-reflection" />
                            <div className="wwd-visual is-active">
                              <ServiceVisual id={service.id} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: exhibition stage (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="wwd-stage wwd-stage--main h-full min-h-[440px]">
              <div className="wwd-stage-reflection" />

              {SERVICES.map((service, i) => (
                <div
                  key={service.id}
                  className={`wwd-visual ${active === i ? "is-active" : ""}`}
                >
                  <ServiceVisual id={service.id} />
                </div>
              ))}

              {/* Caption */}
              <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between border-t border-line bg-carbon/70 px-5 py-3 text-[10px] font-medium tracking-[0.25em] text-soft-white/40 uppercase backdrop-blur-sm">
                <span>
                  <span className="font-display text-accent">0{active + 1}</span>
                  <span className="mx-2 text-soft-white/20">/</span>05
                </span>
                <span className="hidden text-soft-white/60 xl:inline">{SERVICES[active].title}</span>
                <span className="flex items-center gap-1.5" aria-hidden>
                  {SERVICES.map((s, i) => (
                    <span
                      key={s.id}
                      className={`h-px transition-all duration-500 ${
                        i === active ? "w-6 bg-accent" : "w-3 bg-soft-white/20"
                      }`}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
