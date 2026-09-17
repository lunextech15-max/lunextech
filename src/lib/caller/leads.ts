// Server-only: reads real leads and call history for the signed-in caller
// from Supabase public.leads / public.lead_calls. RLS
// (0013_cold_caller_portal.sql): a caller only ever sees leads assigned to
// them and calls they made.

import { createClient } from "@/lib/supabase/server";
import type { Lead, LeadCall, LeadPriority, LeadStatus } from "./types";

type LeadRow = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  source: string;
  assigned_caller_id: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  requirement: string;
  interested_service: string;
  budget_range: string;
  follow_up_date: string | null;
  last_contact_at: string | null;
  notes: string;
  created_at: string;
};

type LeadCallRow = {
  id: string;
  lead_id: string;
  caller_staff_id: string;
  status: LeadStatus;
  notes: string;
  called_at: string;
};

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    phone: row.phone,
    email: row.email,
    location: row.location,
    source: row.source,
    assignedCallerId: row.assigned_caller_id,
    status: row.status,
    priority: row.priority,
    requirement: row.requirement,
    interestedService: row.interested_service,
    budgetRange: row.budget_range,
    followUpDate: row.follow_up_date,
    lastContactAt: row.last_contact_at,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

/** Every lead visible to the caller — their own assigned leads, per RLS. */
export async function getMyLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("getMyLeads: query failed", error);
    return [];
  }

  return ((data ?? []) as LeadRow[]).map(toLead);
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error(`getLead: query failed for ${id}`, error);
    return null;
  }

  return data ? toLead(data as LeadRow) : null;
}

async function toLeadCalls(callRows: LeadCallRow[]): Promise<LeadCall[]> {
  const supabase = await createClient();
  const callerIds = Array.from(new Set(callRows.map((r) => r.caller_staff_id)));
  const { data: staffRows } = callerIds.length
    ? await supabase.from("staff").select("staff_id, full_name").in("staff_id", callerIds)
    : { data: [] as { staff_id: string; full_name: string }[] };
  const nameByStaffId = new Map(
    ((staffRows ?? []) as { staff_id: string; full_name: string }[]).map((s) => [s.staff_id, s.full_name])
  );

  return callRows.map((row) => ({
    id: row.id,
    leadId: row.lead_id,
    callerName: nameByStaffId.get(row.caller_staff_id) ?? row.caller_staff_id,
    status: row.status,
    notes: row.notes,
    calledAt: row.called_at,
  }));
}

export async function getLeadCalls(leadId: string): Promise<LeadCall[]> {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("lead_calls")
    .select("*")
    .eq("lead_id", leadId)
    .order("called_at", { ascending: false });

  if (error) {
    console.error(`getLeadCalls: query failed for ${leadId}`, error);
    return [];
  }

  return toLeadCalls((rows ?? []) as LeadCallRow[]);
}

/** Every call the signed-in caller has ever made, most recent first — RLS
 * scopes this to their own calls regardless of which lead. Used by the
 * Dashboard and Performance pages. */
export async function getMyCalls(): Promise<LeadCall[]> {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("lead_calls")
    .select("*")
    .order("called_at", { ascending: false });

  if (error) {
    console.error("getMyCalls: query failed", error);
    return [];
  }

  return toLeadCalls((rows ?? []) as LeadCallRow[]);
}
