"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ACCENT, FOUNDER_NAME } from "@/lib/site";
import { AUDIENCE_DATA, CHILD_CLASSES, SUBJECTS, type Audience } from "@/lib/audience";
import { useAudience } from "@/lib/audienceStore";
import { useRaiseDraft } from "@/lib/raise/draft";
import { RAISE_FIELDS, raiseSchema, type RaiseField, type RaiseState } from "@/lib/raise/schema";
import styles from "./RaiseHand.module.css";

const initialState: RaiseState = { status: "idle" };
const DETAIL_ID: Record<Audience, string> = { parent: "r-class", teacher: "r-subj", maker: "r-lesson" };

export function RaiseHand() {
  const { aud } = useAudience();
  const [state, setState] = useState<RaiseState>(initialState);
  const A = AUDIENCE_DATA[aud];
  const draftEmail = useRaiseDraft();
  const nameRef = useRef<HTMLInputElement>(null);

  // Arrived from the footer box with an email: the name is the next thing to fill in.
  useEffect(() => {
    if (draftEmail) nameRef.current?.focus({ preventScroll: true });
  }, [draftEmail]);

  // Signing up as a parent says nothing about teaching: switching audience brings the form back.
  const sent = state.status === "success" && state.audience === aud;
  const err = state.status === "error" ? state : null;
  const fieldError = (f: RaiseField) => err?.fieldErrors[f];
  const describe = (f: RaiseField) => (fieldError(f) ? `r-${f}-err` : undefined);
  const errorOf = (f: RaiseField) => fieldError(f) && <span id={`r-${f}-err`} className={styles.ferr}>{fieldError(f)}</span>;

  // Front end only: validates and shows the result on screen. Nothing is sent or stored.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = e.currentTarget.elements;
    const read = (id: string) => (fields.namedItem(id) as HTMLInputElement | HTMLSelectElement | null)?.value ?? "";
    const parsed = raiseSchema.safeParse({ audience: aud, name: read("r-name"), email: read("r-email"), detail: read(DETAIL_ID[aud]) });
    if (parsed.success) {
      setState({ status: "success", audience: aud });
      return;
    }
    const fieldErrors: Partial<Record<RaiseField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as RaiseField;
      if (RAISE_FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setState({ status: "error", message: "Please check the highlighted fields and try again.", fieldErrors });
  }

  return (
    <section className="sec paper" id="raise">
      <div className={`wrap ${styles.raise}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="lab">Building now · early stage</span>
          <h2 className="h2">{A.raise}</h2>
          {sent ? (
            <div className={styles.form} style={{ gap: 10 }} role="status">
              <span className="lab">Hand raised</span>
              <h3 style={{ fontSize: 34 }}>Thank you. {FOUNDER_NAME.split(" ")[0]} will reach out personally.</h3>
              <p style={{ color: "var(--ink2)" }}>You&apos;re on the list as a {A.word}.</p>
            </div>
          ) : (
            // Fields have no name, so submitting before the page hydrates can't put them in the URL.
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <p className="sr-only" aria-live="polite" role="status">
                {err ? err.message : ""}
              </p>
              <div className={styles.field}>
                <label htmlFor="r-name">Your name</label>
                <input ref={nameRef} id="r-name" type="text" autoComplete="name" placeholder="Write your name" required maxLength={120}
                  aria-invalid={!!fieldError("name")} aria-describedby={describe("name")} />
                {errorOf("name")}
              </div>
              <div className={styles.field}>
                <label htmlFor="r-email">Email</label>
                <input key={draftEmail} id="r-email" type="email" autoComplete="email" placeholder="you@email.com" required maxLength={254}
                  defaultValue={draftEmail} aria-invalid={!!fieldError("email")} aria-describedby={describe("email")} />
                {errorOf("email")}
              </div>
              {aud === "parent" && (
                <div className={styles.field}>
                  <label htmlFor="r-class">Your child&apos;s class</label>
                  <select id="r-class" aria-invalid={!!fieldError("detail")} aria-describedby={describe("detail")}>
                    {CHILD_CLASSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errorOf("detail")}
                </div>
              )}
              {aud === "teacher" && (
                <div className={styles.field}>
                  <label htmlFor="r-subj">Subject you teach</label>
                  <select id="r-subj" aria-invalid={!!fieldError("detail")} aria-describedby={describe("detail")}>
                    {SUBJECTS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {errorOf("detail")}
                </div>
              )}
              {aud === "maker" && (
                <div className={styles.field}>
                  <label htmlFor="r-lesson">Link to one lesson you&apos;re proud of</label>
                  <input id="r-lesson" type="url" placeholder="https://" required maxLength={2000}
                    aria-invalid={!!fieldError("detail")} aria-describedby={describe("detail")} />
                  {errorOf("detail")}
                </div>
              )}
              <button type="submit" className="btn btn-ink" style={{ alignSelf: "flex-start" }}>
                Raise my hand
              </button>
            </form>
          )}
        </div>
        <div className={`${styles.handwrap} ${sent ? styles.up : ""}`} aria-hidden="true">
          <svg className={styles.bighand} width="220" height="280" viewBox="0 0 220 280">
            <path d="M70 270 C 60 220, 40 190, 30 150 C 22 120, 40 110, 54 128 L 70 150 L 70 50 C 70 32, 96 32, 96 50 L 96 120 L 96 34 C 96 14, 124 14, 124 34 L 124 120 L 124 44 C 124 26, 150 26, 150 44 L 150 126 L 150 70 C 150 52, 176 52, 176 70 L 176 170 C 176 220, 160 250, 150 270 Z" fill={ACCENT} stroke="#17223A" strokeWidth="5" strokeLinejoin="round" />
            <path d="M96 120 L 96 130 M124 120 L 124 132 M150 126 L 150 136" stroke="#17223A" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 270 L 162 270" stroke="#17223A" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <svg className={styles.star} width="86" height="86" viewBox="0 0 24 24">
            <path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#E35D52" stroke="#17223A" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <span className={styles.hint}>{sent ? "gold star!" : A.hint}</span>
        </div>
      </div>
    </section>
  );
}
