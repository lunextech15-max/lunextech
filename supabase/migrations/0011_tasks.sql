-- Real tasks, replacing the admin/staff/intern portals' hardcoded
-- MOCK_TASKS (src/lib/staff/tasks-data.ts). Starts empty — no fabricated
-- task history. Run once, after 0001-0010.

create table if not exists public.tasks (
  id text primary key,
  title text not null,
  description text not null default '',
  project_code text references public.projects(code) on delete set null,
  status text not null default 'todo'
    check (status in ('todo', 'in-progress', 'in-review', 'completed')),
  priority text not null default 'medium'
    check (priority in ('high', 'medium', 'low')),
  assignee_staff_id text references public.staff(staff_id) on delete set null,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_project_idx on public.tasks (project_code);
create index if not exists tasks_assignee_idx on public.tasks (assignee_staff_id);

alter table public.tasks enable row level security;

-- Tasks aren't sensitive — any signed-in team member can see the full
-- board (matches "authenticated users can view projects" in 0009).
create policy "authenticated users can view tasks"
  on public.tasks for select to authenticated
  using (true);

create policy "staff and admin can create tasks"
  on public.tasks for insert to authenticated
  with check (public.get_my_role() in ('admin', 'staff'));

-- Staff/admin can edit any task; the assignee (including an intern) can
-- update their own — e.g. moving it to in-progress/completed.
create policy "staff, admin, and the assignee can update tasks"
  on public.tasks for update to authenticated
  using (
    public.get_my_role() in ('admin', 'staff')
    or assignee_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
  )
  with check (
    public.get_my_role() in ('admin', 'staff')
    or assignee_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
  );

create policy "admins can delete tasks"
  on public.tasks for delete to authenticated
  using (public.get_my_role() = 'admin');

create table if not exists public.task_checklist_items (
  id uuid primary key default gen_random_uuid(),
  task_id text not null references public.tasks(id) on delete cascade,
  label text not null,
  completed boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists task_checklist_items_task_idx on public.task_checklist_items (task_id, position);

alter table public.task_checklist_items enable row level security;

create policy "authenticated users can view checklist items"
  on public.task_checklist_items for select to authenticated
  using (true);

create policy "staff, admin, and the assignee can manage checklist items"
  on public.task_checklist_items for all to authenticated
  using (
    public.get_my_role() in ('admin', 'staff')
    or exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and t.assignee_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
    )
  )
  with check (
    public.get_my_role() in ('admin', 'staff')
    or exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and t.assignee_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email')
    )
  );

create table if not exists public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id text not null references public.tasks(id) on delete cascade,
  author_staff_id text not null references public.staff(staff_id),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists task_comments_task_idx on public.task_comments (task_id, created_at);

alter table public.task_comments enable row level security;

create policy "authenticated users can view comments"
  on public.task_comments for select to authenticated
  using (true);

-- Anyone signed in can comment on a task (matches how the old mock data
-- let any team member leave a comment) — but only as themselves.
create policy "authenticated users can comment as themselves"
  on public.task_comments for insert to authenticated
  with check (author_staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));
