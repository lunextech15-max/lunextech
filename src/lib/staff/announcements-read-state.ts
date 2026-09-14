// Per-viewer "read" tracking for announcements, kept in localStorage since
// it's not shared data and there is no backend to persist it against. Safe
// to call from the server (all reads/writes are guarded) — always returns
// "unread" during SSR, then hydrates from the browser on mount.

const STORAGE_KEY = "lunex-staff-read-announcements";

function readStoredIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function getReadIds(): Set<string> {
  return readStoredIds();
}

export function markAnnouncementRead(id: string): Set<string> {
  const ids = readStoredIds();
  ids.add(id);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Storage unavailable (private browsing, quota) — read state just won't
    // persist across reloads; not worth surfacing an error for.
  }
  return ids;
}
