import Link from "next/link";
import type { CallerUser } from "@/lib/caller/session";

export type CallerNavId =
  | "dashboard"
  | "leads"
  | "attendance"
  | "queue"
  | "followups"
  | "scripts"
  | "performance"
  | "profile";

type NavItem = {
  id: CallerNavId;
  number: string;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", number: "01", label: "Dashboard", href: "/caller/dashboard" },
  { id: "leads", number: "02", label: "Leads", href: "/caller/leads" },
  { id: "attendance", number: "03", label: "Attendance", href: "/caller/attendance" },
  { id: "queue", number: "04", label: "Call Queue", href: "/caller/queue" },
  { id: "followups", number: "05", label: "Follow-ups", href: "/caller/followups" },
  { id: "scripts", number: "06", label: "Scripts", href: "/caller/scripts" },
  { id: "performance", number: "07", label: "Performance", href: "/caller/performance" },
  { id: "profile", number: "08", label: "Profile", href: "/caller/profile" },
];

export default function CallerSidebar({
  active,
  user,
  onNavigate,
}: {
  active: CallerNavId;
  user: CallerUser;
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
        <p className="text-[10px] font-medium tracking-[0.3em] text-soft-white/35 uppercase">Caller workspace</p>
        <p className="dash-status-indicator mt-2 text-[10px] font-medium tracking-[0.2em] uppercase">
          <span aria-hidden>●</span> On the phones
        </p>
      </div>

      <nav aria-label="Caller navigation" className="flex flex-1 flex-col gap-1 pt-2">
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
            <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">Cold Caller</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link
            href="/caller/profile"
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
