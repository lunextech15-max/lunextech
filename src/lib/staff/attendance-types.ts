export type AttendanceStatus = "present" | "absent" | "late" | "half-day" | "leave";

export type AttendanceRecord = {
  id: string;
  staffId: string;
  name: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn: string | null; // HH:MM
  checkOut: string | null; // HH:MM
  notes: string;
  markedBy: string | null;
};

export type AttendanceSettings = {
  workStartTime: string; // HH:MM
  workEndTime: string; // HH:MM
  lateAfterMinutes: number;
};

export const STATUS_LABEL: Record<AttendanceStatus, string> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  "half-day": "Half day",
  leave: "On leave",
};

/** Percentage of marked days that count as attended — present, late, and
 * half-day (at 0.5 weight) all count; leave and absent don't. Days with no
 * record at all aren't counted either way (nothing to measure yet). */
export function attendancePercentage(records: AttendanceRecord[]): number {
  if (records.length === 0) return 0;
  const score = records.reduce((sum, r) => {
    if (r.status === "present" || r.status === "late") return sum + 1;
    if (r.status === "half-day") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((score / records.length) * 100);
}
