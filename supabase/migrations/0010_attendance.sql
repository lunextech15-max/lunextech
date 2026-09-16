-- Attendance tracking for staff and interns. One row per person per day.
-- Marking/editing is staff+admin only (interns can't self-mark, matching
-- "For Staff: Mark attendance" / "For Admin: Create/edit records" in the
-- spec); everyone can see their own record, staff+admin can see everyone's.
-- Run once, after 0001-0009.

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  staff_id text not null references public.staff(staff_id) on delete cascade,
  date date not null,
  status text not null check (status in ('present', 'absent', 'late', 'half-day', 'leave')),
  check_in time,
  check_out time,
  notes text not null default '',
  marked_by text references public.staff(staff_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (staff_id, date)
);

create index if not exists attendance_staff_date_idx on public.attendance (staff_id, date desc);
create index if not exists attendance_date_idx on public.attendance (date desc);

alter table public.attendance enable row level security;

-- Everyone (staff, intern, admin) can see their own attendance history.
create policy "users can view own attendance"
  on public.attendance for select to authenticated
  using (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

-- Staff and admin can see everyone's — the team/org-wide overview.
create policy "staff and admin can view all attendance"
  on public.attendance for select to authenticated
  using (public.get_my_role() in ('admin', 'staff'));

create policy "staff and admin can mark attendance"
  on public.attendance for insert to authenticated
  with check (public.get_my_role() in ('admin', 'staff'));

create policy "staff and admin can correct attendance"
  on public.attendance for update to authenticated
  using (public.get_my_role() in ('admin', 'staff'))
  with check (public.get_my_role() in ('admin', 'staff'));

create policy "admins can delete attendance records"
  on public.attendance for delete to authenticated
  using (public.get_my_role() = 'admin');

-- Singleton settings row (org-wide attendance policy) — "For Admin:
-- Attendance policies/settings". id is always true so only one row can
-- ever exist.
create table if not exists public.attendance_settings (
  id boolean primary key default true check (id),
  work_start_time time not null default '09:30',
  work_end_time time not null default '18:30',
  late_after_minutes integer not null default 15,
  updated_at timestamptz not null default now()
);

insert into public.attendance_settings (id) values (true) on conflict (id) do nothing;

alter table public.attendance_settings enable row level security;

create policy "authenticated users can view attendance settings"
  on public.attendance_settings for select to authenticated
  using (true);

create policy "admins can update attendance settings"
  on public.attendance_settings for update to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
