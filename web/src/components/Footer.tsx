import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { AudienceText } from "./AudienceText";
import { LogoMark } from "./Logo";
import { ScrollTrigger } from "./ScrollTrigger";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <ScrollTrigger as="footer" className={styles.foot} activeClassName={styles.ring} at={0.75} id="bell">
      <div className={`wrap ${styles.fgrid}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="lab" style={{ color: "#B9CDC1" }}>3:30 pm · last bell</span>
          <p className={styles.chalkh}>
            <span>School&apos;s out.</span>
            <svg className={styles.bell} width="70" height="78" viewBox="0 0 70 78" aria-hidden="true">
              <path d="M35 6 C 20 6, 14 20, 14 34 L 14 50 L 6 60 L 64 60 L 56 50 L 56 34 C 56 20, 50 6, 35 6 Z" fill="var(--hi)" stroke="#EAF2EC" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="35" cy="68" r="7" fill="#EAF2EC" />
              <circle cx="35" cy="5" r="4" fill="#EAF2EC" />
            </svg>
          </p>
          <p style={{ color: "#CFE0D5", maxWidth: "42ch", fontSize: 18 }}>Live one-on-one classes for school children. Humans first, always.</p>
          <Link className={styles.logo} href="/#top" aria-label="Back to top">
            <LogoMark size={34} />
            <span className={styles.wm}>class of <span>one</span></span>
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="hand" style={{ color: "#FFFFFF", fontSize: 32 }}>Tomorrow&apos;s timetable</span>
          <ul className={styles.tom}>
            <li><Link href="/#top"><span className={styles.t}>9:00</span><span>Who&apos;s reading?</span><span aria-hidden="true">→</span></Link></li>
            <li><Link href="/#timetable"><span className={styles.t}>10:00</span><span>A school day, rebuilt</span><span aria-hidden="true">→</span></Link></li>
            <li><Link href="/#for-you"><span className={styles.t}>11:00</span><span><AudienceText field="lab" /></span><span aria-hidden="true">→</span></Link></li>
            <li><Link href="/#report"><span className={styles.t}>12:00</span><span>The founder&apos;s report card</span><span aria-hidden="true">→</span></Link></li>
            <li><Link href="/#raise"><span className={styles.t}>1:00</span><span>Raise your hand</span><span aria-hidden="true">→</span></Link></li>
          </ul>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#CFE0D5" }}>
            <a className={styles.mail} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · Bengaluru
          </span>
        </div>
      </div>
      <div className={styles.tray} aria-hidden="true">
        <i style={{ left: "12%", width: 70, background: "#FFFFFF" }} />
        <i style={{ left: "16%", width: 44, background: "#FFC93F" }} />
        <i style={{ left: "64%", width: 90, background: "#E7EFF8" }} />
        <i style={{ left: "80%", width: 52, background: "#F6B7A9" }} />
      </div>
      <div className={styles.legal}>
        <span>© 2026 Class of One · Bengaluru</span>
        <span>
          <Link href="/contact">Contact</Link> · <Link href="/#top">Back to the top ↑</Link>
        </span>
      </div>
    </ScrollTrigger>
  );
}
