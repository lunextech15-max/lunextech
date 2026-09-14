"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Projects", href: "/projects" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.15em] text-soft-white"
        >
          LUNEX <span className="text-accent">TECH</span>
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-soft-white/70 uppercase transition-colors hover:text-soft-white"
            >
              {link.label}
              <span
                className={`h-[2px] w-3 bg-accent transition-opacity ${
                  link.active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <a
            href="/staff"
            className="text-xs font-medium tracking-[0.15em] text-soft-white/60 uppercase transition-colors hover:text-soft-white"
          >
            Staff / Intern Login →
          </a>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 border border-soft-white/25 px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10"
          >
            Start a Project
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span
            className={`h-[1.5px] w-6 bg-soft-white transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-soft-white transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-carbon px-6 py-4 xl:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 text-base font-medium text-soft-white/80"
            >
              {link.label}
            </a>
          ))}
          <a href="/staff" className="py-3 text-base font-medium text-accent">
            STAFF / INTERN LOGIN →
          </a>
        </nav>
      )}
    </header>
  );
}
