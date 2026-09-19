// Dark, LUNEX-branded transactional email shell — every notification type
// renders through this one wrapper so the visual identity stays consistent.
// Deliberately not a marketing template: one message, one action, a plain
// "Open in LUNEX" link, a short footer. No hero image, no multi-column
// layout, no promotional framing.

type NotificationRow = {
  type: string;
  title: string;
  message: string;
  action_url: string | null;
  priority: string;
};

const SUBJECT_BY_TYPE: Record<string, string> = {
  ACCOUNT_CREATED: "Your LUNEX account has been created",
  PASSWORD_RESET: "LUNEX password reset",
  TASK_ASSIGNED: "New task assigned — LUNEX",
  TASK_UPDATED: "Task updated — LUNEX",
  LEAD_ASSIGNED: "New lead assigned — LUNEX",
  LEAD_UPDATED: "Lead updated — LUNEX",
  FOLLOW_UP_DUE: "Follow-up due — LUNEX",
  PROJECT_ASSIGNED: "Project assigned — LUNEX",
  PROJECT_UPDATED: "Project update — LUNEX",
  APPLICATION_RECEIVED: "New application received — LUNEX",
  APPLICATION_STATUS_UPDATED: "Application update — LUNEX",
  ATTENDANCE_REMINDER: "Attendance reminder — LUNEX",
  ATTENDANCE_UPDATED: "Attendance updated — LUNEX",
  COMMENT_ADDED: "New comment — LUNEX",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baseTemplate(opts: { title: string; bodyHtml: string; ctaLabel?: string; ctaUrl?: string; appUrl: string }): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0b0b0b;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:480px;background:#000000;border:1px solid #1a1a1a;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #1a1a1a;">
                <span style="font-size:15px;font-weight:900;letter-spacing:0.02em;color:#e5e5e5;">LUNEX <span style="color:#ff1a1a;">TECH</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(229,229,229,0.4);">Notification</p>
                <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;color:#e5e5e5;line-height:1.3;">${escapeHtml(opts.title)}</h1>
                <div style="font-size:14px;line-height:1.7;color:rgba(229,229,229,0.65);">${opts.bodyHtml}</div>
                ${
                  opts.ctaUrl
                    ? `<a href="${opts.ctaUrl}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#ff1a1a;color:#0b0b0b;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">${escapeHtml(opts.ctaLabel ?? "Open in LUNEX")}</a>`
                    : ""
                }
                <p style="margin:28px 0 0;">
                  <a href="${opts.appUrl}" style="font-size:11px;color:rgba(229,229,229,0.4);text-decoration:underline;">Open in LUNEX →</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
                <p style="margin:0;font-size:10.5px;line-height:1.6;color:rgba(229,229,229,0.3);">
                  LUNEX TECH — this is a transactional notification tied to your account activity, sent to the email on file for your LUNEX ID. Manage which of these you receive from Notification Preferences inside your portal.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderEmail(
  notification: NotificationRow,
  recipientName: string,
  appUrl: string
): { subject: string; html: string } {
  const ctaUrl = notification.action_url ? `${appUrl}${notification.action_url}` : undefined;
  const firstName = recipientName.trim().split(/\s+/)[0] || "there";

  const subject =
    notification.type === "ANNOUNCEMENT"
      ? `LUNEX Announcement — ${notification.title}`
      : notification.type === "SYSTEM_ALERT"
        ? `LUNEX System Alert — ${notification.title}`
        : (SUBJECT_BY_TYPE[notification.type] ?? `LUNEX — ${notification.title}`);

  const bodyHtml = `<p style="margin:0 0 12px;">Hi ${escapeHtml(firstName)},</p><p style="margin:0;">${escapeHtml(notification.message)}</p>`;

  return {
    subject,
    html: baseTemplate({ title: notification.title, bodyHtml, ctaUrl, appUrl }),
  };
}
