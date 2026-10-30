"use client";

import { useEffect, useRef } from "react";
import { AUDIENCE_DATA, AUDIENCES } from "@/lib/audience";
import { pickAudience, useAudience } from "@/lib/audienceStore";
import styles from "./Nav.module.css";

export function AudienceSwitch() {
  const { aud } = useAudience();
  const segRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // The pill slides under the active button; its size comes from the button's rendered text.
  useEffect(() => {
    const seg = segRef.current;
    const pill = pillRef.current;
    if (!seg || !pill) return;
    const place = () => {
      const on = seg.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!on) return;
      pill.style.left = `${on.offsetLeft}px`;
      pill.style.width = `${on.offsetWidth}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(seg);
    return () => ro.disconnect();
  }, [aud]);

  return (
    <div className={styles.seg} role="group" aria-label="Who are you?" ref={segRef}>
      <span className={styles.pill} ref={pillRef} aria-hidden="true" />
      {AUDIENCES.map((id) => (
        <button key={id} type="button" className={id === aud ? styles.on : undefined} aria-pressed={id === aud} onClick={() => pickAudience(id)}>
          {AUDIENCE_DATA[id].short}
        </button>
      ))}
    </div>
  );
}
