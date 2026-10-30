import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Class of One",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={`${styles.page} paper`}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.logo} href="/" aria-label="Class of One home">
          <LogoMark />
          <span>class of <span>one</span></span>
        </Link>
        <span className="lab">Error 404</span>
        <h1 className={styles.big}>404</h1>
        <span className={`hand ${styles.note}`}>this page is absent today.</span>
        <Link className="btn btn-ink" href="/">Back to home</Link>
      </div>
    </main>
  );
}
