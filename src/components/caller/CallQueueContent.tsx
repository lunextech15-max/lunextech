"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { recordCall } from "@/lib/caller/leads-client";
import { logActivity } from "@/lib/staff/activity-client";
import { STATUS_LABEL, QUEUE_STATUSES, type Lead, type LeadStatus } from "@/lib/caller/types";
import "@/styles/staff-login.css";
import "@/styles/caller.css";

const DONE_STATUSES: LeadStatus[] = ["converted", "not-interested", "wrong-number"];

export default function CallQueueContent({ leads, callerStaffId }: { leads: Lead[]; callerStaffId: string }) {
  const router = useRouter();
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<LeadStatus>("connected");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const queue = useMemo(
    () =>
      leads
        .filter((l) => !DONE_STATUSES.includes(l.status) && !skipped.has(l.id))
        .sort((a, b) => {
          const priorityRank = { high: 0, medium: 1, low: 2 };
          return priorityRank[a.priority] - priorityRank[b.priority];
        }),
    [leads, skipped]
  );

  const current = queue[0];

  const reset = () => {
    setStatus("connected");
    setNotes("");
    setFollowUpDate("");
    setError(null);
  };

  const handleSkip = () => {
    if (!current) return;
    setSkipped((prev) => new Set(prev).add(current.id));
    reset();
  };

  const handleRecord = async () => {
    if (!current) return;
    setPending(true);
    setError(null);

    const { error: saveError } = await recordCall({
      leadId: current.id,
      callerStaffId,
      status,
      notes,
      followUpDate: status === "follow-up" ? followUpDate || undefined : undefined,
    });

    setPending(false);

    if (saveError) {
      setError(`Couldn't save: ${saveError}`);
      return;
    }

    void logActivity(callerStaffId, "leads", "Logged call", `${current.name} — ${STATUS_LABEL[status]}`);
    setSkipped((prev) => new Set(prev).add(current.id));
    reset();
    router.refresh();
  };

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
        04 <span className="text-accent">/ Call Queue</span>
      </p>
      <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
        Call Queue.
      </h1>
      <p className="mt-3 text-sm text-soft-white/50 sm:text-base">{queue.length} leads left in your queue.</p>

      {current ? (
        <div className="queue-card mt-10 max-w-2xl">
          <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">Next lead</p>
          <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-soft-white uppercase sm:text-3xl">
            {current.name}
          </h2>
          <p className="mt-1 text-sm text-soft-white/55">
            {current.company && `${current.company} · `}
            {current.phone}
          </p>
          {current.requirement && <p className="mt-3 text-sm leading-relaxed text-soft-white/60">{current.requirement}</p>}

          <div className="mt-6 border-t border-line pt-6">
            <p className="staff-field-label">Record result</p>
            <div role="radiogroup" aria-label="Call result" className="queue-status-grid mt-3">
              {QUEUE_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={status === s}
                  onClick={() => setStatus(s)}
                  className={`queue-status-btn ${status === s ? "is-active" : ""}`}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>

            {status === "follow-up" && (
              <div className="mt-4">
                <label className="staff-field-label" htmlFor="queue-followup">
                  Follow-up date
                </label>
                <input
                  id="queue-followup"
                  type="date"
                  className="staff-input mt-2 max-w-[200px]"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
            )}

            <div className="mt-4">
              <label className="staff-field-label" htmlFor="queue-notes">
                Call notes
              </label>
              <textarea
                id="queue-notes"
                className="staff-input mt-2"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {error && (
              <p role="alert" className="mt-3 text-sm text-accent">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleRecord}
                disabled={pending}
                className="task-action text-xs font-semibold tracking-[0.15em] text-soft-white uppercase disabled:opacity-50"
              >
                {pending ? "Saving…" : "Record & next"}
                <span className="task-action-arrow text-accent" aria-hidden>
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={handleSkip}
                disabled={pending}
                className="profile-edit-toggle text-xs font-medium tracking-[0.15em] uppercase"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 max-w-2xl border border-line p-8 text-center sm:p-12">
          <p className="text-sm font-semibold tracking-wide text-soft-white/70 uppercase">Queue clear.</p>
          <p className="mt-2 text-sm text-soft-white/45">No more leads to call right now.</p>
        </div>
      )}
    </div>
  );
}
