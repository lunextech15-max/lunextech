"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import InternSidebar, { type InternNavId } from "./InternSidebar";
import NotificationBell from "@/components/shared/notifications/NotificationBell";
import type { InternUser } from "@/lib/intern/types";
import "@/styles/staff-dashboard.css";

export default function InternLayout({
  active,
  user,
  children,
}: {
  active: InternNavId;
  user: InternUser;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar dash-sidebar--desktop" aria-label="Intern Portal">
        <InternSidebar active={active} user={user} />
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
        id="intern-mobile-nav"
        className={`dash-drawer bg-carbon-deep ${drawerOpen ? "is-open" : ""}`}
        aria-label="Intern Portal"
        aria-hidden={!drawerOpen}
      >
        <InternSidebar active={active} user={user} onNavigate={() => setDrawerOpen(false)} />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="dash-topbar">
          <Link href="/" className="dash-logo text-sm">
            LUNEX <span className="text-accent">TECH</span>
          </Link>
          <div className="flex items-center gap-3">
            <NotificationBell staffId={user.id} notificationsHref="/intern/notifications" />
            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="intern-mobile-nav"
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
          </div>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
