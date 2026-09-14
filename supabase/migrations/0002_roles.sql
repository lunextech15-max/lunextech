-- Adds a role to each staff account and the RPCs needed for the shared
-- login screen (Admin / Staff / Intern) to resolve both the login email
-- and the role-based redirect. Run once in the Supabase SQL Editor, after
-- 0001_staff_auth.sql.

alter table public.staff
  add column if not exists role text not null default 'staff'
    check (role in ('admin', 'staff', 'intern'));

-- Replaces get_staff_email: now returns both email and role in one call.
create or replace function public.get_staff_login_info(staff_id_input text)
returns table(email text, role text)
language sql
security definer
set search_path = public
stable
as $$
  select email, role from public.staff where staff_id = staff_id_input;
$$;

revoke all on function public.get_staff_login_info(text) from public;
grant execute on function public.get_staff_login_info(text) to anon, authenticated;

-- Lets an already-authenticated user check ONLY their own role (used by
-- proxy.ts to gate /admin/*) — never exposes anyone else's.
create or replace function public.get_my_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.staff where email = (auth.jwt() ->> 'email');
$$;

revoke all on function public.get_my_role() from public;
grant execute on function public.get_my_role() to authenticated;

-- To make an account an admin:
--   update public.staff set role = 'admin' where staff_id = 'ADMIN-001';
