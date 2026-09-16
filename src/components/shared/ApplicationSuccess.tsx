import Link from "next/link";

type ApplicationSuccessProps = {
  href: string;
  label: string;
};

export default function ApplicationSuccess({ href, label }: ApplicationSuccessProps) {
  return (
    <div className="page-fade border border-line p-8 text-center sm:p-14">
      <p className="text-[11px] font-medium tracking-[0.25em] text-accent uppercase">Application received.</p>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-soft-white/60">
        Thank you for your interest in LUNEX TECH. Your application has been received and will be reviewed.
      </p>
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-soft-white uppercase transition-colors hover:text-accent"
      >
        {label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
