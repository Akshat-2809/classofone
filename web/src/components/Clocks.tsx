"use client";

import { useSyncExternalStore } from "react";
import styles from "./Timetable.module.css";

const CITIES = [
  ["Jaipur", "Asia/Kolkata"],
  ["Manchester", "Europe/London"],
  ["Dubai", "Asia/Dubai"],
  ["Melbourne", "Australia/Melbourne"],
  ["Patna", "Asia/Kolkata"],
  ["Toronto", "America/Toronto"],
] as const;

// The current minute: re-renders only when the displayed time changes.
const currentMinute = () => Math.floor(Date.now() / 60_000);
const subscribe = (listener: () => void) => {
  const timer = setInterval(listener, 1000);
  return () => clearInterval(timer);
};
const noMinute = () => null;

export function Clocks() {
  // Null while server-rendering: the time is filled in on the visitor's device.
  const minute = useSyncExternalStore(subscribe, currentMinute, noMinute);

  return (
    <div className={styles.cities}>
      {CITIES.map(([name, timeZone]) => {
        const time = minute === null ? "--:--" : new Date(minute * 60_000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
        const hour = parseInt(time.slice(0, 2), 10);
        const after = hour >= 15 && hour < 20;
        const status = minute === null ? " " : after ? "After school now" : hour >= 7 && hour < 15 ? "School hours" : "Asleep, probably";
        return (
          <div key={name} className={`${styles.city} ${after ? styles.after : ""}`}>
            <b>{name}</b>
            <span className={styles.tm}>{time}</span>
            <span className={styles.st}>{status}</span>
          </div>
        );
      })}
    </div>
  );
}
