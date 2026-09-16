-- Hardens the Staff/Intern ID → email lookup used by LoginForm.tsx.
--
-- The security audit found that get_staff_login_info (and the dead
-- get_staff_email it replaced) returns a real, valid staff member's email
-- and role to ANY unauthenticated caller who supplies a Staff ID — not just
-- through the app's UI, but to a direct REST/RPC call. Since the UI only
-- shows a generic "Invalid Staff ID or password" message, this doesn't leak
-- through the app itself, but it's a real enumeration + PII-disclosure
-- oracle: a script can try LX-001..LX-999 against the RPC directly and
-- harvest every real employee's email in minutes.
--
-- Fully removing the leak would mean moving ID→email resolution + sign-in
-- server-side (an Edge Function using the service-role key) so the client
-- never receives a raw email — a real architecture change to the login
-- flow, intentionally NOT done here without a product decision on it.
--
-- This migration applies the two mitigations that don't require that
-- redesign: (1) revoke the still-live, fully redundant get_staff_email
-- function from 0001 — same leak, dead code, no reason it's still grantable;
-- (2) rate-limit get_staff_login_info per Staff ID so a script can't
-- enumerate hundreds of IDs per minute. Run once, after 0001-0005.

revoke all on function public.get_staff_email(text) from public, anon, authenticated;

create table if not exists public.staff_login_attempts (
  staff_id text not null,
  attempted_at timestamptz not null default now()
);

create index if not exists staff_login_attempts_staff_id_idx
  on public.staff_login_attempts (staff_id, attempted_at);

alter table public.staff_login_attempts enable row level security;
-- No policies: not directly readable/writable by anon/authenticated — only
-- the SECURITY DEFINER function below touches this table.

create or replace function public.get_staff_login_info(staff_id_input text)
returns table(email text, role text)
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_attempts int;
begin
  select count(*) into recent_attempts
  from public.staff_login_attempts
  where staff_id = staff_id_input
    and attempted_at > now() - interval '15 minutes';

  insert into public.staff_login_attempts (staff_id) values (staff_id_input);

  -- More than 10 lookups for the same Staff ID in 15 minutes: stop
  -- resolving it, same as if it didn't exist. A real user mistyping their
  -- ID or password will never hit this; a script enumerating IDs will.
  if recent_attempts >= 10 then
    return;
  end if;

  return query
    select s.email, s.role from public.staff s where s.staff_id = staff_id_input;
end;
$$;

revoke all on function public.get_staff_login_info(text) from public;
grant execute on function public.get_staff_login_info(text) to anon, authenticated;
