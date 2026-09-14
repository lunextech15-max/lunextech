export type TimelineItem = {
  number: string;
  title: string;
  description: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline-track flex flex-col gap-10 sm:gap-12">
      {items.map((item) => (
        <li key={item.number} className="timeline-step">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="font-display text-xs tracking-[0.25em] text-accent">{item.number}</span>
            <h3 className="font-display text-xl font-black tracking-tight text-soft-white uppercase sm:text-2xl">
              {item.title}
            </h3>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-soft-white/55">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
