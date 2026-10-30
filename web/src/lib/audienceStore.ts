"use client";

import { useSyncExternalStore } from "react";
import type { Audience } from "./audience";

type State = {
  aud: Audience;
  /** False until the visitor picks: no notebook is ticked on first load. */
  touched: boolean;
  /** Bumped on each pick, so the "for you" section replays its swap animation. */
  flip: number;
};

const initial: State = { aud: "parent", touched: false, flip: 0 };

let state = initial;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAudience() {
  return useSyncExternalStore(subscribe, () => state, () => initial);
}

export function pickAudience(aud: Audience) {
  state = { aud, touched: true, flip: state.flip + 1 };
  listeners.forEach((l) => l());
}
