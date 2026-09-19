-- Central notification system (in-app + email via Resend). Keyed to
-- public.staff via staff_id — the existing account table every role
-- (admin/staff/intern/caller) already lives in — matching the FK pattern
-- every other table in this schema uses (attendance.staff_id,
-- tasks.assignee_staff_id, etc). No separate users table.
--
-- `type` is deliberately free text, not a check-constrained enum: new
-- notification types are an application-layer concern (src/lib/notifications
-- /types.ts), not a schema migration. Run once, after 0001-0018.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_staff_id text not null references public.staff(staff_id) on delete cascade,
  title text not null,
  message text not null,
  type text not null,
  category text not null default 'system'
    check (category in ('account', 'task', 'lead', 'project', 'announcement', 'application', 'attendance', 'system')),
  priority text not null default 'normal' check (priority in ('normal', 'important')),
  entity_type text,
  entity_id text,
  action_url text,
  is_read boolean not null default false,
  -- Whether this notification should also go out by email — decided by
  -- the caller (src/lib/notifications/create-client.ts) at creation time,
  -- then re-checked against the recipient's own preferences inside the
  -- send-notification-email Edge Function before it actually sends.
  email_requested boolean not null default false,
  email_sent boolean not null default false,
  email_sent_at timestamptz,
  email_error text,
  -- An event that could fire more than once for the same notification
  -- (retry, double-submit, realtime reconnect) reuses this key instead of
  -- creating a duplicate row — see the partial unique index below.
  dedupe_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists notifications_dedupe_idx
  on public.notifications (recipient_staff_id, dedupe_key)
  where dedupe_key is not null;

create index if not exists notifications_recipient_created_idx
  on public.notifications (recipient_staff_id, created_at desc);
create index if not exists notifications_recipient_unread_idx
  on public.notifications (recipient_staff_id, is_read)
  where is_read = false;
create index if not exists notifications_type_idx on public.notifications (type);

alter table public.notifications enable row level security;

create policy "users can view own notifications"
  on public.notifications for select to authenticated
  using (recipient_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "users can update own notifications"
  on public.notifications for update to authenticated
  using (recipient_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'))
  with check (recipient_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

-- Staff/admin create notifications for OTHER people (assigning a task,
-- creating an account, posting an announcement); anyone can also create a
-- notification for themselves (harmless, rarely used).
create policy "staff and admin can create notifications for anyone"
  on public.notifications for insert to authenticated
  with check (
    public.get_my_role() in ('admin', 'staff')
    or recipient_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
  );

create policy "admins can delete notifications"
  on public.notifications for delete to authenticated
  using (public.get_my_role() = 'admin');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger notifications_set_updated_at
  before update on public.notifications
  for each row execute function public.set_updated_at();

-- Per-user email preferences. Account/security-critical types
-- (ACCOUNT_CREATED, PASSWORD_RESET, SYSTEM_ALERT) are never gated by
-- these — the Edge Function always sends them regardless of this row.
create table if not exists public.notification_preferences (
  staff_id text primary key references public.staff(staff_id) on delete cascade,
  task_email boolean not null default true,
  lead_email boolean not null default true,
  followup_email boolean not null default true,
  project_email boolean not null default true,
  announcement_email boolean not null default true,
  attendance_email boolean not null default false,
  application_email boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.notification_preferences enable row level security;

create policy "users can view own notification preferences"
  on public.notification_preferences for select to authenticated
  using (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "users can insert own notification preferences"
  on public.notification_preferences for insert to authenticated
  with check (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "users can update own notification preferences"
  on public.notification_preferences for update to authenticated
  using (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'))
  with check (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create trigger notification_preferences_set_updated_at
  before update on public.notification_preferences
  for each row execute function public.set_updated_at();

-- Cold callers were never a valid announcement audience even though the
-- Cold Caller Portal (0013) postdates this table — they could never be
-- targeted by an announcement. Fixed here since notifications now need it.
alter table public.announcements drop constraint if exists announcements_audience_check;
alter table public.announcements
  add constraint announcements_audience_check
  check (audience in ('everyone', 'staff', 'intern', 'caller'));

-- Realtime: let clients subscribe to postgres_changes on their own
-- notification rows (RLS above still scopes what they actually receive).
alter publication supabase_realtime add table public.notifications;
