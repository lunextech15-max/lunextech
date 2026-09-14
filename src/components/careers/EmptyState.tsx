type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  actionHref?: string;
};

export default function EmptyState({ title, description, actionLabel, onAction, actionHref }: EmptyStateProps) {
  return (
    <div className="border border-line p-10 text-center sm:p-14">
      <p className="font-display text-xl font-black tracking-tight text-soft-white uppercase sm:text-2xl">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-soft-white/55">{description}</p>
      {actionHref ? (
        <a
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
        >
          {actionLabel}
          <span aria-hidden>→</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
        >
          {actionLabel}
          <span aria-hidden>→</span>
        </button>
      )}
    </div>
  );
}
