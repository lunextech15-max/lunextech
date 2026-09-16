// Server-only: reads real attendance data from Supabase public.attendance /
// public.attendance_settings. RLS (0010_attendance.sql): every user sees
// their own rows; staff/admin see everyone's.

import { createClient } from "@/lib/supabase/server";
import type { AttendanceRecord, AttendanceSettings, AttendanceStatus } from "./attendance-types";

type AttendanceRow = {
  id: string;
  staff_id: string;
  date: string;
  status: AttendanceStatus;
  check_in: string | null;
  check_out: string | null;
  notes: string;
  marked_by: string | null;
};

type StaffNameRow = { staff_id: string; full_name: string };

function toRecord(row: AttendanceRow, nameById: Map<string, string>): AttendanceRecord {
  return {
    id: row.id,
    staffId: row.staff_id,
    name: nameById.get(row.staff_id) ?? row.staff_id,
    date: row.date,
    status: row.status,
    checkIn: row.check_in?.slice(0, 5) ?? null,
    checkOut: row.check_out?.slice(0, 5) ?? null,
    notes: row.notes,
    markedBy: row.marked_by,
  };
}

/** Every attendance record visible to the caller (own rows for an intern;
 * everyone's for staff/admin, per RLS). Optionally scoped to a date range. */
export async function getAttendanceRecords(opts?: {
  from?: string;
  to?: string;
}): Promise<{ records: AttendanceRecord[]; error: boolean }> {
  const supabase = await createClient();
  let query = supabase.from("attendance").select("*").order("date", { ascending: false });
  if (opts?.from) query = query.gte("date", opts.from);
  if (opts?.to) query = query.lte("date", opts.to);

  const { data, error } = await query;
  if (error) {
    console.error("getAttendanceRecords: query failed", error);
    return { records: [], error: true };
  }

  const rows = (data ?? []) as AttendanceRow[];
  const staffIds = Array.from(new Set(rows.map((r) => r.staff_id)));
  const { data: staffRows } = staffIds.length
    ? await supabase.from("staff").select("staff_id, full_name").in("staff_id", staffIds)
    : { data: [] as StaffNameRow[] };
  const nameById = new Map(((staffRows ?? []) as StaffNameRow[]).map((s) => [s.staff_id, s.full_name]));

  return { records: rows.map((row) => toRecord(row, nameById)), error: false };
}

/** One person's attendance history, most recent first. */
export async function getAttendanceForStaff(staffId: string): Promise<AttendanceRecord[]> {
  const { records } = await getAttendanceRecords();
  return records.filter((r) => r.staffId === staffId);
}

export async function getAttendanceSettings(): Promise<AttendanceSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("attendance_settings")
    .select("work_start_time, work_end_time, late_after_minutes")
    .eq("id", true)
    .maybeSingle();

  if (error || !data) {
    console.error("getAttendanceSettings: query failed", error);
    return { workStartTime: "09:30", workEndTime: "18:30", lateAfterMinutes: 15 };
  }

  return {
    workStartTime: data.work_start_time.slice(0, 5),
    workEndTime: data.work_end_time.slice(0, 5),
    lateAfterMinutes: data.late_after_minutes,
  };
}
