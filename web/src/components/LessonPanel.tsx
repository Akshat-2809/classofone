"use client";

import { useState } from "react";
import styles from "./Timetable.module.css";

const INTERESTS = [
  { label: "Cricket", color: "#2F6B52", q: "Aarav faced 24 balls and hit 6 of them for four. What fraction of his balls went to the boundary?" },
  { label: "Dinosaurs", color: "#C8483F", q: "A herd of 24 dinosaurs crossed the river. 6 of them were T-Rex. What fraction of the herd were T-Rex?" },
  { label: "Space", color: "#2F5F9E", q: "A rocket carries 24 fuel cells. It used 6 to reach orbit. What fraction of its fuel did it use?" },
  { label: "Cooking", color: "#B7791F", q: "A tray holds 24 cookies. 6 of them have chocolate chips. What fraction of the cookies have chips?" },
];
const CELLS = Array.from({ length: 24 }, (_, i) => i);

export function LessonPanel() {
  const [interest, setInterest] = useState(0);
  const current = INTERESTS[interest];

  return (
    <article className={styles.panel} id="lesson">
      <div className={styles.pt}>
        <span className={styles.ptag}><b>Period 3 · 11:00</b>The lesson</span>
        <h3>The same chapter, rebuilt for one child.</h3>
        <p>Cricket scores for one child, dinosaurs for the next. Rebuilt for how each of them actually learns, with a teacher signing off on every page.</p>
        <div className={styles.chips} role="group" aria-label="What does your child love?">
          {INTERESTS.map((it, i) => (
            <button key={it.label} type="button" className={`${styles.chip} ${i === interest ? styles.on : ""}`} aria-pressed={i === interest} onClick={() => setInterest(i)}>
              {it.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`${styles.ws} paper`} style={{ "--qc": current.color } as React.CSSProperties}>
        <span className={styles.ok}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
          Teacher approved
        </span>
        <span className="lab">Worksheet · Fractions · Class 5</span>
        {/* the key replays the swap animation on each new question */}
        <p key={interest} className={styles.q}>{current.q}</p>
        <div className={styles.grid24} aria-hidden="true">
          {CELLS.map((c) => <i key={c} className={c < 6 ? styles.f : undefined} />)}
        </div>
        <div className={styles.ans}>
          <span className="hand" style={{ fontSize: 26, color: "var(--ink2)" }}>6 out of 24 =</span>
          <span className={styles.frac}>¼</span>
        </div>
        <span className={styles.ill}>Illustration · sample question</span>
      </div>
    </article>
  );
}
