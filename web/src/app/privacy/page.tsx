import type { Metadata } from "next";
import { LegalDoc, type LegalSection, type LegalSummaryRow } from "@/components/LegalDoc";
import s from "@/components/LegalDoc.module.css";
import { LEGAL_LOCATION } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy — Class of One",
  description:
    "What happens to what you type into Class of One's forms, what we do with emails you send us, and the rights you have under Indian law.",
  alternates: { canonical: "/privacy" },
};

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

const SUMMARY: LegalSummaryRow[] = [
  { subject: "The forms", answer: "They check what you typed and show a message on your screen. What you type isn’t sent to us or stored." },
  { subject: "To reach us", answer: <>Email {mail}. It’s the only way a message gets to us.</> },
  { subject: "About your child", answer: "The form asks only for a class band, and that stays on your screen too. If you email us, please leave out your child’s name and other details." },
  { subject: "What we never do", answer: "Sell your data, use it for advertising, or follow you around the web." },
  { subject: "Changing your mind", answer: <>Write to {mail} and we’ll delete the emails you sent us.</> },
];

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Class of One is based in {LEGAL_LOCATION}. We are building live one-on-one online classes for school children,
          Nursery to Class 12, and we are at an early stage.
        </p>
        <p>
          This policy covers this website: visiting it, using its forms, and emailing us. When it comes to the data
          described here, we decide why and how it is used, so under Indian law we are the <b>Data Fiduciary</b> and you are
          the <b>Data Principal</b>. We follow the Information Technology Act, 2000 and the SPDI Rules, 2011, and we are
          aligning with the Digital Personal Data Protection Act, 2023 and its Rules of 2025 (the &ldquo;DPDP law&rdquo;) as
          they come into force.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children come first, so this comes second",
    body: (
      <>
        <p>
          Class of One is being built for children, but this website is for adults. The forms are meant for people aged 18 or
          over, and we don&apos;t knowingly collect personal data from children.
        </p>
        <ul>
          <li>The parents&apos; form asks only for a class band, and that isn&apos;t sent to us either. If you email us, please don&apos;t include your child&apos;s name or other details.</li>
          <li>Aarav, the child in our examples, is an illustration, not a real pupil.</li>
          <li>If you think a child has sent us personal data, tell us and we&apos;ll delete it.</li>
        </ul>
        <p>
          Before any child joins a class, we will publish a separate policy for classes. It will cover children&apos;s data,
          including the verifiable parental consent the DPDP law requires.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>When you fill in a form</h3>
        <p>
          Nothing. The &ldquo;Raise my hand&rdquo;, contact and footer email forms don&apos;t send or store what you type. Your
          browser checks it and shows a message on your screen. It doesn&apos;t reach us, so we won&apos;t know you filled in a
          form and we can&apos;t reply to it. To reach us, email {mail}.
        </p>
        <h3>When you email us</h3>
        <p>Your email address, your name if you include it, your message, and anything else you choose to send.</p>
        <h3>When you visit</h3>
        <p>
          Our hosting provider keeps standard request logs (IP address, time, page, browser) for security and reliability. We
          use no advertising or analytics cookies, and our fonts are served from our own domain. What you pick under
          &ldquo;I&apos;m a&rdquo; stays in your browser.
        </p>
        <h3>Please leave out of your emails</h3>
        <p>Passwords, bank or card details, health information and the like. We don&apos;t need them and don&apos;t want them.</p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    body: (
      <>
        <ul>
          <li><b>To read and reply to your emails,</b> including about Class of One. Basis: your consent, and data you gave us for that purpose.</li>
          <li><b>To keep the website safe</b> from abuse, using the hosting logs. Basis: the reasonable security practices the law requires.</li>
          <li><b>To meet legal duties</b> and answer lawful requests.</li>
        </ul>
        <p>We make no automated decisions about you that have legal or similarly significant effects. A person reads every email.</p>
      </>
    ),
  },
  {
    id: "who-can-see-it",
    title: "Who can see it",
    body: (
      <>
        <p>Our team, and only where needed:</p>
        <ul>
          <li><b>Vercel Inc.,</b> which hosts the website and keeps its request logs.</li>
          <li><b>Our mailbox provider,</b> which holds the emails you send us.</li>
          <li><b>Professional advisers,</b> such as lawyers and auditors, under a duty of confidentiality.</li>
          <li><b>Authorities and courts,</b> where the law requires it or to protect our legal rights.</li>
          <li><b>A buyer or successor,</b> if we are part of a merger or sale, with this policy still protecting your data.</li>
        </ul>
        <p>
          The first two may store or process data outside India. The DPDP law allows that except to countries the Central
          Government restricts, and we won&apos;t transfer data to a restricted country.
        </p>
      </>
    ),
  },
  {
    id: "how-long",
    title: "How long we keep it",
    body: (
      <>
        <ul>
          <li><b>What you type into a form:</b> not kept, because it&apos;s never sent to us.</li>
          <li><b>Emails:</b> up to 24 months after our last exchange.</li>
          <li><b>Hosting logs:</b> a short period, typically no more than 30 days.</li>
        </ul>
        <p>If you withdraw consent or ask us to erase your data, we will, unless the law requires us to keep it.</p>
      </>
    ),
  },
  {
    id: "how-we-protect-it",
    title: "How we look after it",
    body: (
      <>
        <p>We keep reasonable security practices, as section 43A of the IT Act and the SPDI Rules require:</p>
        <ul>
          <li>the website is served over an encrypted connection; and</li>
          <li>only the people who need access to our mailbox have it.</li>
        </ul>
        <p>
          Nothing online is perfectly secure. If a personal data breach happens, we will tell the people affected and the Data
          Protection Board of India as the DPDP law requires, and report cyber security incidents to CERT-In within the time its
          directions set.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Subject to the law, you can:</p>
        <ul>
          <li>ask what data we hold about you, how we use it and who we&apos;ve shared it with;</li>
          <li>ask us to correct or update it;</li>
          <li>ask us to erase it;</li>
          <li>withdraw your consent at any time, as easily as you gave it, which doesn&apos;t affect what already happened;</li>
          <li>nominate someone to use these rights for you if you die or can&apos;t act yourself; and</li>
          <li>complain to us, and then to the Data Protection Board of India if you aren&apos;t satisfied.</li>
        </ul>
        <p>
          Email {mail} with the subject &ldquo;Privacy request&rdquo;. We
          may ask you to confirm who you are, and we&apos;ll respond within 30 days. The DPDP law also expects you not to
          impersonate anyone or file false complaints.
        </p>
      </>
    ),
  },
  {
    id: "grievance-officer",
    title: "Something wrong? Our Grievance Officer",
    body: (
      <>
        <p>Under Rule 5(9) of the SPDI Rules and the DPDP law, complaints about your data go to our Grievance Officer:</p>
        <div className={s.stuck}>
          <p><b>Grievance Officer, Class of One</b></p>
          <p>Email: {mail} (subject: &ldquo;Grievance&rdquo;)</p>
          <p>Address: {LEGAL_LOCATION}</p>
        </div>
        <p style={{ marginTop: 32 }}>
          We&apos;ll acknowledge your complaint promptly and resolve it within 30 days. If you aren&apos;t satisfied, you may go
          to the Data Protection Board of India once the relevant provisions are in force.
        </p>
      </>
    ),
  },
  {
    id: "other-sites",
    title: "Other websites",
    body: (
      <p>
        Some links lead elsewhere, including the 5-minute parent survey, which is a separate form on another service. Their own
        privacy policies apply there, not this one.
      </p>
    ),
  },
  {
    id: "changes",
    title: "When this policy changes",
    body: (
      <p>
        We&apos;ll post the new version here with a new date. If a change is material, we&apos;ll say so clearly on this page
        before it takes effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy policy"
      note="what we keep, and why. no small print."
      intro="Parents and teachers trusting us with their details is where Class of One starts. Here is exactly what we do with them."
      summary={SUMMARY}
      sections={SECTIONS}
    />
  );
}
