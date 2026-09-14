export default function ProfileHeader({
  initials,
  name,
  role,
  discipline,
}: {
  initials: string;
  name: string;
  role: string;
  discipline: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <span className="dash-avatar" style={{ width: 56, height: 56, fontSize: 16 }} aria-hidden>
        {initials}
      </span>
      <div>
        <h2 className="font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
          {name}
        </h2>
        <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-accent uppercase">{role}</p>
        <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
          {discipline} · Staff member
        </p>
      </div>
    </div>
  );
}
