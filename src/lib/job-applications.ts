// Job application data shape — what the public /careers/apply/:jobSlug form
// collects. Kept separate from src/lib/applications.ts (internship
// applications): different fields (currentRole, experienceLevel, resume),
// different downstream flow (accepted → staff account, not intern account).

export type JobApplicationStatus = "NEW" | "UNDER_REVIEW" | "INTERVIEW" | "ACCEPTED" | "REJECTED";

export type JobApplicationInput = {
  name: string;
  email: string;
  phone: string;
  location: string;
  jobId: string;
  currentRole: string;
  experienceLevel: string;
  experience: string;
  skills: string;
  portfolio: string;
  github: string;
  linkedin: string;
  motivation: string;
  resumeFileName: string;
};

export type JobApplication = JobApplicationInput & {
  id: string;
  status: JobApplicationStatus;
  createdAt: string;
};

export const EXPERIENCE_LEVELS = ["STUDENT", "ENTRY LEVEL", "JUNIOR", "MID LEVEL", "SENIOR"] as const;
