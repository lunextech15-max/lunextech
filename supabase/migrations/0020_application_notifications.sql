-- Notifies every active admin (in-app) when a new internship or job
-- application comes in. Done as a trigger, not an app-layer call, because
-- both application forms insert via the anon key from a signed-out
-- visitor's browser — there's no server-side request in that path to call
-- src/lib/notifications/create-*.ts from. email_requested stays false
-- (APPLICATION_RECEIVED's default, see TYPE_META) — admins can still opt
-- into email for this category from their own Notification Preferences.
--
-- APPLICATION_STATUS_UPDATED (the applicant-facing side, when an admin
-- changes an application's status) is NOT wired anywhere yet: an applicant
-- has no public.staff row / staff_id, so it can't be a row in
-- public.notifications, which requires one. That would need a separate,
-- non-table email path — deliberately out of scope for this migration.
-- Run once, after 0001-0019.

create or replace function public.notify_admins_of_application(
  p_applicant_name text,
  p_entity_type text,
  p_entity_id uuid,
  p_action_url text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (recipient_staff_id, title, message, type, category, action_url, entity_type, entity_id)
  select
    s.staff_id,
    'New application received',
    p_applicant_name || ' just applied — review it in Applications.',
    'APPLICATION_RECEIVED',
    'application',
    p_action_url,
    p_entity_type,
    p_entity_id::text
  from public.staff s
  where s.role = 'admin' and s.status = 'active';
end;
$$;

create or replace function public.on_internship_application_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.notify_admins_of_application(new.name, 'application', new.id, '/admin/applications');
  return new;
end;
$$;

drop trigger if exists internship_application_notify on public.applications;
create trigger internship_application_notify
  after insert on public.applications
  for each row execute function public.on_internship_application_insert();

create or replace function public.on_job_application_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.notify_admins_of_application(new.name, 'job_application', new.id, '/admin/applications');
  return new;
end;
$$;

drop trigger if exists job_application_notify on public.job_applications;
create trigger job_application_notify
  after insert on public.job_applications
  for each row execute function public.on_job_application_insert();
