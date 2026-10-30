"use client";

import { AUDIENCE_DATA } from "@/lib/audience";
import { useAudience } from "@/lib/audienceStore";

/** A piece of copy that follows "I'm a…", for use inside otherwise static sections. */
export function AudienceText({ field }: { field: "cta" | "lab" }) {
  const { aud } = useAudience();
  return <>{AUDIENCE_DATA[aud][field]}</>;
}
