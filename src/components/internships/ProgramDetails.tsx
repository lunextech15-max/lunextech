import type { Program } from "@/lib/programs";

export default function ProgramDetails({ program }: { program: Program }) {
  const items = [
    { label: "Duration", value: program.duration },
    { label: "Format", value: program.format },
    { label: "Area", value: program.area },
    { label: "Level", value: program.level },
  ];

  return (
    <div className="border border-line">
      <p className="border-b border-line px-6 py-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase sm:px-8">
        Program details
      </p>
      <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="bg-carbon px-6 py-6 sm:px-8">
            <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/62 uppercase">{item.label}</dt>
            <dd className="mt-2 font-display text-lg font-bold tracking-tight text-soft-white uppercase">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
