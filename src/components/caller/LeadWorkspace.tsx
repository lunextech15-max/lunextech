"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateLeadWorkspace, convertLead } from "@/lib/caller/leads-client";
import { logActivity } from "@/lib/staff/activity-client";
import { STATUS_CLASS, STATUS_LABEL, type Lead, type LeadCall } from "@/lib/caller/types";
import "@/styles/staff-login.css";
import "@/styles/caller.css";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadWorkspace({
  lead,
  calls,
  callerStaffId,
}: {
  lead: Lead;
  calls: LeadCall[];
  callerStaffId: string;
}) {
  const router = useRouter();
  const [requirement, setRequirement] = useState(lead.requirement);
  const [interestedService, setInterestedService] = useState(lead.interestedService);
  const [budgetRange, setBudgetRange] = useState(lead.budgetRange);
  const [notes, setNotes] = useState(lead.notes);
  const [followUpDate, setFollowUpDate] = useState(lead.followUpDate ?? "");
  const [status, setSaveStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [converting, setConverting] = useState(false);

  const handleSave = async () => {
    setPending(true);
    setSaveStatus(null);
    const { error } = await updateLeadWorkspace({
      leadId: lead.id,
      requirement,
      interestedService,
      budgetRange,
      notes,
      followUpDate: followUpDate || undefined,
    });
    setPending(false);
    setSaveStatus(error ? `Couldn't save: ${error}` : "Saved.");
    if (!error) router.refresh();
  };

  const handleConvert = async () => {
    setConverting(true);
    const { error } = await convertLead(lead.id, callerStaffId);
    setConverting(false);
    if (error) {
      setSaveStatus(`Couldn't convert: ${error}`);
      return;
    }
    void logActivity(callerStaffId, "leads", "Converted lead", lead.name);
    router.refresh();
  };

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <section aria-labelledby="lead-info-heading">
            <h2 id="lead-info-heading" className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
              01 / Customer information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-5 border border-line p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Company</p>
                <p className="mt-1.5 text-sm font-medium text-soft-white">{lead.company || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Phone</p>
                <p className="mt-1.5 text-sm font-medium text-soft-white">{lead.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Email</p>
                <p className="mt-1.5 text-sm font-medium text-soft-white">{lead.email || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Location</p>
                <p className="mt-1.5 text-sm font-medium text-soft-white">{lead.location || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Source</p>
                <p className="mt-1.5 text-sm font-medium text-soft-white">{lead.source || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
                <span className={`dash-status ${STATUS_CLASS[lead.status]} mt-1.5`}>{STATUS_LABEL[lead.status]}</span>
              </div>
            </div>
          </section>

          <section aria-labelledby="lead-requirement-heading">
            <h2
              id="lead-requirement-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
            >
              02 / Requirement &amp; opportunity
            </h2>
            <div className="mt-4 flex flex-col gap-5">
              <div>
                <label className="staff-field-label" htmlFor="lead-requirement">
                  Requirement
                </label>
                <textarea
                  id="lead-requirement"
                  className="staff-input mt-2"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="staff-field-label" htmlFor="lead-service">
                    Interested service
                  </label>
                  <input
                    id="lead-service"
                    className="staff-input mt-2"
                    value={interestedService}
                    onChange={(e) => setInterestedService(e.target.value)}
                  />
                </div>
                <div>
                  <label className="staff-field-label" htmlFor="lead-budget">
                    Budget range
                  </label>
                  <input
                    id="lead-budget"
                    className="staff-input mt-2"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="staff-field-label" htmlFor="lead-followup">
                  Follow-up date
                </label>
                <input
                  id="lead-followup"
                  type="date"
                  className="staff-input mt-2 max-w-[200px]"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
              <div>
                <label className="staff-field-label" htmlFor="lead-notes">
                  Call notes
                </label>
                <textarea
                  id="lead-notes"
                  className="staff-input mt-2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            {status && (
              <p role="status" aria-live="polite" className="mt-3 text-[11px] font-medium tracking-[0.1em] text-accent uppercase">
                {status}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={pending}
                className="task-action text-xs font-semibold tracking-[0.15em] text-soft-white uppercase disabled:opacity-50"
              >
                {pending ? "Saving…" : "Save"}
                <span className="task-action-arrow text-accent" aria-hidden>
                  →
                </span>
              </button>
              {lead.status !== "converted" && (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={converting}
                  className="profile-edit-toggle text-xs font-medium tracking-[0.15em] uppercase disabled:opacity-50"
                >
                  {converting ? "Converting…" : "Convert to opportunity"}
                </button>
              )}
            </div>
          </section>
        </div>

        <div>
          <section aria-labelledby="lead-history-heading">
            <h2
              id="lead-history-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
            >
              03 / Contact history
            </h2>
            {calls.length > 0 ? (
              <div className="mt-4 border-t border-line">
                {calls.map((call) => (
                  <div key={call.id} className="border-b border-line py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`dash-status ${STATUS_CLASS[call.status]}`}>{STATUS_LABEL[call.status]}</span>
                      <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
                        {formatDateTime(call.calledAt)}
                      </p>
                    </div>
                    {call.notes && <p className="mt-2 text-sm text-soft-white/60">{call.notes}</p>}
                    <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
                      {call.callerName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-soft-white/45">No calls logged yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
