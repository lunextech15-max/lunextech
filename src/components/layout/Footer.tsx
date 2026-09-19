"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingState } from "@/components/loading/LoadingProvider";
import "@/styles/footer.css";

gsap.registerPlugin(ScrollTrigger);

type FooterLink = {
  label: string;
  href: string;
};

const EXPLORE_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Projects", href: "/projects" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
];

const CAPABILITIES_LINKS: FooterLink[] = [
  { label: "Digital Experiences", href: "/capabilities" },
  { label: "Product Development", href: "/capabilities" },
  { label: "UI / UX Design", href: "/capabilities" },
  { label: "AI & Automation", href: "/capabilities" },
  { label: "Digital Systems", href: "/capabilities" },
];

const CONNECT_LINKS: FooterLink[] = [
  { label: "Start a Project", href: "/contact" },
  { label: "Talk to Us", href: "/contact" },
  { label: "Contact", href: "/contact" },
  { label: "Email", href: "mailto:lunextech15@gmail.com" },
];

export default function Footer() {
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
      root.querySelectorAll(".footer-fade").forEach((el) => el.classList.add("is-active"));
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        })
        .from(q(".footer-fade"), { opacity: 0, y: 16, duration: 0.8, stagger: 0.06 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      aria-labelledby="footer-heading"
      className="relative w-full overflow-hidden border-t border-line bg-carbon"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="footer-grid" aria-hidden />
      <div className="footer-grain" aria-hidden />
      <div className="footer-glow" aria-hidden />

      <div className="relative z-10 px-6 py-20 md:px-10 lg:py-28 xl:px-16">
        {/* Brand area */}
        <div className="footer-fade">
          <Link
            href="/"
            className="footer-logo text-[13vw] sm:text-[9vw] lg:text-[5.5vw] xl:text-[4.6rem]"
          >
            LUNEX <span className="text-accent">TECH</span>
          </Link>
          <p className="mt-4 text-xs font-medium tracking-[0.3em] text-soft-white/62 uppercase sm:text-sm">
            From idea to impact.
          </p>
        </div>

        {/* Nav columns */}
        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-14 sm:grid-cols-3 lg:mt-20 lg:gap-8 lg:pt-16">
          <nav className="footer-fade" aria-labelledby="footer-explore-heading">
            <h3
              id="footer-explore-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase"
            >
              Explore
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link py-1 text-sm text-soft-white sm:text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-fade" aria-labelledby="footer-capabilities-heading">
            <h3
              id="footer-capabilities-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase"
            >
              Capabilities
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {CAPABILITIES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link py-1 text-sm text-soft-white sm:text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-fade" aria-labelledby="footer-connect-heading">
            <h3
              id="footer-connect-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase"
            >
              Connect
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link py-1 text-sm text-soft-white sm:text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span
                  className="footer-social-item inline-flex items-center py-1 text-sm sm:text-[15px]"
                  aria-disabled="true"
                >
                  Social Links
                  <span className="ml-2 text-[10px] tracking-[0.2em] text-soft-white/55 uppercase">
                    Coming soon
                  </span>
                </span>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="footer-fade mt-16 flex flex-col items-center gap-4 border-t border-line pt-8 text-[11px] font-medium tracking-[0.2em] text-soft-white/62 uppercase sm:flex-row sm:justify-between lg:mt-20">
          <span>© 2026 Lunex Tech</span>
          <span className="text-soft-white/55">From idea to impact.</span>
          <Link href="/staff" className="footer-portal">
            Staff / Intern Login
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
