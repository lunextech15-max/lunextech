// Next.js 16 renamed Middleware to Proxy (same mechanism, new file/export
// name) — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md.
// Refreshes the Supabase auth session cookie on every matched request.

import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/staff/:path*"],
};
