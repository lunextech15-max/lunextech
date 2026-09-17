-- Revokes get_staff_login_info from anon/authenticated now that login
-- resolution happens server-side instead (src/app/api/staff-login/route.ts
-- in both the public and admin repos, using the service-role key). The
-- RPC previously let ANY caller — not just the login form — resolve a
-- Staff ID directly to a real employee's email + role. 0006's rate limit
-- made that slow to abuse, not impossible; this closes it outright rather
-- than just slowing it down. The function and its rate-limiting table
-- (staff_login_attempts) stay in place — the new Route Handlers use the
-- table directly via the service-role client, and the function is kept,
-- unreachable, in case anything else ever needs a SECURITY DEFINER
-- reference for it. Run once, after 0001-0016.

revoke execute on function public.get_staff_login_info(text) from anon, authenticated;
