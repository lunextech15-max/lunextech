import type { AttendanceStatus } from "./attendance-types";

// Reuses the existing dash-status modifier set rather than inventing new
// colors — late is the only status that gets the accent (genuinely worth
// flagging), everything else is neutral/dim, matching how status color is
// used everywhere else in the app.
export const STATUS_CLASS: Record<AttendanceStatus, string> = {
  present: "dash-status--completed",
  late: "dash-status--in-progress",
  absent: "dash-status--archived",
  "half-day": "dash-status--planning",
  leave: "dash-status--todo",
};
