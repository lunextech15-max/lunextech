"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/styles/loading-screen.css";

type LoadingScreenProps = {
  isLoading: boolean;
  onComplete?: () => void;
  /** Fires when the exit transition starts — the page underneath can begin its own reveal here. */
  onExitStart?: () => void;
};

const LEFT_COPY = ["Ideas", "Technology", "People", "Impact"];
const RIGHT_COPY = ["Analyze", "Design", "Build", "Deploy"];

// Fixed positions so the field is calm and identical on every load.
const PARTICLES = [
  { x: 12, y: 22, dx: 6, dy: -14, dur: 7, delay: 0, red: false },
  { x: 21, y: 68, dx: -8, dy: -10, dur: 9, delay: 1.2, red: false },
  { x: 33, y: 38, dx: 5, dy: -18, dur: 8, delay: 0.4, red: true },
  { x: 41, y: 81, dx: -4, dy: -12, dur: 10, delay: 2.1, red: false },
  { x: 48, y: 15, dx: 7, dy: -9, dur: 7.5, delay: 0.9, red: false },
  { x: 57, y: 74, dx: -6, dy: -16, dur: 9.5, delay: 1.6, red: false },
  { x: 63, y: 29, dx: 4, dy: -11, dur: 8.5, delay: 0.2, red: true },
  { x: 71, y: 58, dx: -7, dy: -13, dur: 7, delay: 2.6, red: false },
  { x: 79, y: 19, dx: 5, dy: -17, dur: 10, delay: 1.1, red: false },
  { x: 86, y: 66, dx: -5, dy: -9, dur: 8, delay: 0.7, red: false },
  { x: 8, y: 47, dx: 6, dy: -15, dur: 9, delay: 1.9, red: false },
  { x: 92, y: 41, dx: -6, dy: -12, dur: 7.5, delay: 0.3, red: true },
  { x: 27, y: 12, dx: 4, dy: -10, dur: 8.5, delay: 2.3, red: false },
  { x: 68, y: 88, dx: -4, dy: -14, dur: 9.5, delay: 1.4, red: false },
];

const TECH_GLOW_OFF = "0 0 0px rgba(255,26,26,0), 0 0 0px rgba(255,26,26,0)";
const TECH_GLOW_ON = "0 0 18px rgba(255,26,26,0.55), 0 0 48px rgba(255,26,26,0.3)";
const TECH_GLOW_PEAK = "0 0 28px rgba(255,26,26,0.9), 0 0 80px rgba(255,26,26,0.55)";

export default function LoadingScreen({
  isLoading,
  onComplete,
  onExitStart,
}: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const callbacks = useRef({ onComplete, onExitStart });
  const exitRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    callbacks.current = { onComplete, onExitStart };
  }, [onComplete, onExitStart]);

  useEffect(() => {
    const root = rootRef.current;
    if (!isLoading || !root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(root);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const progress = { value: 0 };
    const paintProgress = () => {
      const v = Math.round(progress.value);
      if (fillRef.current) fillRef.current.style.width = `${v}%`;
      if (pctRef.current) pctRef.current.textContent = `${v}%`;
    };

    let exited = false;
    let exitTl: gsap.core.Timeline | null = null;

    const runExit = () => {
      if (exited) return;
      exited = true;
      callbacks.current.onExitStart?.();

      exitTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => callbacks.current.onComplete?.(),
      });

      if (reduce) {
        exitTl.to(root, { opacity: 0, duration: 0.5 });
        return;
      }

      exitTl
        .to(q(".ld-energy"), { opacity: 1, scale: 1.2, duration: 0.3 })
        .to(q(".ld-logo-tech"), { textShadow: TECH_GLOW_PEAK, duration: 0.3 }, "<")
        .to(q(".ld-bar-fill"), { boxShadow: "0 0 22px rgba(255,26,26,1)", duration: 0.3 }, "<")
        .fromTo(
          q(".ld-exit-sweep"),
          { left: "-70%", opacity: 1 },
          { left: "115%", duration: 0.75 },
          "-=0.05"
        )
        .to(root, { opacity: 0, duration: 0.85 }, "-=0.4");
    };
    exitRef.current = runExit;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: runExit,
    });

    if (reduce) {
      tl.to(q(".ld-logo, .ld-tagline, .ld-progress, .ld-ring, .ld-side, .ld-corner"), {
        opacity: 1,
        duration: 0.4,
      }).to(progress, { value: 100, duration: 1, ease: "none", onUpdate: paintProgress });
    } else {
      tl
        // 0.4s — red energy activates
        .to(q(".ld-energy"), { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" }, 0.4)
        .to(q(".ld-particles"), { opacity: 1, duration: 1.2 }, 0.5)
        .fromTo(
          q(".ld-sweep"),
          { left: "-45%", opacity: 1 },
          { left: "110%", duration: 1.5, ease: "power2.inOut" },
          0.5
        )
        // 0.8s — orbital structure
        .to(q(".ld-ring"), { opacity: 1, duration: 1.3 }, 0.8)
        // 1.2s — logo reveal
        .fromTo(q(".ld-logo"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1 }, 1.2)
        .fromTo(
          q(".ld-logo-sweep"),
          { backgroundPosition: "-150% 0" },
          { backgroundPosition: "150% 0", duration: 1.1, ease: "power2.inOut" },
          1.5
        )
        .fromTo(
          q(".ld-logo-tech"),
          { textShadow: TECH_GLOW_OFF },
          { textShadow: TECH_GLOW_ON, duration: 0.9 },
          1.6
        )
        // 1.8s — tagline
        .fromTo(
          q(".ld-tagline"),
          { opacity: 0, y: 14, letterSpacing: "0.9em" },
          { opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.9 },
          1.8
        )
        .to(q(".ld-side, .ld-corner"), { opacity: 1, duration: 1, stagger: 0.06 }, 1.9)
        // 2.2s — loading bar
        .fromTo(q(".ld-progress"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.2)
        .to(progress, { value: 100, duration: 2.3, ease: "power1.inOut", onUpdate: paintProgress }, 2.2);
    }

    return () => {
      tl.kill();
      exitTl?.kill();
      exitRef.current = null;
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  // If the host turns loading off early, leave gracefully instead of vanishing.
  useEffect(() => {
    if (!isLoading) exitRef.current?.();
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={rootRef}
      className="ld-root"
      role="status"
      aria-live="polite"
      aria-label="Loading LUNEX TECH"
    >
      <div className="ld-texture" aria-hidden />
      <div className="ld-reflection" aria-hidden />
      <div className="ld-energy" aria-hidden />
      <div className="ld-sweep" aria-hidden />

      <div className="ld-particles" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`ld-particle${p.red ? " ld-particle--red" : ""}`}
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--dur": `${p.dur}s`,
                "--delay": `${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="ld-ring" aria-hidden>
        <svg viewBox="0 0 600 600">
          <defs>
            <linearGradient id="ld-chrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4d4d4d" />
              <stop offset="0.5" stopColor="#181818" />
              <stop offset="1" stopColor="#3d3d3d" />
            </linearGradient>
            <filter id="ld-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          <g className="ld-ring-spin">
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="url(#ld-chrome)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="1300 396"
            />
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="150 1546"
              filter="url(#ld-glow)"
              opacity="0.8"
            />
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="150 1546"
            />
          </g>

          <g className="ld-ring-spin ld-ring-spin--reverse">
            <circle
              cx="300"
              cy="300"
              r="222"
              fill="none"
              stroke="url(#ld-chrome)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="900 495"
            />
            <circle
              cx="300"
              cy="300"
              r="222"
              fill="none"
              stroke="var(--color-soft-white)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="60 1335"
              opacity="0.35"
            />
          </g>

          <circle cx="300" cy="300" r="300" fill="none" stroke="#161616" strokeWidth="1" strokeDasharray="2 28" />
        </svg>
      </div>

      <div className="ld-vignette" aria-hidden />

      <div className="ld-content">
        <h1 className="ld-logo">
          <span className="ld-logo-lunex">
            LUNEX
            <span className="ld-logo-sweep" aria-hidden>
              LUNEX
            </span>
          </span>
          <span className="ld-logo-tech">TECH</span>
        </h1>

        <p className="ld-tagline">From idea to impact.</p>

        <div className="ld-progress">
          <div className="ld-bar">
            <div ref={fillRef} className="ld-bar-fill" />
          </div>
          <div className="ld-meta">
            <span>Loading experience...</span>
            <span ref={pctRef}>0%</span>
          </div>
        </div>
      </div>

      <div className="ld-side ld-side--left" aria-hidden>
        {LEFT_COPY.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="ld-side ld-side--right" aria-hidden>
        {RIGHT_COPY.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="ld-corner ld-corner--left" aria-hidden>
        More than tech.
        <br />
        A bigger tomorrow.
      </div>
      <div className="ld-corner ld-corner--right" aria-hidden>
        Lunex Tech
      </div>

      <div className="ld-exit-sweep" aria-hidden />
    </div>
  );
}
