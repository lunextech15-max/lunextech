export default function TasksHeader() {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
        05 <span className="text-accent">/ My tasks</span>
      </p>
      <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
        My Tasks
      </h1>
      <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Tasks assigned to you across all projects.</p>
    </div>
  );
}
