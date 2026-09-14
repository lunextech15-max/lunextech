// Next.js 16 renamed Middleware to Proxy (same mechanism, new file/export
// name) — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md.
// Refreshes the Supabase auth session cookie and gates /staff/* and
// /intern/* behind it. The admin panel is a separate deployment
// (lunextech-admin) with its own proxy.

import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/staff", "/staff/:path*", "/intern", "/intern/:path*"],
};
