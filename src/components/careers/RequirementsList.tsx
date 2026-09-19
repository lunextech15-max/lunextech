import type { JobRequirement } from "@/lib/jobs";

function QualityList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] text-soft-white/70 uppercase">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function RequirementsList({ requirements }: { requirements: JobRequirement }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      <div>
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">Required</p>
        <div className="mt-5">
          <QualityList items={requirements.required} />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase">Nice to have</p>
        <div className="mt-5">
          <QualityList items={requirements.niceToHave} />
        </div>
      </div>
    </div>
  );
}
