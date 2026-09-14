"use client";

import { useEffect } from "react";
import { markAnnouncementRead } from "@/lib/staff/announcements-read-state";

// Renders nothing — just marks this announcement read in localStorage the
// moment its detail page is viewed. There is no backend, so this is
// per-browser only, not a permanently synced read receipt.
export default function MarkAnnouncementRead({ id }: { id: string }) {
  useEffect(() => {
    markAnnouncementRead(id);
  }, [id]);

  return null;
}
