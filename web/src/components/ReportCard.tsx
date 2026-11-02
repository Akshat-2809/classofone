import Image from "next/image";
import founderPhoto from "@/assets/founder/pratik-vimal.jpg";
import { FOUNDER_LINKEDIN } from "@/lib/site";
import { ScrollTrigger } from "./ScrollTrigger";
import styles from "./ReportCard.module.css";

const ROWS = [
  ["Product leadership", "Licious · WhiteHat Jr", "SVP & Head of Products at Licious (2025–26). VP, then SVP & Head of Products at WhiteHat Jr (2019–23). Years inside edtech."],
  ["Product management", "Amazon", "2018–2019, Bengaluru."],
  ["Growth & marketing", "Tapzo", "Vice President, Product Marketing & Business, 2014–2018."],
  ["Strategy", "PwC", "Distribution, marketing, expansion and pricing strategy for Fortune 500 companies, 2011–2014."],
  ["Building in public", "WealthLens · FundLens", "Free, data-first money research tools. FundLens (mutual-funds.ai) is live, built solo on nights and weekends."],
  ["Parenting", "Home", "A career break for full-time parenting, 2023–24. \"Chief Diaper Officer and Sleep Negotiation Specialist.\""],
];

export function ReportCard() {
  return (
    <section className={`sec ${styles.report}`} id="report">
      <div className="wrap">
        <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          <span className="lab">The founder</span>
          <h2 className="h2">Pratik Vimal&apos;s report card.</h2>
        </div>
        <ScrollTrigger className={styles.rc} activeClassName={styles.go} at={0.8}>
          <div className={styles.rchead}>
            <div className={styles.who}>
              <Image className={styles.photo} src={founderPhoto} alt="Pratik Vimal" width={104} height={104} sizes="104px" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="lab">Progress report</span>
                <h3>Pratik Vimal</h3>
                <a className={styles.linkedin} href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Pratik Vimal on LinkedIn (opens in a new tab)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <span className="lab">IIT Kanpur · Bengaluru · Founder &amp; Product Builder</span>
          </div>
          <div className={styles.rctbl}>
            <div className={`${styles.rrow} ${styles.h}`}><div>Subject</div><div>Where</div><div>Remarks</div></div>
            {ROWS.map(([subject, where, remarks]) => (
              <div className={styles.rrow} key={subject}>
                <div className={styles.s}>{subject}</div>
                <div className={styles.w}>{where}</div>
                <div className={styles.r}>{remarks}</div>
              </div>
            ))}
          </div>
          <div className={styles.remark}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="lab">His view, in his words</span>
              <p className="hand">“AI will not replace the teacher. A seven year old learns from a person.”</p>
            </div>
            <div className={styles.sign} aria-hidden="true">
              <svg width="150" height="56" viewBox="0 0 150 56"><path d="M6 40 C 20 10, 30 10, 32 36 C 34 48, 44 18, 54 30 C 62 40, 70 20, 80 30 C 92 42, 104 14, 118 26 C 128 34, 136 30, 144 22" /></svg>
              <span className="lab">Founder</span>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
