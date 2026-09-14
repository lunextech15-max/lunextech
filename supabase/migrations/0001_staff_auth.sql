-- Staff Portal auth: lets staff sign in with a Staff ID (e.g. "LX-014")
-- instead of an email, by resolving it to the email on their real Supabase
-- Auth account. Run this once in the Supabase SQL Editor
-- (Project → SQL Editor → New query → paste → Run).

create table if not exists public.staff (
  staff_id text primary key,
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;
-- Intentionally no SELECT/INSERT/UPDATE policies: this table is not
-- directly readable or writable by anon/authenticated roles. The only
-- sanctioned read path is the SECURITY DEFINER function below, which
-- returns nothing but the one email a valid Staff ID maps to.

create or replace function public.get_staff_email(staff_id_input text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select email from public.staff where staff_id = staff_id_input;
$$;

revoke all on function public.get_staff_email(text) from public;
grant execute on function public.get_staff_email(text) to anon, authenticated;

-- To add a staff member:
--   1. Supabase Dashboard → Authentication → Users → Add user
--      (set their real email + a temporary password).
--   2. Then run:
--      insert into public.staff (staff_id, email, full_name)
--      values ('LX-014', 'their-real-email@example.com', 'Their Name');
