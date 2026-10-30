import { Clocks } from "./Clocks";
import { LessonPanel } from "./LessonPanel";
import { MinutesChart } from "./MinutesChart";
import { Nudges } from "./Nudges";
import { TimetableScroller } from "./TimetableScroller";
import styles from "./Timetable.module.css";

const DESKS = Array.from({ length: 30 }, (_, i) => i);

export function Timetable() {
  return (
    <TimetableScroller>
      {/* P1 */}
      <article className={styles.panel}>
        <div className={styles.pt}>
          <span className={styles.ptag}><b>Period 1 · 9:00</b>The problem</span>
          <h3>One lecture. Thirty children.</h3>
          <p>Most children sit through lessons nobody would choose to attend. We think that&apos;s a design failure, not a fact of life.</p>
          <span className="hand" style={{ fontSize: 26 }}>we want lessons a child would pick on a free evening</span>
        </div>
        <div className={styles.desks} aria-hidden="true">
          <span className={styles.board}>today: fractions</span>
          {DESKS.map((d) => (
            <span key={d} className={`${styles.desk} ${d === 14 ? styles.me : ""}`}><i /></span>
          ))}
        </div>
      </article>

      {/* P2 */}
      <article className={styles.panel}>
        <div className={styles.pt}>
          <span className={styles.ptag}><b>Period 2 · 10:00</b>The teacher</span>
          <h3>Same human. <span className="hl">Superhuman.</span></h3>
          <p>A teacher who walks into class already knowing what the child got wrong last week. Who gets a quiet nudge the moment the child goes silent. Who sees afterwards exactly which minute worked.</p>
        </div>
        <Nudges />
      </article>

      {/* P3 */}
      <LessonPanel />

      {/* P4 */}
      <article className={styles.panel}>
        <div className={styles.pt}>
          <span className={styles.ptag}><b>Period 4 · 12:00</b>Parents</span>
          <h3>A window into every class.</h3>
          <p>A parent who can see inside every class knows whether it&apos;s working. Nobody has to call her to tell her.</p>
          <span className="hand" style={{ fontSize: 24 }}>tap a minute</span>
        </div>
        <MinutesChart />
      </article>

      {/* RECESS */}
      <article className={`${styles.panel} ${styles.recess}`}>
        <div className={styles.pt}>
          <span className={styles.ptag}><b style={{ background: "#FFFFFF" }}>Recess · 1:00</b>The research</span>
          <h3>Why the human stays at the front.</h3>
          <p>Keep the human at the front, and let AI rebuild everything behind them.</p>
        </div>
        <div className={styles.stickies}>
          <div className={styles.sticky}>
            <span className="lab">Patricia Kuhl, 2003</span>
            <span className={styles.big}>The social gate</span>
            <p>Nine-month-old babies learned Mandarin sounds from a live speaker. The same sessions on video taught them nothing. The person was the difference.</p>
          </div>
          <div className={styles.sticky}>
            <span className="lab">Benjamin Bloom</span>
            <span className={styles.big}>2 sigma</span>
            <p>Students taught one-to-one by a human tutor did far better than students taught in a regular class.</p>
          </div>
        </div>
      </article>

      {/* P5 */}
      <article className={styles.panel}>
        <div className={styles.pt}>
          <span className={styles.ptag}><b>Period 5 · 2:00</b>Anywhere</span>
          <h3>For a child in Patna, or Toronto.</h3>
          <p>The best teacher and a curriculum made for one, available to a child in Jaipur or Manchester, Dubai or Melbourne, Patna or Toronto.</p>
        </div>
        <Clocks />
      </article>
    </TimetableScroller>
  );
}
