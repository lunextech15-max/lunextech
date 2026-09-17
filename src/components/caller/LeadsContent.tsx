"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STATUS_CLASS, STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/caller/types";
import "@/styles/staff-projects.css";
import "@/styles/caller.css";

const STATUS_FILTERS: (LeadStatus | "all")[] = [
  "all",
  "not-called",
  "connected",
  "interested",
  "follow-up",
  "converted",
];

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function LeadsContent({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => statusFilter === "all" || l.status === statusFilter)
      .filter(
        (l) =>
          !q ||
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q)
      );
  }, [leads, query, statusFilter]);

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
        02 <span className="text-accent">/ Leads</span>
      </p>
      <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
        My Leads.
      </h1>
      <p className="mt-3 text-sm text-soft-white/50 sm:text-base">{leads.length} leads assigned to you.</p>

      <div className="mt-8 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by status" className="flex flex-wrap items-center gap-4">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === statusFilter}
              onClick={() => setStatusFilter(s)}
              className={`proj-filter ${s === statusFilter ? "is-active" : ""}`}
            >
              {s === "all" ? "All" : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="sm:w-64">
          <label htmlFor="lead-search" className="sr-only">
            Search leads
          </label>
          <input
            id="lead-search"
            type="search"
            placeholder="Search name, company, phone…"
            className="proj-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {filtered.length > 0 ? (
          <div className="border border-line px-6 sm:px-8">
            {filtered.map((lead) => (
              <Link key={lead.id} href={`/caller/leads/${lead.id}`} className="lead-row group">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center text-sm font-semibold tracking-wide text-soft-white/85 uppercase">
                    <span className={`lead-row-priority lead-row-priority--${lead.priority}`} aria-hidden />
                    {lead.name}
                    {lead.company && <span className="ml-2 text-soft-white/40 normal-case">· {lead.company}</span>}
                  </p>
                  <p className="mt-1 text-[11px] font-medium tracking-[0.15em] text-soft-white/40 uppercase">
                    {lead.phone} {lead.location && `· ${lead.location}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
                      Next follow-up
                    </p>
                    <p className="mt-1 text-xs text-soft-white/60">{formatDate(lead.followUpDate)}</p>
                  </div>
                  <span className={`dash-status ${STATUS_CLASS[lead.status]}`}>{STATUS_LABEL[lead.status]}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="border border-line px-6 py-10 text-center text-sm text-soft-white/45">
            No leads match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
