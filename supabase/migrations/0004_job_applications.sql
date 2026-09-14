-- Job applications: lets the public /careers/apply/:jobSlug form write a
-- real, persisted application row. Run this once in the Supabase SQL
-- Editor, after 0001_staff_auth.sql, 0002_roles.sql, and 0003_applications.sql.
--
-- Resume upload is UI-only for now (file name only, no storage) — this
-- table records resume_file_name as a plain text field until Supabase
-- Storage is wired up for actual file uploads.

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  location text not null default '',
  job_id text not null,
  current_position text not null default '',
  experience_level text not null default '',
  experience text not null default '',
  skills text not null default '',
  portfolio text not null default '',
  github text not null default '',
  linkedin text not null default '',
  motivation text not null default '',
  resume_file_name text not null default '',
  status text not null default 'NEW' check (status in ('NEW', 'UNDER_REVIEW', 'INTERVIEW', 'ACCEPTED', 'REJECTED')),
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

-- Anyone (including a signed-out visitor) can submit an application, but
-- cannot read, update, or delete any row — including their own. Reviewing
-- applications is an admin-only capability, added when that read path is
-- built (a SECURITY DEFINER RPC gated on get_my_role() = 'admin', the same
-- pattern as 0002_roles.sql).
create policy "anyone can submit a job application"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);
