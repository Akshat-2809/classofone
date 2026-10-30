import Image from "next/image";
import founderPhoto from "@/assets/founder/pratik-vimal.jpg";
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
