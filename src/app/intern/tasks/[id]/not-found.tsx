import Link from "next/link";
import InternLayout from "@/components/intern/InternLayout";
import { getInternUser } from "@/lib/intern/session";

export default async function InternTaskNotFound() {
  const user = await getInternUser();
  return (
    <InternLayout active="tasks" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          03 <span className="text-accent">/ Tasks</span>
        </p>
        <h1 className="mt-6 font-display text-3xl font-black tracking-tight text-soft-white uppercase">
          Task not found.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-soft-white/50">
          The requested task could not be found.
        </p>
        <Link
          href="/intern/tasks"
          className="dash-metric-link mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase"
        >
          ← Return to tasks
        </Link>
      </div>
    </InternLayout>
  );
}
