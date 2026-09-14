-- Lets an admin (role = 'admin', via get_my_role() from 0002_roles.sql)
-- actually read and update the two application tables — 0003 and 0004
-- only ever granted INSERT, so nobody (including admins) could see
-- submitted applications until now. Run this once in the Supabase SQL
-- Editor, after 0001, 0002, 0003, and 0004.

create policy "admins can view internship applications"
  on public.applications
  for select
  to authenticated
  using (public.get_my_role() = 'admin');

create policy "admins can update internship applications"
  on public.applications
  for update
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "admins can view job applications"
  on public.job_applications
  for select
  to authenticated
  using (public.get_my_role() = 'admin');

create policy "admins can update job applications"
  on public.job_applications
  for update
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
