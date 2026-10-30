"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Timetable.module.css";

const PERIODS = [
  ["9:00", "The problem"],
  ["10:00", "The teacher"],
  ["11:00", "The lesson"],
  ["12:00", "Parents"],
  ["1:00", "Recess"],
  ["2:00", "Anywhere"],
] as const;
const LAST = PERIODS.length - 1;

const isWide = () => window.innerWidth >= 900;
const smoothOrAuto = (): ScrollBehavior => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

/** Pins the timetable on wide screens and turns vertical scroll into a horizontal pan across the periods. */
export function TimetableScroller({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || !isWide()) return;
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / total));
      const max = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
      track.style.transform = `translateX(${Math.round(-progress * max)}px)`;
      setPeriod(Math.round(progress * LAST));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function goPeriod(i: number, behavior = smoothOrAuto()) {
    const section = sectionRef.current;
    if (!section) return;
    if (!isWide()) {
      setPeriod(i);
      section.querySelectorAll("article")[i]?.scrollIntoView({ behavior, block: "start" });
      return;
    }
    const total = Math.max(1, section.offsetHeight - window.innerHeight);
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top + total * (i / LAST) + 2, behavior });
  }

  // Tabbing into a panel that is panned off-screen brings that period into view.
  function onFocus(e: React.FocusEvent<HTMLDivElement>) {
    if (!isWide() || !e.target.matches(":focus-visible")) return;
    const article = e.target.closest("article");
    if (!article || !trackRef.current) return;
    goPeriod([...trackRef.current.children].indexOf(article), "auto");
  }

  return (
    <section className={styles.tt} id="timetable" ref={sectionRef}>
      <div className={styles.ttpin}>
        <div className={`wrap ${styles.tthead}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="lab">Today&apos;s timetable</span>
            <h2>A school day, rebuilt.</h2>
          </div>
          <div className={styles.pers} role="group" aria-label="Periods">
            {PERIODS.map(([t, label], i) => (
              <button
                key={label}
                type="button"
                className={`${styles.per} ${i === period ? styles.on : i < period ? styles.done : ""}`}
                aria-current={i === period ? "step" : undefined}
                onClick={() => goPeriod(i)}
              >
                <span className={styles.t}>{t}</span>
                <b>{label}</b>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.ttwin}>
          <div className={styles.tttrack} ref={trackRef} onFocus={onFocus}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
