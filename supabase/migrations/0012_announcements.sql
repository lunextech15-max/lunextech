-- Real announcements, replacing MOCK_ANNOUNCEMENTS (announcements-data.ts)
-- across the Admin Panel, Staff Portal, and Intern Portal. Starts empty —
-- no fabricated history. Run once, after 0001-0011.

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  category text not null default 'general'
    check (category in ('general', 'project', 'team', 'system')),
  priority text not null default 'normal'
    check (priority in ('normal', 'important')),
  -- Who it's meant for — matches the audience picker already built into
  -- the Admin Panel's Create Announcement form.
  audience text not null default 'everyone'
    check (audience in ('everyone', 'staff', 'intern')),
  published boolean not null default true,
  author_staff_id text not null references public.staff(staff_id),
  created_at timestamptz not null default now()
);

create index if not exists announcements_created_idx on public.announcements (created_at desc);

alter table public.announcements enable row level security;

-- Staff/admin manage announcements, so they see everything, drafts
-- included. Interns only see published announcements meant for them.
create policy "staff and admin can view all announcements"
  on public.announcements for select to authenticated
  using (public.get_my_role() in ('admin', 'staff'));

create policy "interns can view published announcements for them"
  on public.announcements for select to authenticated
  using (published = true and audience in ('everyone', 'intern') and public.get_my_role() = 'intern');

create policy "staff and admin can create announcements"
  on public.announcements for insert to authenticated
  with check (public.get_my_role() in ('admin', 'staff'));

create policy "staff and admin can edit announcements"
  on public.announcements for update to authenticated
  using (public.get_my_role() in ('admin', 'staff'))
  with check (public.get_my_role() in ('admin', 'staff'));

create policy "admins can delete announcements"
  on public.announcements for delete to authenticated
  using (public.get_my_role() = 'admin');
