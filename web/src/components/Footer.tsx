import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { AudienceText } from "./AudienceText";
import { FooterWaitlist } from "./FooterWaitlist";
import { LogoMark } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.fgrid}`}>
        <div className={styles.brand}>
          <Link className={styles.logo} href="/#top" aria-label="Class of One home">
            <LogoMark size={34} />
            <span className={styles.wm}>class of <span>one</span></span>
          </Link>
          <p className={styles.motto}>Humans first, always.</p>
          <p className={styles.about}>Live one-on-one classes for school children.</p>
          <p className={styles.info}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21.5s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Bengaluru, India
          </p>
        </div>

        <nav aria-labelledby="f-explore">
          <h2 className={styles.head} id="f-explore">Explore</h2>
          <ul className={styles.list}>
            <li><Link href="/#top">Home</Link></li>
            <li><Link href="/#timetable">A school day, rebuilt</Link></li>
            <li><Link href="/#for-you"><AudienceText field="lab" /></Link></li>
            <li><Link href="/#report">The founder&apos;s report card</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="f-policies">
          <h2 className={styles.head} id="f-policies">Policies</h2>
          <ul className={styles.list}>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </nav>

        <div className={styles.raise}>
          <h2 className={styles.head}>Raise your hand</h2>
          <p className={styles.about}>Join the waitlist. Pratik will reach out personally.</p>
          <FooterWaitlist />
          <a className={styles.info} href={`mailto:${CONTACT_EMAIL}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className={styles.tray} aria-hidden="true">
        <i style={{ left: "12%", width: 70, background: "#FFFFFF" }} />
        <i style={{ left: "16%", width: 44, background: "#FFC93F" }} />
        <i style={{ left: "64%", width: 90, background: "#E7EFF8" }} />
        <i style={{ left: "80%", width: 52, background: "#F6B7A9" }} />
      </div>
      <div className={styles.legal}>
        <span>© 2026 Class of One</span>
        <Link href="/#top">Back to the top ↑</Link>
      </div>
    </footer>
  );
}
