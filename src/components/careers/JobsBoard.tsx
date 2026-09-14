"use client";

import { useEffect, useState } from "react";
import { getOpenJobs, type Job } from "@/lib/jobs";
import JobFilters from "./JobFilters";
import JobRow from "./JobRow";
import JobRowSkeleton from "./JobRowSkeleton";
import EmptyState from "./EmptyState";

type LoadState = "loading" | "ready" | "error";

// Jobs are a static local list today, but this board is written as though
// it loads from a network source (brief simulated delay, retryable error
// path) since that's the real architecture once the Admin Panel owns this
// data — see src/lib/jobs.ts.
function useJobs() {
  const [state, setState] = useState<LoadState>("loading");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      setJobs(getOpenJobs());
      setState("ready");
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [attempt]);

  const retry = () => {
    setState("loading");
    setAttempt((a) => a + 1);
  };

  return { state, jobs, retry };
}

export default function JobsBoard() {
  const { state, jobs, retry } = useJobs();
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

      {state === "loading" && (
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <JobRowSkeleton key={i} />
          ))}
        </div>
      )}

      {state === "error" && (
        <EmptyState
          title="Unable to load open positions."
          description="Something interrupted the connection."
          actionLabel="Try again"
          onAction={retry}
        />
      )}

      {state === "ready" && jobs.length === 0 && (
        <EmptyState
          title="No open positions right now."
          description="We're not actively hiring for any positions at the moment."
          actionLabel="Explore internship programs"
          actionHref="/internships"
        />
      )}

      {state === "ready" && jobs.length > 0 && filtered.length === 0 && (
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

      {state === "ready" && filtered.length > 0 && (
        <div>
          {filtered.map((job) => (
            <JobRow key={job.slug} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
