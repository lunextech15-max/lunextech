import type { Metadata } from "next";
import InternLayout from "@/components/intern/InternLayout";
import InternAttendanceContent from "@/components/intern/attendance/InternAttendanceContent";
import { getStaffSession } from "@/lib/staff/session";
import { getAttendanceForStaff } from "@/lib/staff/attendance";

export const metadata: Metadata = {
  title: "Attendance — LUNEX TECH Intern Portal",
  description: "Internal LUNEX TECH intern workspace.",
  robots: { index: false, follow: false },
};

export default async function InternAttendancePage() {
  const session = await getStaffSession();
  const records = await getAttendanceForStaff(session.staffId);

  // The rest of the Intern Portal still uses INTERN_USER (a separate,
  // not-yet-migrated mock identity) — department/startDate aren't rendered
  // anywhere in this layout chain, so they're safe placeholders here.
  const user = {
    id: session.id,
    name: session.name,
    initials: session.initials,
    role: session.role,
    department: "—",
    startDate: "—",
  };

  return (
    <InternLayout active="attendance" user={user}>
      <InternAttendanceContent records={records} />
    </InternLayout>
  );
}
