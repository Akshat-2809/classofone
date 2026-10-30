import Link from "next/link";
import { AudienceText } from "./AudienceText";
import { AudienceSwitch } from "./AudienceSwitch";
import { LogoMark } from "./Logo";
import styles from "./Nav.module.css";

export function Nav({ home = false }: { home?: boolean }) {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.navin}`}>
        <Link className={styles.logo} href="/#top" aria-label="Class of One home">
          <LogoMark />
          <span className={styles.wm}>class of <span>one</span></span>
        </Link>
        <div className={styles.who}>
          {home && (
            <>
              <span className={styles.whol}>I&apos;m a</span>
              <AudienceSwitch />
            </>
          )}
        </div>
        <nav className={styles.links} aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <Link className={`btn btn-ink ${styles.cta}`} href="/#raise" style={{ minHeight: 44 }}>
          <AudienceText field="cta" />
        </Link>
      </div>
    </header>
  );
}
