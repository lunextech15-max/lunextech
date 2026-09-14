import Link from "next/link";

const ACTIONS = [
  { label: "View my project", icon: "→", href: "/intern/project" },
  { label: "View all tasks", icon: "→", href: "/intern/tasks" },
  { label: "Continue learning", icon: "→", href: "/intern/learning" },
];

export default function InternQuickActions() {
  return (
    <section aria-labelledby="intern-quick-actions-heading" className="border border-line p-6 sm:p-8">
      <h2
        id="intern-quick-actions-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        Quick actions
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="dash-quick-action flex items-center justify-between text-xs font-medium tracking-[0.15em] uppercase"
          >
            <span>
              <span aria-hidden className="mr-2 text-accent/70">
                {action.icon}
              </span>
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
