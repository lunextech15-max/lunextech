-- Lets a signed-in staff member edit their own display name, title, and
-- skills from the Staff Portal profile page. Before this, ProfileContent.tsx
-- held those edits in local-only React state that was never written back
-- anywhere (see its removed "Prototype-local edit state" comment) — a
-- leftover from the pre-migration prototype that a mock-data sweep caught.
--
-- Uses a SECURITY DEFINER RPC rather than a broad self-UPDATE RLS policy on
-- public.staff: a policy gated only on row ownership would let a signed-in
-- staff member update ANY column on their own row via the anon key,
-- including role/status — this RPC only ever touches full_name, title, and
-- skills, so it can't be used to escalate privilege. Run once, after
-- 0001-0017.

alter table public.staff
  add column if not exists skills text[] not null default '{}';

create or replace function public.update_my_staff_profile(
  p_full_name text,
  p_title text,
  p_skills text[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.staff
  set
    full_name = coalesce(nullif(trim(p_full_name), ''), full_name),
    title = nullif(trim(p_title), ''),
    skills = coalesce(p_skills, '{}')
  where email = auth.jwt() ->> 'email';
end;
$$;

revoke all on function public.update_my_staff_profile(text, text, text[]) from public;
grant execute on function public.update_my_staff_profile(text, text, text[]) to authenticated;
