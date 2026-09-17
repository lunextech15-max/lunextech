import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternAttendanceContent from "@/components/intern/attendance/InternAttendanceContent";
import { getStaffSession } from "@/lib/staff/session";
import { getInternUser } from "@/lib/intern/session";
import { getAttendanceForStaff } from "@/lib/staff/attendance";

export const metadata: Metadata = {
  title: "Attendance — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternAttendancePage() {
  const [session, user] = await Promise.all([getStaffSession(), getInternUser()]);
  const records = await getAttendanceForStaff(session.staffId);

  return (
    <InternLayout active="attendance" user={user}>
      <InternAttendanceContent records={records} />
    </InternLayout>
  );
}
