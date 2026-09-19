import type { Job } from "@/lib/jobs";

export default function JobInformation({ job }: { job: Job }) {
  const items = [
    { label: "Team", value: job.department },
    { label: "Type", value: job.employmentType },
    { label: "Location", value: job.location },
    { label: "Experience", value: job.experienceLevel },
  ];

  return (
    <div className="border border-line">
      <p className="border-b border-line px-6 py-4 text-[11px] font-medium tracking-[0.25em] text-soft-white/62 uppercase sm:px-8">
        Role details
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
        <div className="bg-carbon px-6 py-6 sm:px-8">
          <dt className="text-[10px] font-medium tracking-[0.2em] text-soft-white/62 uppercase">Status</dt>
          <dd className="mt-2 flex items-center gap-2 font-display text-lg font-bold tracking-tight text-soft-white uppercase">
            <span className={`status-dot ${job.status !== "OPEN" ? "is-closed" : ""}`} aria-hidden />
            {job.status}
          </dd>
        </div>
      </dl>
    </div>
  );
}
