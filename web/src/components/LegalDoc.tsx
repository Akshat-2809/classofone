import type { ReactNode } from "react";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import s from "./LegalDoc.module.css";

export type LegalSection = { id: string; title: string; body: ReactNode };
export type LegalSummaryRow = { subject: string; answer: ReactNode };

type Props = {
  title: string;
  /** The handwritten line beside the title. */
  note: string;
  intro: ReactNode;
  summary: LegalSummaryRow[];
  sections: LegalSection[];
};

/**
 * A legal page as a school document: a report card with the short version on top,
 * then the full text on one ruled notebook sheet. Server-rendered, no client JS of its own.
 */
export function LegalDoc({ title, note, intro, summary, sections }: Props) {
  return (
    <>
      <Nav />
      <main className={`${s.page} paper`}>
        <div className="wrap">
          <header className={s.head}>
            <span className="lab">School rules · Last updated {LEGAL_LAST_UPDATED}</span>
            <h1 className={s.title}>{title}</h1>
            <span className={`hand ${s.note}`}>{note}</span>
            <p className="lede">{intro}</p>
          </header>

          <section className={s.card} aria-labelledby="short-version">
            <div className={s.cardHead}>
              <h2 id="short-version">The short version</h2>
              <span className="lab">The full text below is what counts</span>
            </div>
            <dl className={s.rows}>
              {summary.map((row) => (
                <div className={s.row} key={row.subject}>
                  <dt>{row.subject}</dt>
                  <dd>{row.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className={s.layout}>
            <nav className={s.toc} aria-label="Contents">
              <details open className={s.tocBox}>
                <summary>Today&apos;s contents</summary>
                <ol>
                  {sections.map((sec, i) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`}>
                        <span className={s.tocNum}>{i + 1}</span>
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>

            <article className={s.sheet}>
              {sections.map((sec, i) => (
                <section key={sec.id} id={sec.id} className={s.section} aria-labelledby={`${sec.id}-h`}>
                  <span className={s.num} aria-hidden="true">{i + 1}</span>
                  <h2 id={`${sec.id}-h`}>{sec.title}</h2>
                  {sec.body}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
