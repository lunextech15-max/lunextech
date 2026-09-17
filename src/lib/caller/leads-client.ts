// Client-only: writes to public.leads / public.lead_calls. RLS
// (0013_cold_caller_portal.sql): a caller can only update their own
// assigned leads and can only log a call as themselves.

"use client";

import { createClient } from "@/lib/supabase/client";
import type { LeadStatus } from "./types";

export type RecordCallInput = {
  leadId: string;
  callerStaffId: string;
  status: LeadStatus;
  notes: string;
  followUpDate?: string;
};

/** The Call Queue's RECORD RESULT action — logs the call in history AND
 * updates the lead's current status/last-contact/follow-up in one go. */
export async function recordCall(input: RecordCallInput): Promise<{ error: string | null }> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { error: callError } = await supabase.from("lead_calls").insert({
    lead_id: input.leadId,
    caller_staff_id: input.callerStaffId,
    status: input.status,
    notes: input.notes,
  });

  if (callError) {
    return { error: callError.message };
  }

  const { error: leadError } = await supabase
    .from("leads")
    .update({
      status: input.status,
      last_contact_at: now,
      follow_up_date: input.followUpDate || null,
      updated_at: now,
    })
    .eq("id", input.leadId);

  return { error: leadError?.message ?? null };
}

export type UpdateLeadWorkspaceInput = {
  leadId: string;
  requirement?: string;
  interestedService?: string;
  budgetRange?: string;
  notes?: string;
  followUpDate?: string;
};

/** The Lead Workspace's save action — editing the lead's own detail
 * fields, separate from logging a call. */
export async function updateLeadWorkspace(input: UpdateLeadWorkspaceInput): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      requirement: input.requirement,
      interested_service: input.interestedService,
      budget_range: input.budgetRange,
      notes: input.notes,
      follow_up_date: input.followUpDate || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.leadId);

  return { error: error?.message ?? null };
}

export async function convertLead(leadId: string, callerStaffId: string): Promise<{ error: string | null }> {
  return recordCall({ leadId, callerStaffId, status: "converted", notes: "Converted to opportunity." });
}
