"use client";

import { useState } from "react";
import styles from "./Timetable.module.css";

const HEIGHTS = [30, 42, 48, 55, 50, 46, 62, 70, 66, 74, 80, 92, 88, 76, 60, 40, 34, 38, 52, 64, 72, 70, 68, 58, 44, 36, 30, 46, 60, 72, 84, 90, 86, 78, 66, 58, 52, 60, 70, 64];
const NOTES: Record<number, string> = {
  0: "Hello and warm-up. Talked about yesterday’s cricket match.",
  4: "Recap of last week’s fraction mistakes.",
  11: "He explained the idea back in his own words. This minute worked.",
  15: "Went quiet. The teacher switched to a cricket example.",
  19: "Back on track: solved two questions alone.",
  30: "Hardest question of the day, and he got it.",
  39: "Wrap-up and one question to try at home.",
};

function noteFor(minute: number) {
  const h = HEIGHTS[minute];
  return NOTES[minute] ?? (h >= 70 ? "Fully engaged. Answering on his own." : h >= 45 ? "Working through a question with the teacher." : "A slower minute. The teacher stepped in.");
}

export function MinutesChart() {
  const [minute, setMinute] = useState(11);

  // Mouse: hovering a bar selects it, as in the design.
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setMinute(Math.max(0, Math.min(HEIGHTS.length - 1, Math.floor(((e.clientX - r.left) / r.width) * HEIGHTS.length))));
  }

  return (
    <div className={styles.pw}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <span className="lab">Aarav · Fractions · 40 min</span>
        <span className={styles.ill}>Sample class</span>
      </div>
      <div className={styles.bars} onPointerMove={onPointerMove}>
        {HEIGHTS.map((h, i) => (
          <i key={i} className={`${styles.bar} ${NOTES[i] ? styles.k : ""} ${i === minute ? styles.on : ""}`} style={{ height: `${h}%` }} />
        ))}
        {/* one real slider over the chart: tap or drag on touch, arrow keys on a keyboard */}
        <input
          type="range"
          className={styles.barsInput}
          min={1}
          max={HEIGHTS.length}
          value={minute + 1}
          aria-label="Minute of the class"
          onChange={(e) => setMinute(Number(e.target.value) - 1)}
        />
      </div>
      <div className={styles.mins}><span>0</span><span>10</span><span>20</span><span>30</span><span>40 min</span></div>
      <div className={styles.note} aria-live="polite">
        <b>Min {minute + 1}</b>
        <span>{noteFor(minute)}</span>
      </div>
    </div>
  );
}
