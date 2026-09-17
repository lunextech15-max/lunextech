import type { Lead, LeadCall } from "./types";

function isToday(iso: string): boolean {
  const date = new Date(iso);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function daysAgo(iso: string, days: number): boolean {
  const date = new Date(iso);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff;
}

export function getDashboardStats(leads: Lead[], calls: LeadCall[]) {
  const callsToday = calls.filter((c) => isToday(c.calledAt));
  const connectedToday = callsToday.filter((c) => c.status !== "no-answer" && c.status !== "not-called");
  const interestedLeads = leads.filter((l) => l.status === "interested");
  const convertedLeads = leads.filter((l) => l.status === "converted");
  const today = new Date().toISOString().slice(0, 10);
  const followUpsDue = leads.filter((l) => l.followUpDate && l.followUpDate <= today && l.status !== "converted");

  return {
    callsToday: callsToday.length,
    callsCompleted: callsToday.length,
    connectedCalls: connectedToday.length,
    followUpsDue: followUpsDue.length,
    interestedLeads: interestedLeads.length,
    convertedLeads: convertedLeads.length,
  };
}

export function getPerformanceStats(calls: LeadCall[], leads: Lead[]) {
  const last7Days = calls.filter((c) => daysAgo(c.calledAt, 7));
  const last30Days = calls.filter((c) => daysAgo(c.calledAt, 30));
  const connected7 = last7Days.filter((c) => c.status !== "no-answer" && c.status !== "not-called");
  const connectionRate7 = last7Days.length > 0 ? Math.round((connected7.length / last7Days.length) * 100) : 0;

  const interested = leads.filter((l) => l.status === "interested").length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const followUps = leads.filter((l) => l.status === "follow-up").length;

  // Calls per day over the last 7 days, oldest first — for a simple bar
  // chart. Real dates, real counts; days with zero calls show zero.
  const dailyActivity = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    const key = day.toISOString().slice(0, 10);
    const count = calls.filter((c) => c.calledAt.slice(0, 10) === key).length;
    return { date: key, count };
  });

  return {
    callsLast7Days: last7Days.length,
    callsLast30Days: last30Days.length,
    connectionRate: connectionRate7,
    interestedLeads: interested,
    followUps,
    conversions: converted,
    dailyActivity,
  };
}
