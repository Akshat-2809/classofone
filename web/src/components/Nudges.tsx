"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Timetable.module.css";

const NUDGES = [
  "Aarav got 3 of 5 fraction questions wrong last week. Start there.",
  "Aarav has been quiet for 40 seconds.",
  "He answers faster when the example is about cricket.",
  "Minute 12 worked: he explained it back in his own words.",
  "Good moment to ask him to try the next one alone.",
];

export function Nudges() {
  const [tick, setTick] = useState(2);
  const ref = useRef<HTMLDivElement>(null);

  // Rotates only while on screen, and not at all with reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      timer = entry.isIntersecting ? setInterval(() => setTick((t) => t + 1), 2600) : undefined;
    });
    io.observe(el);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const visible = [tick - 2, tick - 1, tick];
  const quiet = tick % NUDGES.length === 1;

  return (
    <div className={styles.cls} ref={ref}>
      <div className={styles.tiles} aria-hidden="true">
        <div className={styles.tile}>
          <span className={styles.av} style={{ background: "#F5C9B8" }}>MS</span>
          <span className={styles.nm}>Ms. Shah · teacher</span>
          <span className={styles.live}>LIVE</span>
        </div>
        <div className={`${styles.tile} ${quiet ? styles.quiet : ""}`}>
          <span className={styles.av} style={{ background: "#BFD8F2" }}>A</span>
          <span className={styles.nm}>Aarav · Class 5</span>
        </div>
      </div>
      <div className={styles.nudges}>
        {visible.map((n) => (
          <div key={n} className={`${styles.nudge} ${n === tick ? "" : styles.old}`}>
            <span className={styles.ic}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#17223A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" /></svg>
            </span>
            <span>{NUDGES[n % NUDGES.length]}</span>
          </div>
        ))}
      </div>
      <span className={styles.ill} style={{ color: "#AEB9CC" }}>Illustration · what the teacher sees</span>
    </div>
  );
}
