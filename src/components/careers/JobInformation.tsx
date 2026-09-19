import InfoGrid from "@/components/shared/InfoGrid";
import type { Job } from "@/lib/jobs";

export default function JobInformation({ job }: { job: Job }) {
  return (
    <InfoGrid
      title="Role details"
      items={[
        { label: "Team", value: job.department },
        { label: "Type", value: job.employmentType },
        { label: "Location", value: job.location },
        { label: "Experience", value: job.experienceLevel },
        {
          label: "Status",
          value: (
            <span className="inline-flex items-center gap-2">
              <span className={`status-dot ${job.status !== "OPEN" ? "is-closed" : ""}`} aria-hidden />
              {job.status}
            </span>
          ),
        },
      ]}
    />
  );
}
