import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import s from "@/components/Contact.module.css";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Class of One",
  description: "Questions, ideas or feedback about Class of One? Write to us and we'll reply by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className={`${s.page} paper`}>
        <div className={`wrap ${s.grid}`}>
          <div className={s.copy}>
            <span className="lab">Contact</span>
            <h1 className={s.h1}>Say <span className="hl">hello.</span></h1>
            <p className="lede">Questions, ideas or feedback about Class of One? Write to us and we&apos;ll reply by email.</p>

            <div className={s.cards}>
              <a className={s.card} style={{ background: "var(--blue)" }} href={`mailto:${CONTACT_EMAIL}`}>
                <span className={s.label}><span className="lab">Email</span><b>{CONTACT_EMAIL}</b></span>
              </a>
              <div className={s.card} style={{ background: "var(--red)" }}>
                <span className={s.label}><span className="lab">Based in</span><b>Bengaluru, India</b></span>
              </div>
              <Link className={s.card} style={{ background: "var(--green)" }} href="/#raise">
                <span className={s.label}><span className="lab">Early access</span><b>Raise your hand&nbsp;→</b></span>
              </Link>
            </div>
          </div>

          <div className={s.formCard}>
            <h2 className={s.formTitle}>Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
