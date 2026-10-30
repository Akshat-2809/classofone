"use client";

import Link from "next/link";
import { AUDIENCE_DATA, SUBJECTS } from "@/lib/audience";
import { useAudience } from "@/lib/audienceStore";
import { PARENT_SURVEY_URL } from "@/lib/site";
import styles from "./ForYou.module.css";

export function ForYou() {
  const { aud, flip } = useAudience();
  const A = AUDIENCE_DATA[aud];

  return (
    <section className="sec paper" id="for-you">
      <div className="wrap">
        {/* the key replays the swap animation on each pick */}
        <div className={styles.fy} key={flip}>
          <div className={styles.fyswap} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="lab">{A.lab}</span>
            <h2 className="h2">{A.head}</h2>
            <p className="lede">{A.lede}</p>
            {aud === "parent" && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btn-ink" href={PARENT_SURVEY_URL}>Take the 5-minute parent survey</a>
                <Link className="btn btn-line" href="/#raise">Join the waitlist</Link>
              </div>
            )}
            {aud === "teacher" && (
              <>
                <div className={styles.subj}>{SUBJECTS.map((s) => <span key={s}>{s}</span>)}</div>
                <span className="lab">IB · ICSE · CBSE</span>
              </>
            )}
            {aud === "maker" && (
              <div className={styles.stip}>
                <b>₹20,000</b>
                <span>a month stipend · Curriculum Fellowship · 2 spots · work directly with founders · top fellows convert to full-time roles</span>
              </div>
            )}
          </div>
          <ul className={`${styles.list} ${styles.fyswap}`}>
            {A.items.map((t, i) => (
              <li key={t}><span className={styles.n}>{i + 1}</span><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
