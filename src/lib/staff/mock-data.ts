// Demo data for the Staff Dashboard. None of this is real — it exists only
// so the layout and components can be built and reviewed before Supabase
// auth/data is connected. Replace each MOCK_* export with a real fetch once
// the backend exists; the shapes are defined in `./types`.

import type {
  ActivityItem,
  CurrentFocusProject,
  DashboardMetrics,
  StaffUser,
  TimelineEvent,
} from "./types";

// Placeholder only — replace with the authenticated Supabase session's staff
// record once auth is connected. Never treat this as a real staff member.
export const MOCK_STAFF_USER: StaffUser = {
  id: "demo-staff",
  name: "John Doe",
  initials: "JD",
  role: "staff",
};

export const MOCK_METRICS: DashboardMetrics = {
  activeProjects: 3,
  myTasks: 5,
  completedThisWeek: 12,
  nextDeadline: "Sep 18",
};

export const MOCK_CURRENT_FOCUS: CurrentFocusProject = {
  name: "LUNEX Website Relaunch",
  category: "Digital Experience",
  description:
    "Rebuilding the public marketing site and staff portal on the new LUNEX design system.",
  progress: 80,
  role: "Frontend development",
  team: [
    { id: "team-1", initials: "JD" },
    { id: "team-2", initials: "AR" },
    { id: "team-3", initials: "SK" },
  ],
  nextMilestone: "Final UI review",
  href: "/staff/projects/lunex-website-relaunch",
};

export const MOCK_TODAY_TIMELINE: TimelineEvent[] = [
  { id: "today-1", time: "09:30", title: "Team check-in" },
  { id: "today-2", time: "11:00", title: "UI review" },
  { id: "today-3", time: "14:30", title: "Project requirements" },
  { id: "today-4", time: "17:00", title: "Progress update" },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "activity-1",
    label: "Task completed",
    detail: "Complete homepage UI",
    relativeTime: "2 hours ago",
  },
  {
    id: "activity-2",
    label: "Project updated",
    detail: "LUNEX Website Relaunch",
    relativeTime: "5 hours ago",
  },
  {
    id: "activity-3",
    label: "New comment",
    detail: "Client Onboarding",
    relativeTime: "1 day ago",
  },
];
