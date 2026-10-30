"use client";

import { AUDIENCES, DOORS } from "@/lib/audience";
import { pickAudience, useAudience } from "@/lib/audienceStore";
import styles from "./Opening.module.css";

export function Doors() {
  const { aud, touched } = useAudience();

  return (
    <>
      <div className={styles.doors}>
        {AUDIENCES.map((id) => {
          const door = DOORS[id];
          const on = touched && id === aud;
          return (
            <button key={id} type="button" className={`${styles.door} ${on ? styles.on : ""}`} aria-pressed={on} onClick={() => pickAudience(id)}>
              <span className={styles.cover} style={{ background: door.color }}>
                <span className={styles.label}>
                  <span className="lab">Name</span>
                  <b>{door.title}</b>
                  <span className={styles.ln}>{door.scrawl}</span>
                </span>
                <span className={styles.sub}>{door.sub}</span>
              </span>
              <span className={styles.tick} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#17223A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
              </span>
            </button>
          );
        })}
      </div>
      <p className={styles.picked} aria-live="polite">
        {touched ? `Got it. This page now speaks to ${aud === "maker" ? "curriculum makers" : `${aud}s`}.` : ""}
      </p>
    </>
  );
}
