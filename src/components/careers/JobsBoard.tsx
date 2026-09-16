"use client";

import { useState } from "react";
import type { Job } from "@/lib/jobs";
import JobFilters from "./JobFilters";
import JobRow from "./JobRow";
import EmptyState from "./EmptyState";

// Jobs are fetched server-side (careers/page.tsx) and passed in as a prop —
// this component only owns filter/search state. It used to simulate a
// client-side network fetch (artificial delay + skeleton) for data that was
// already static at build time, which delayed the page's primary content
// for no reason; once jobs genuinely come from a live Admin Panel API, that
// loading/retry affordance belongs in the server fetch, not faked here.
export default function JobsBoard({ jobs }: { jobs: Job[] }) {
  const [department, setDepartment] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = jobs.filter((job) => {
    const matchesDept = department === "ALL" || job.department === department;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      job.title.join(" ").toLowerCase().includes(q) ||
      job.subtitle.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <JobFilters department={department} onDepartmentChange={setDepartment} search={search} onSearchChange={setSearch} />

      {jobs.length === 0 && (
        <EmptyState
          title="No open positions right now."
          description="We're not actively hiring for any positions at the moment."
          actionLabel="Explore internship programs"
          actionHref="/internships"
        />
      )}

      {jobs.length > 0 && filtered.length === 0 && (
        <EmptyState
          title="No matching positions."
          description="Try a different department or search term."
          actionLabel="Clear filters"
          onAction={() => {
            setDepartment("ALL");
            setSearch("");
          }}
        />
      )}

      {filtered.length > 0 && (
        <div>
          {filtered.map((job) => (
            <JobRow key={job.slug} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
