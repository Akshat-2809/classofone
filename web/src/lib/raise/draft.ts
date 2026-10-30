"use client";

import { useSyncExternalStore } from "react";

/** The email typed into the footer box, waiting for the "Raise my hand" form. */
let draft = "";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useRaiseDraft() {
  return useSyncExternalStore(subscribe, () => draft, () => "");
}

export function setRaiseDraft(email: string) {
  draft = email;
  listeners.forEach((l) => l());
}
