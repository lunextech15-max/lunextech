import AttendanceCalendar from "@/components/staff/attendance/AttendanceCalendar";
import { STATUS_CLASS } from "@/lib/staff/attendance-status-class";
import { attendancePercentage, STATUS_LABEL, type AttendanceRecord } from "@/lib/staff/attendance-types";
import "@/styles/staff-attendance.css";

export default function CallerAttendanceContent({ records }: { records: AttendanceRecord[] }) {
  const now = new Date();
  const percentage = attendancePercentage(records);
  const present = records.filter((r) => r.status === "present").length;
  const absent = records.filter((r) => r.status === "absent").length;
  const late = records.filter((r) => r.status === "late").length;

  const thisMonth = records.filter((r) => {
    const d = new Date(`${r.date}T00:00:00`);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          03 <span className="text-accent">/ Attendance</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          Attendance.
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">Your cold-calling attendance summary.</p>
      </div>

      <div className="att-summary-grid dash-fade mt-8" style={{ animationDelay: "0.06s" }}>
        <div className="att-summary-tile">
          <p className="att-summary-value">{percentage}%</p>
          <p className="att-summary-label">Attendance rate</p>
        </div>
        <div className="att-summary-tile">
          <p className="att-summary-value">{String(present).padStart(2, "0")}</p>
          <p className="att-summary-label">Present</p>
        </div>
        <div className="att-summary-tile">
          <p className="att-summary-value">{String(late).padStart(2, "0")}</p>
          <p className="att-summary-label">Late</p>
        </div>
        <div className="att-summary-tile">
          <p className="att-summary-value">{String(absent).padStart(2, "0")}</p>
          <p className="att-summary-label">Absent</p>
        </div>
      </div>

      <div className="dash-fade mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2" style={{ animationDelay: "0.12s" }}>
        <section aria-labelledby="att-calendar-heading">
          <h2
            id="att-calendar-heading"
            className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
          >
            01 / This month
          </h2>
          <div className="mt-4">
            <AttendanceCalendar records={thisMonth} year={now.getFullYear()} month={now.getMonth()} />
          </div>
        </section>

        <section aria-labelledby="att-history-heading">
          <h2
            id="att-history-heading"
            className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
          >
            02 / History
          </h2>
          {records.length > 0 ? (
            <div className="mt-4 border-t border-line">
              {records.slice(0, 12).map((r) => (
                <div key={r.id} className="att-table-row">
                  <div>
                    <p className="text-sm font-medium text-soft-white/85">{r.date}</p>
                    {(r.checkIn || r.checkOut) && (
                      <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-soft-white/35 uppercase">
                        {r.checkIn ?? "—"} – {r.checkOut ?? "—"}
                      </p>
                    )}
                  </div>
                  <span className={`dash-status ${STATUS_CLASS[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-soft-white/45">No attendance recorded yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
