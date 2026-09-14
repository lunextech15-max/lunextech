// Internship application data shape — what the public /apply form collects.
// This is a separate, richer shape from the admin panel's existing mock
// Application type (lunextech-admin repo): that one models fabricated
// sample applicants for the admin UI prototype, this one models what a
// real applicant actually submits. Field names are kept close on purpose
// (program/skills/portfolio/status) so a future real backend can map one
// onto the other without a redesign.

export type ApplicationStatus = "NEW" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";

export type ApplicationInput = {
  name: string;
  email: string;
  phone: string;
  location: string;
  program: string;
  education: string;
  fieldOfStudy: string;
  year: string;
  motivation: string;
  learningGoals: string;
  skills: string;
  portfolio: string;
  github: string;
  linkedin: string;
};

export type Application = ApplicationInput & {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
};
