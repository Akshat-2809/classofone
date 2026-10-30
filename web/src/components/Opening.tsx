import { Doors } from "./Doors";
import styles from "./Opening.module.css";

export function Opening() {
  return (
    <section className={`${styles.open} paper`} id="top">
      <div className="wrap">
        <div className={styles.ogrid}>
          <div>
            <span className="lab">Live 1:1 classes · Nursery to Class 12 · Bengaluru</span>
            <h1 className={styles.h1} style={{ marginTop: 18 }}>
              <span className={styles.w}>Every</span> <span className={styles.w}>child</span> <span className={styles.w}>deserves</span>{" "}
              <span className={styles.w}>a</span> <span className={styles.w}>class</span>{" "}
              <span className={styles.w}>
                of{" "}
                <span className={styles.one}>
                  one.
                  <svg viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M150 8 C 60 6, 10 40, 14 74 C 18 116, 120 136, 200 126 C 280 116, 296 66, 268 36 C 240 8, 170 4, 120 14" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className={`lede ${styles.olede}`}>
              Live one-on-one classes for school children, taught by brilliant teachers and made superhuman by the AI working quietly behind them. It starts with live 1:1 teaching, and grows into an adaptive learning platform on the path to a world-class AI tutor for every child.
            </p>
          </div>
          <div className={styles.mnote} aria-hidden="true">
            <span className="hand">humans first, always.</span>
            <svg viewBox="0 0 110 60">
              <path d="M100 6 C 70 10, 40 26, 20 50" />
              <path d="M20 50 L 32 46 M20 50 L 22 37" />
            </svg>
          </div>
        </div>

        <div className={styles.doorsh}>
          <h2>Who&apos;s reading?</h2>
          <span className="hand" style={{ fontSize: 26, color: "var(--ink2)" }}>pick a notebook, the page will follow</span>
        </div>
        <Doors />
      </div>
    </section>
  );
}
