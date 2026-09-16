import type { AttendanceRecord } from "@/lib/staff/attendance-types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** A month grid of dots, one per day with a real record — no fabricated
 * entries for unmarked days. `year`/`month` (0-indexed) default to the
 * current month. */
export default function AttendanceCalendar({
  records,
  year,
  month,
}: {
  records: AttendanceRecord[];
  year: number;
  month: number;
}) {
  const byDate = new Map(records.map((r) => [r.date, r]));
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = new Date().toISOString().slice(0, 10);

  const cells: { day: number | null; key: string | null }[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ day: null, key: null });
  for (let day = 1; day <= daysInMonth; day++) cells.push({ day, key: toDateKey(year, month, day) });

  return (
    <div>
      <div className="att-calendar">
        {WEEKDAYS.map((day) => (
          <div key={day} className="att-calendar-weekday">
            {day}
          </div>
        ))}
        {cells.map((cell, index) => {
          if (cell.day === null) {
            return <div key={`empty-${index}`} className="att-calendar-day is-empty" aria-hidden />;
          }
          const record = cell.key ? byDate.get(cell.key) : undefined;
          const isToday = cell.key === todayKey;
          return (
            <div
              key={cell.key}
              className={`att-calendar-day ${isToday ? "is-today" : ""}`}
              title={record ? `${cell.key}: ${record.status}` : cell.key ?? undefined}
            >
              <span>{cell.day}</span>
              {record && <span className={`att-calendar-dot att-calendar-dot--${record.status}`} aria-hidden />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
