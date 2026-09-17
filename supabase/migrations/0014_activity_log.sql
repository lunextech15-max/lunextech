-- A real activity log, replacing MOCK_ADMIN_ACTIVITY and the empty
-- "activity: []" placeholders left on every dashboard since Projects/
-- Tasks/Attendance/Announcements/Leads went real. Written to by the
-- existing write actions in both repos (create/status-change actions —
-- not every minor edit, to keep the feed meaningful rather than noisy).
-- Run once, after 0001-0013.

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_staff_id text not null references public.staff(staff_id),
  category text not null,
  action text not null,
  target_label text not null default '',
  target_href text,
  created_at timestamptz not null default now()
);

create index if not exists activity_log_created_idx on public.activity_log (created_at desc);
create index if not exists activity_log_actor_idx on public.activity_log (actor_staff_id, created_at desc);

alter table public.activity_log enable row level security;

-- Admin gets the org-wide feed; everyone else sees only their own actions
-- (a personal "recent activity" widget, not a company-wide one).
create policy "admins can view all activity"
  on public.activity_log for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "users can view their own activity"
  on public.activity_log for select to authenticated
  using (actor_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

-- Anyone signed in can log an entry, but only as themselves — this is
-- written from the same client actions that already require their own
-- specific RLS to succeed (e.g. you can't log "created project" unless
-- you could actually create one), so this doesn't grant any new access.
create policy "authenticated users can log their own activity"
  on public.activity_log for insert to authenticated
  with check (actor_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));
