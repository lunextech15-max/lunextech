import type { Metadata } from "next";
import CallerLayout from "@/components/caller/CallerLayout";
import CallerAttendanceContent from "@/components/caller/attendance/CallerAttendanceContent";
import { getCallerUser } from "@/lib/caller/session";
import { getAttendanceForStaff } from "@/lib/staff/attendance";

export const metadata: Metadata = {
  title: "Attendance — LUNEX TECH Cold Caller Portal",
  description: "Internal LUNEX TECH cold calling workspace.",
  robots: { index: false, follow: false },
};

export default async function CallerAttendancePage() {
  const user = await getCallerUser();
  const records = await getAttendanceForStaff(user.staffId);

  return (
    <CallerLayout active="attendance" user={user}>
      <CallerAttendanceContent records={records} />
    </CallerLayout>
  );
}
