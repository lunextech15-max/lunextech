type SectionHeaderProps = {
  number: string;
  label: string;
  className?: string;
};

export default function SectionHeader({ number, label, className = "" }: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase ${className}`}
    >
      <span className="font-display text-accent">{number}</span>
      <span aria-hidden className="h-px w-8 bg-accent/60" />
      <span>{label}</span>
    </div>
  );
}
