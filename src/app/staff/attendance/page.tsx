import type { Metadata } from "next";
import StaffLayout from "@/components/staff/dashboard/StaffLayout";
import AttendanceContent from "@/components/staff/attendance/AttendanceContent";
import { getStaffSession } from "@/lib/staff/session";
import { getAttendanceRecords } from "@/lib/staff/attendance";
import { getAllTeamMembers } from "@/lib/staff/real-team";

export const metadata: Metadata = {
  title: "Attendance — LUNEX TECH Staff Portal",
  description: "Internal LUNEX TECH staff workspace.",
  robots: { index: false, follow: false },
};

export default async function StaffAttendancePage() {
  const [user, { records, error }, team] = await Promise.all([
    getStaffSession(),
    getAttendanceRecords(),
    getAllTeamMembers(),
  ]);

  return (
    <StaffLayout active="attendance" user={user}>
      <AttendanceContent
        records={records}
        loadError={error}
        people={team.map((m) => ({ id: m.id, name: m.name }))}
        markedBy={user.staffId}
      />
    </StaffLayout>
  );
}
