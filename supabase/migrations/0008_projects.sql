-- Real projects + project membership, replacing the admin panel's
-- hardcoded MOCK_PROJECTS (src/lib/staff/projects-data.ts in the admin
-- repo). The company hasn't started operating yet, so this starts empty —
-- admins add real projects through the admin UI. Run once, after 0001-0007.

create table if not exists public.projects (
  code text primary key,
  name text not null,
  slug text not null unique,
  category text not null default 'Other',
  description text not null default '',
  status text not null default 'planning'
    check (status in ('planning', 'in-progress', 'review', 'completed', 'archived')),
  progress smallint not null default 0
    check (progress >= 0 and progress <= 100),
  objective text not null default '',
  started_date date,
  next_milestone text not null default '',
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "admins can view projects"
  on public.projects for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "admins can insert projects"
  on public.projects for insert to authenticated
  with check (public.get_my_role() = 'admin');

create policy "admins can update projects"
  on public.projects for update to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "admins can delete projects"
  on public.projects for delete to authenticated
  using (public.get_my_role() = 'admin');

-- Who's assigned to each project. References public.staff (real roster,
-- 0007_team_profiles.sql) instead of the old free-text team array.
create table if not exists public.project_members (
  project_code text not null references public.projects(code) on delete cascade,
  staff_id text not null references public.staff(staff_id) on delete cascade,
  role_on_project text,
  added_at timestamptz not null default now(),
  primary key (project_code, staff_id)
);

alter table public.project_members enable row level security;

create policy "admins can view project members"
  on public.project_members for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "admins can insert project members"
  on public.project_members for insert to authenticated
  with check (public.get_my_role() = 'admin');

create policy "admins can delete project members"
  on public.project_members for delete to authenticated
  using (public.get_my_role() = 'admin');
