"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Sidebar, { type StaffNavId } from "./Sidebar";
import type { StaffUser } from "@/lib/staff/types";
import "@/styles/staff-dashboard.css";

export default function StaffLayout({
  active,
  user,
  children,
}: {
  active: StaffNavId;
  user: StaffUser;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar dash-sidebar--desktop" aria-label="Staff Portal">
        <Sidebar active={active} user={user} />
      </aside>

      {drawerOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="dash-drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside
        id="staff-mobile-nav"
        className={`dash-drawer bg-carbon-deep ${drawerOpen ? "is-open" : ""}`}
        aria-label="Staff Portal"
        aria-hidden={!drawerOpen}
      >
        <Sidebar active={active} user={user} onNavigate={() => setDrawerOpen(false)} />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="dash-topbar">
          <Link href="/" className="dash-logo text-sm">
            LUNEX <span className="text-accent">TECH</span>
          </Link>
          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="staff-mobile-nav"
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-[1.5px] w-6 bg-soft-white transition-transform ${
                drawerOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-soft-white transition-transform ${
                drawerOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
