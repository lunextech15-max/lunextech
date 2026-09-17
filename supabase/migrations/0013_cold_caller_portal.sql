-- Cold Caller Portal: a new login role (alongside admin/staff/intern),
-- with its own leads pipeline, call logging, admin-authored scripts, and
-- per-caller targets. Run once, after 0001-0012.

-- 1. Add 'caller' as a valid role. Postgres can't ALTER a check
--    constraint in place, so drop and recreate it.
alter table public.staff drop constraint if exists staff_role_check;
alter table public.staff
  add constraint staff_role_check check (role in ('admin', 'staff', 'intern', 'caller'));

-- 2. Caller-specific profile fields, same pattern as the intern-specific
--    fields 0007 added (territory/target are meaningless for other roles,
--    left null).
alter table public.staff
  add column if not exists territory text,
  add column if not exists daily_call_target integer;

-- 3. Leads. Admin creates and assigns; the assigned caller works it.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null default '',
  phone text not null,
  email text not null default '',
  location text not null default '',
  source text not null default '',
  assigned_caller_id text references public.staff(staff_id) on delete set null,
  status text not null default 'not-called'
    check (status in (
      'not-called', 'no-answer', 'connected', 'interested',
      'follow-up', 'not-interested', 'wrong-number', 'converted'
    )),
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  requirement text not null default '',
  interested_service text not null default '',
  budget_range text not null default '',
  follow_up_date date,
  last_contact_at timestamptz,
  notes text not null default '',
  created_by text not null references public.staff(staff_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_assigned_caller_idx on public.leads (assigned_caller_id);
create index if not exists leads_follow_up_idx on public.leads (follow_up_date);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

create policy "admins can view all leads"
  on public.leads for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "callers can view their own leads"
  on public.leads for select to authenticated
  using (assigned_caller_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "admins can create leads"
  on public.leads for insert to authenticated
  with check (public.get_my_role() = 'admin');

create policy "admins can update any lead"
  on public.leads for update to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "callers can update their own leads"
  on public.leads for update to authenticated
  using (assigned_caller_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'))
  with check (assigned_caller_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "admins can delete leads"
  on public.leads for delete to authenticated
  using (public.get_my_role() = 'admin');

-- 4. Call log — append-only history of every call made against a lead.
--    This is what "Contact history" / "Follow-up history" reads from, and
--    what the Call Queue writes to on RECORD RESULT.
create table if not exists public.lead_calls (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  caller_staff_id text not null references public.staff(staff_id),
  status text not null
    check (status in (
      'not-called', 'no-answer', 'connected', 'interested',
      'follow-up', 'not-interested', 'wrong-number', 'converted'
    )),
  notes text not null default '',
  called_at timestamptz not null default now()
);

create index if not exists lead_calls_lead_idx on public.lead_calls (lead_id, called_at desc);
create index if not exists lead_calls_caller_idx on public.lead_calls (caller_staff_id, called_at desc);

alter table public.lead_calls enable row level security;

create policy "admins can view all calls"
  on public.lead_calls for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "callers can view their own calls"
  on public.lead_calls for select to authenticated
  using (caller_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "callers and admins can log a call as themselves"
  on public.lead_calls for insert to authenticated
  with check (
    caller_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
  );

-- 5. Scripts — admin-authored, empty until admin writes them (no
--    fabricated pitch copy). category is free text so admin isn't locked
--    to exactly the 6 starter types.
create table if not exists public.call_scripts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'general',
  content text not null default '',
  position integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.call_scripts enable row level security;

create policy "admins and callers can view scripts"
  on public.call_scripts for select to authenticated
  using (public.get_my_role() in ('admin', 'caller'));

create policy "admins can manage scripts"
  on public.call_scripts for all to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
