// Server-only Supabase client using the service-role key — bypasses RLS
// entirely, so it must NEVER be imported into a Client Component. Used
// only by the staff-login Route Handler, to resolve a Staff ID to its
// email server-side without ever exposing that email to the client (see
// src/app/api/staff-login/route.ts). Reads SUPABASE_SERVICE_ROLE_KEY,
// which has no NEXT_PUBLIC_ prefix, so it's only ever available server-side.

import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "createAdminClient: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
