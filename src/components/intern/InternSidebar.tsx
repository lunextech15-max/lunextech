import Link from "next/link";
import type { InternUser } from "@/lib/intern/types";

export type InternNavId = "dashboard" | "project" | "tasks" | "learning" | "team" | "announcements" | "profile";

type NavItem = {
  id: InternNavId;
  number: string;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", number: "01", label: "Dashboard", href: "/intern/dashboard" },
  { id: "project", number: "02", label: "My Project", href: "/intern/project" },
  { id: "tasks", number: "03", label: "Tasks", href: "/intern/tasks" },
  { id: "learning", number: "04", label: "Learning", href: "/intern/learning" },
  { id: "team", number: "05", label: "Team", href: "/intern/team" },
  { id: "announcements", number: "06", label: "Announcements", href: "/intern/announcements" },
  { id: "profile", number: "07", label: "Profile", href: "/intern/profile" },
];

export default function InternSidebar({
  active,
  user,
  onNavigate,
}: {
  active: InternNavId;
  user: InternUser;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-carbon-deep">
      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="dash-logo text-sm">
          LUNEX <span className="text-accent">TECH</span>
        </Link>
      </div>
      <div className="px-6 pb-6">
        <p className="text-[10px] font-medium tracking-[0.3em] text-soft-white/35 uppercase">Intern workspace</p>
        <p className="dash-status-indicator mt-2 text-[10px] font-medium tracking-[0.2em] uppercase">
          <span aria-hidden>●</span> Learning &amp; building
        </p>
      </div>

      <nav aria-label="Intern navigation" className="flex flex-1 flex-col gap-1 pt-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            aria-current={item.id === active ? "page" : undefined}
            className={`dash-nav-item ${item.id === active ? "is-active" : ""}`}
          >
            <span className="dash-nav-num">{item.number}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-line px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="dash-avatar" aria-hidden>
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold tracking-[0.05em] text-soft-white uppercase">
              {user.name}
            </p>
            <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">Intern</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link
            href="/intern/profile"
            className="dash-signout inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase"
          >
            Profile
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/staff"
            className="dash-signout inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase"
          >
            Sign out
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
