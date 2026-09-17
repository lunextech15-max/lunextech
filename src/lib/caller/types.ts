export type LeadStatus =
  | "not-called"
  | "no-answer"
  | "connected"
  | "interested"
  | "follow-up"
  | "not-interested"
  | "wrong-number"
  | "converted";

export type LeadPriority = "high" | "medium" | "low";

export type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  source: string;
  assignedCallerId: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  requirement: string;
  interestedService: string;
  budgetRange: string;
  followUpDate: string | null;
  lastContactAt: string | null;
  notes: string;
  createdAt: string;
};

export type LeadCall = {
  id: string;
  leadId: string;
  callerName: string;
  status: LeadStatus;
  notes: string;
  calledAt: string;
};

export type CallScript = {
  id: string;
  title: string;
  category: string;
  content: string;
};

export const STATUS_LABEL: Record<LeadStatus, string> = {
  "not-called": "Not called",
  "no-answer": "No answer",
  connected: "Connected",
  interested: "Interested",
  "follow-up": "Follow-up",
  "not-interested": "Not interested",
  "wrong-number": "Wrong number",
  converted: "Converted",
};

// Reuses the existing dash-status modifier set — accent is reserved for
// the two genuinely time-sensitive/actionable states (a hot lead, a
// scheduled follow-up); everything else is neutral.
export const STATUS_CLASS: Record<LeadStatus, string> = {
  "not-called": "dash-status--todo",
  "no-answer": "dash-status--archived",
  connected: "dash-status--planning",
  interested: "dash-status--in-review",
  "follow-up": "dash-status--in-progress",
  "not-interested": "dash-status--archived",
  "wrong-number": "dash-status--archived",
  converted: "dash-status--completed",
};

export const QUEUE_STATUSES: LeadStatus[] = [
  "no-answer",
  "connected",
  "interested",
  "follow-up",
  "not-interested",
  "wrong-number",
  "converted",
];
