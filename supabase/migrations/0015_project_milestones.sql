-- Real project milestones, replacing the admin panel's hardcoded
-- MILESTONES_BY_PROJECT (src/lib/admin/milestones-data.ts) — the one
-- piece of Projects still mock after 0008_projects.sql went real. Starts
-- empty per project; admin adds real milestones through the UI.
-- Run once, after 0001-0014.

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_code text not null references public.projects(code) on delete cascade,
  title text not null,
  status text not null default 'upcoming'
    check (status in ('completed', 'in-progress', 'upcoming')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_milestones_project_idx on public.project_milestones (project_code, position);

alter table public.project_milestones enable row level security;

-- Matches the read access on public.projects itself (0009) — any signed-in
-- team member can see a project's milestones.
create policy "authenticated users can view milestones"
  on public.project_milestones for select to authenticated
  using (true);

create policy "staff and admin can manage milestones"
  on public.project_milestones for all to authenticated
  using (public.get_my_role() in ('admin', 'staff'))
  with check (public.get_my_role() in ('admin', 'staff'));
