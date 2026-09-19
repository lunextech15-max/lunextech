// Supabase Edge Function backing Admin -> Settings -> Email -> Send Test
// Email. Sends a fixed test message to the calling admin's own address —
// never an arbitrary address from the request body, so this can't be used
// to spam anyone else. Requires a signed-in admin; verified against the
// caller's own JWT (not something the request body can spoof).
//
// Deploy: supabase functions deploy send-test-email
// Uses the same RESEND_API_KEY / EMAIL_FROM secrets as send-notification-email.

import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "LUNEX TECH <notifications@lunextech.dev>";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

const TEST_EMAIL_HTML = (adminName: string) => `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0b0b0b;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" style="max-width:480px;background:#000000;border:1px solid #1a1a1a;">
          <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #1a1a1a;">
            <span style="font-size:15px;font-weight:900;color:#e5e5e5;">LUNEX <span style="color:#ff1a1a;">TECH</span></span>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(229,229,229,0.4);">System test</p>
            <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#e5e5e5;">LUNEX Email System Test</h1>
            <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(229,229,229,0.65);">
              Hi ${adminName}, this confirms the LUNEX notification email pipeline (Resend + the send-notification-email Edge Function) is configured correctly.
            </p>
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
            <p style="margin:0;font-size:10.5px;color:rgba(229,229,229,0.3);">LUNEX TECH — sent from Admin &gt; Settings &gt; Email &gt; Send Test Email.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Unauthorized" }, 401);

  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
  } = await userClient.auth.getUser();
  if (!user?.email) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data: staffRow } = await admin
    .from("staff")
    .select("role, email, full_name")
    .eq("email", user.email)
    .maybeSingle();

  if (!staffRow || staffRow.role !== "admin") {
    return json({ error: "Admin access required" }, 403);
  }

  if (!RESEND_API_KEY) {
    return json({ ok: false, error: "Email service not configured" });
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: staffRow.email,
        subject: "LUNEX Email System Test",
        html: TEST_EMAIL_HTML(staffRow.full_name?.split(" ")[0] ?? "there"),
      }),
    });

    if (!resendResponse.ok) {
      console.error("send-test-email: Resend request failed", resendResponse.status);
      return json({ ok: false, error: "Email failed to send" });
    }

    return json({ ok: true, sentTo: staffRow.email });
  } catch (err) {
    console.error("send-test-email: unexpected error", err);
    return json({ ok: false, error: "Internal error" });
  }
});
