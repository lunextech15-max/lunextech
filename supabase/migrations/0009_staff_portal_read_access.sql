-- 0007/0008 made public.staff / public.projects / public.project_members
-- admin-only, including SELECT — correct for the Admin Panel, but it means
-- an ordinary signed-in staff member or intern can't see the team
-- directory or the project list in the Staff Portal at all. Adds read-only
-- access for any authenticated user; write access stays admin-only (no
-- change to the insert/update/delete policies from 0007/0008).

create policy "authenticated users can view staff"
  on public.staff for select to authenticated
  using (true);

create policy "authenticated users can view projects"
  on public.projects for select to authenticated
  using (true);

create policy "authenticated users can view project members"
  on public.project_members for select to authenticated
  using (true);
