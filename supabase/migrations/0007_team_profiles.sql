-- Turns public.staff into the real team directory the admin People page
-- reads/writes, instead of the hardcoded MOCK_TEAM/ADMIN_INTERNS constants
-- in the admin repo. Adds the profile fields the admin UI needs and lets an
-- admin (role = 'admin', via get_my_role() from 0002_roles.sql) manage the
-- whole roster. Run once, after 0001-0006.
--
-- Note: this only manages the *profile* row. Creating the matching Supabase
-- Auth login (email + password) is still a separate manual step in
-- Supabase Dashboard -> Authentication -> Users, same as documented in
-- 0001_staff_auth.sql — there is no service-role key available to this app
-- to automate that part from the client.

alter table public.staff
  add column if not exists title text,
  add column if not exists department text,
  add column if not exists status text not null default 'active'
    check (status in ('active', 'inactive')),
  add column if not exists internship_role text,
  add column if not exists supervisor_staff_id text references public.staff(staff_id),
  add column if not exists internship_start date,
  add column if not exists internship_end date;

create policy "admins can view staff"
  on public.staff
  for select
  to authenticated
  using (public.get_my_role() = 'admin');

create policy "admins can insert staff"
  on public.staff
  for insert
  to authenticated
  with check (public.get_my_role() = 'admin');

create policy "admins can update staff"
  on public.staff
  for update
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "admins can delete staff"
  on public.staff
  for delete
  to authenticated
  using (public.get_my_role() = 'admin');
