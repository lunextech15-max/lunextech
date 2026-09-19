import type { ExplorationArea } from "@/lib/programs";

export default function ExplorationList({ areas }: { areas: ExplorationArea[] }) {
  return (
    <ol className="flex flex-col">
      {areas.map((area) => (
        <li key={area.number} className="grid grid-cols-1 gap-2 border-t border-line py-7 first:border-t-0 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
          <span className="font-display text-xs tracking-[0.25em] text-soft-white/55">{area.number}</span>
          <div>
            <h3 className="font-display text-lg font-black tracking-tight text-soft-white uppercase sm:text-xl">
              {area.title}
            </h3>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-soft-white/55">{area.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
