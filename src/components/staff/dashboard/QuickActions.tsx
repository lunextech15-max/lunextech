import Link from "next/link";

const ACTIONS = [
  { label: "New task", icon: "+" },
  { label: "View projects", icon: "→", href: "/staff/projects" },
  { label: "View all tasks", icon: "→", href: "/staff/tasks" },
  { label: "Team directory", icon: "↗", href: "/staff/team" },
];

// "New task" has no href — it targets task creation, which doesn't exist
// yet — rendered as a clear integration point rather than a link to nowhere.
export default function QuickActions() {
  return (
    <section aria-labelledby="quick-commands-heading" className="border border-line p-6 sm:p-8">
      <h2
        id="quick-commands-heading"
        className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
      >
        Quick commands
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {ACTIONS.map((action) =>
          action.href ? (
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
          ) : (
            <span
              key={action.label}
              className="dash-quick-action is-disabled flex items-center justify-between text-xs font-medium tracking-[0.15em] uppercase"
              aria-disabled="true"
            >
              <span>
                <span aria-hidden className="mr-2 text-accent/70">
                  {action.icon}
                </span>
                {action.label}
              </span>
            </span>
          )
        )}
      </div>
    </section>
  );
}
