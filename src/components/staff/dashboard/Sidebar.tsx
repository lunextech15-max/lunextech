import Link from "next/link";
import SignOutButton from "@/components/staff/SignOutButton";
import type { StaffUser } from "@/lib/staff/types";

export type StaffNavId =
  | "dashboard"
  | "projects"
  | "tasks"
  | "team"
  | "announcements"
  | "profile";

type NavItem = {
  id: StaffNavId;
  number: string;
  label: string;
  href?: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", number: "01", label: "Dashboard", href: "/staff/dashboard" },
  { id: "projects", number: "02", label: "Projects", href: "/staff/projects" },
  { id: "tasks", number: "03", label: "Tasks", href: "/staff/tasks" },
  { id: "team", number: "04", label: "Team", href: "/staff/team" },
  { id: "announcements", number: "05", label: "Announcements", href: "/staff/announcements" },
  { id: "profile", number: "06", label: "Profile", href: "/staff/profile" },
];

export default function Sidebar({
  active,
  user,
  onNavigate,
}: {
  active: StaffNavId;
  user: StaffUser;
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
        <p className="text-[10px] font-medium tracking-[0.3em] text-soft-white/35 uppercase">
          Internal workspace
        </p>
        <p className="dash-status-indicator mt-2 text-[10px] font-medium tracking-[0.2em] uppercase">
          <span aria-hidden>●</span> Operational
        </p>
      </div>

      <nav aria-label="Staff navigation" className="flex flex-1 flex-col gap-1 pt-2">
        {NAV_ITEMS.map((item) =>
          item.href ? (
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
          ) : (
            <span key={item.id} className="dash-nav-item is-disabled" aria-disabled="true">
              <span className="dash-nav-num">{item.number}</span>
              {item.label}
            </span>
          )
        )}
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
            <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
              {user.role === "admin" ? "Admin" : user.role === "intern" ? "Intern" : "Staff member"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link
            href="/staff/profile"
            className="dash-signout inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase"
          >
            Profile
            <span aria-hidden>→</span>
          </Link>
          <SignOutButton className="dash-signout inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase disabled:opacity-50" />
        </div>
      </div>
    </div>
  );
}
