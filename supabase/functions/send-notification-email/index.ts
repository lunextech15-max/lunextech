// Supabase Edge Function — the ONLY place RESEND_API_KEY is ever used.
// Input: { notification_id: string }
//
// Flow: load the notification -> load the recipient's email from
// public.staff -> re-check the recipient's own notification_preferences
// (the client that requested this can't read another user's preferences —
// RLS blocks that — so this is the real gate) -> render a template ->
// send via Resend -> mark email_sent / email_sent_at, or record
// email_error without leaking details to the caller.
//
// Deploy: supabase functions deploy send-notification-email
// Secrets:  supabase secrets set RESEND_API_KEY=... EMAIL_FROM="LUNEX TECH <notifications@your-verified-domain>" APP_URL=https://your-deployed-app

import { createClient } from "npm:@supabase/supabase-js@2";
import { renderEmail } from "./templates.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "LUNEX TECH <notifications@lunextech.dev>";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const APP_URL = Deno.env.get("APP_URL") ?? "";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CRITICAL_TYPES = ["ACCOUNT_CREATED", "PASSWORD_RESET", "SYSTEM_ALERT"];

const PREFERENCE_COLUMN: Record<string, string> = {
  TASK_ASSIGNED: "task_email",
  TASK_UPDATED: "task_email",
  LEAD_ASSIGNED: "lead_email",
  LEAD_UPDATED: "lead_email",
  FOLLOW_UP_DUE: "followup_email",
  PROJECT_ASSIGNED: "project_email",
  PROJECT_UPDATED: "project_email",
  ANNOUNCEMENT: "announcement_email",
  ATTENDANCE_REMINDER: "attendance_email",
  ATTENDANCE_UPDATED: "attendance_email",
  APPLICATION_RECEIVED: "application_email",
  APPLICATION_STATUS_UPDATED: "application_email",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  // Supabase verifies the JWT/service-role key on the Authorization header
  // before this code runs (verify_jwt is on by default for a deployed
  // function) — this is a defense-in-depth check, not the only gate.
  if (!req.headers.get("Authorization")) {
    return json({ error: "Unauthorized" }, 401);
  }

  let notificationId: string | undefined;
  try {
    const body = await req.json();
    notificationId = typeof body?.notification_id === "string" ? body.notification_id : undefined;
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  if (!notificationId) {
    return json({ error: "notification_id is required" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    const { data: notification, error: notifError } = await admin
      .from("notifications")
      .select("*")
      .eq("id", notificationId)
      .maybeSingle();

    if (notifError) {
      console.error("send-notification-email: notification lookup failed", notifError);
      return json({ error: "Lookup failed" }, 500);
    }
    if (!notification) {
      return json({ error: "Notification not found" }, 404);
    }
    if (notification.email_sent) {
      return json({ ok: true, skipped: "already_sent" });
    }
    if (!notification.email_requested) {
      return json({ ok: true, skipped: "not_requested" });
    }

    const { data: recipient } = await admin
      .from("staff")
      .select("email, full_name")
      .eq("staff_id", notification.recipient_staff_id)
      .maybeSingle();

    if (!recipient?.email) {
      await admin
        .from("notifications")
        .update({ email_error: "recipient has no email on file" })
        .eq("id", notificationId);
      return json({ ok: false, skipped: "no_recipient_email" });
    }

    if (!CRITICAL_TYPES.includes(notification.type)) {
      const preferenceColumn = PREFERENCE_COLUMN[notification.type];
      if (preferenceColumn) {
        const { data: prefs } = await admin
          .from("notification_preferences")
          .select(preferenceColumn)
          .eq("staff_id", notification.recipient_staff_id)
          .maybeSingle();
        // No preferences row yet -> defaults apply (everything on except attendance).
        const allowed = prefs
          ? Boolean((prefs as Record<string, boolean>)[preferenceColumn])
          : preferenceColumn !== "attendance_email";
        if (!allowed) {
          return json({ ok: true, skipped: "recipient_opted_out" });
        }
      }
    }

    if (!RESEND_API_KEY) {
      console.error("send-notification-email: RESEND_API_KEY is not configured");
      await admin
        .from("notifications")
        .update({ email_error: "email service not configured" })
        .eq("id", notificationId);
      return json({ ok: false, error: "Email service not configured" });
    }

    const { subject, html } = renderEmail(notification, recipient.full_name ?? "", APP_URL);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: EMAIL_FROM, to: recipient.email, subject, html }),
    });

    if (!resendResponse.ok) {
      console.error("send-notification-email: Resend request failed", resendResponse.status);
      await admin
        .from("notifications")
        .update({ email_error: `delivery failed (${resendResponse.status})` })
        .eq("id", notificationId);
      return json({ ok: false, error: "Email delivery failed" });
    }

    await admin
      .from("notifications")
      .update({ email_sent: true, email_sent_at: new Date().toISOString(), email_error: null })
      .eq("id", notificationId);

    return json({ ok: true });
  } catch (err) {
    console.error("send-notification-email: unexpected error", err);
    return json({ error: "Internal error" }, 500);
  }
});
