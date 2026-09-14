import Link from "next/link";

export default function ApplicationSuccess() {
  return (
    <div className="page-fade border border-line p-8 text-center sm:p-14">
      <p className="text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Application received.</p>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-soft-white/60">
        Thank you for your interest in LUNEX TECH. Your application has been received and will be reviewed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
      >
        Explore LUNEX TECH
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
