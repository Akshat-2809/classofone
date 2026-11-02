# Class of One — getclassofone.com

> **The forms deliver nothing.** "Raise my hand", the contact form and the footer email box run only in the browser. They validate what's typed and show a success message, but nothing is sent or stored, and nobody is notified. The only real way to reach Class of One is the contact email, so that address must be a real mailbox.

Site for Class of One: live one-on-one classes for school children. It's a faithful port of the approved homepage design, with front-end-only forms and no backend.

Everything lives in one Next.js 16 app in [`web/`](web/). There is no database, no email sending and no Server Actions.

```
classofone/
├── design/project/              Approved design (Main.dc.html is the source of truth)
└── web/                         Next.js 16 (App Router, React 19, TypeScript), deployed to Vercel
    ├── assets/                  Gabarito ExtraBold, used only to render the OG image
    └── src/
        ├── app/
        │   ├── page.tsx         homepage: assembles the sections, Organization JSON-LD
        │   ├── layout.tsx       fonts (next/font), metadata
        │   ├── globals.css      design tokens + shared classes
        │   ├── api/health/           GET { status: "ok" }
        │   ├── contact/         contact page (form + email/location cards)
        │   ├── privacy/ terms/  legal pages (shared layout: components/LegalDoc.tsx)
        │   ├── not-found.tsx    styled 404
        │   └── opengraph-image.tsx, twitter-image.tsx, icon.svg, apple-icon.tsx, sitemap.ts, robots.ts
        ├── components/          one component + CSS Module per section
        └── lib/
            ├── audience.ts      all copy that changes with "I'm a…" (parent, teacher, curriculum maker)
            ├── audienceStore.ts shared client state for that choice
            ├── raise/ contact/  zod schemas for the forms, footer email carry-over
            └── site.ts          site URL, contact email, founder name, survey link
```

## Sections and what runs in the browser

Sections are Server Components and ship no JavaScript, except the interactive pieces marked "client" below.

| Section | Component | Client JS |
|---|---|---|
| Nav | `Nav` (server), with `AudienceSwitch` | client: switch, CTA label |
| Opening | `Opening` (server), with `Doors` | client: notebooks |
| Timetable | `Timetable` (server), with `TimetableScroller`, `Nudges`, `LessonPanel`, `MinutesChart`, `Clocks` | client: those five |
| For you | `ForYou` | client: follows the audience |
| Report card | `ReportCard` (server), with `ScrollTrigger` | client: trigger only |
| Raise your hand | `RaiseHand` | client: form, validates in the browser |
| Footer | `Footer` (server), with `FooterWaitlist` and `AudienceText` | client: those two |

## Placeholders still to replace

- **Founder photo.** In place, cropped from a small screenshot (`web/src/assets/founder/pratik-vimal.jpg`). Swap in the original if you have it.
- **Domain.** `getclassofone.com` is inferred from the `hello@getclassofone.com` address in the design. Change the default in `web/src/lib/site.ts` (or set `NEXT_PUBLIC_SITE_URL`) if the site will live elsewhere.
- **Legal review.** `/privacy` and `/terms` are full drafts for Indian law (IT Act 2000, SPDI Rules 2011, DPDP Act 2023 with the DPDP Rules 2025), written for this site in its own voice. Have them reviewed by a lawyer before launch, especially the children's section, because this product is for children. They also make statements you need to keep true: you need a real Grievance Officer and mailbox behind that address, access to that mailbox must stay limited, and a separate policy for classes must exist before any child joins. Shared values are in `web/src/lib/legal.ts`.
- **Facts in the design copy** were kept word for word and not checked: the founder's career dates, the Kuhl and Bloom research summaries, the ₹20,000 stipend and "2 spots".

## Local setup

Requirements: Node 20.9 or later.

```bash
cd web
npm install
npm run dev                     # http://localhost:3000
```

### Scripts (in `web/`)

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | no | Defaults to `https://getclassofone.com`. Used for canonical URLs, sitemap and OG tags. |

## How the forms work

All three run only in the browser and make no network request.

- **"Raise my hand"** (`RaiseHand`) and **contact** (`ContactForm`): `onSubmit` calls `preventDefault` and validates with the zod schema in `src/lib/raise/schema.ts` or `src/lib/contact/schema.ts`. If it fails, errors appear next to each field and what the person typed stays. If it passes, the success state shows. The fields have no `name` attribute, so a submit before the page's JavaScript loads can't put them in the URL or the hosting logs.
- **Footer email box** (`FooterWaitlist`): carries the email into the "Raise my hand" form through `src/lib/raise/draft.ts` and moves the cursor to the name field.

## Deploy to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket, then in Vercel choose **Add New → Project** and import it.
2. Set **Root Directory** to `web`. The framework preset (Next.js) and the build command are detected automatically.
3. Deploy. Preview deployments serve a `Disallow: /` robots.txt, so they stay out of search results.

## Connect the domain

1. In Vercel: Project → **Settings → Domains** → add `getclassofone.com`, then `www.getclassofone.com`, and choose to **redirect `www` to the apex**.
2. Vercel shows the exact DNS records to create (typically an **A** record for `@` and a **CNAME** for `www`). Add them at your domain registrar, removing any default "Parked" records first.
3. Wait for both domains to show **Valid Configuration**. HTTPS certificates are issued automatically.

The site sends no email. To *receive* mail at hello@getclassofone.com, set up a mailbox provider (Google Workspace, Zoho, etc.) and add its MX records.

## Fidelity notes (vs. the approved design, `Main.dc.html`)

Compared side by side in Chrome at 1440px and 390px:
- **Layout:** every section has the same top and height as in the design at 1440px, except the report card, which is taller for the photo. At 390px the page is also slightly taller, for the nudge change below.
- **Pixel difference:** 0.00% on most sections. The rest comes from animations caught at a different moment and the live clocks.
- **Interactions:** all checked in the browser (notebooks, nav switch, pinned timetable and period buttons, nudges, interest chips, minutes chart, clocks, report card, form states).

Intentional differences:
- **Waitlist validates, but delivers nothing.** Like the design's form, it only flips to a thank-you, with validation added. After a success as a parent, switching to Teacher brings the form back rather than claiming "You're on the list as a teacher".
- **Pages added:** Privacy and Terms are real pages, linked from the navbar and the footer. A Contact page was added, and the email is a `mailto:` link. Nav and footer links point to `/#section`, so they work from every page. The "I'm a…" switch shows only on the homepage.
- **Footer redesigned:** the design's "School's out" bell and "Tomorrow's timetable" list became four columns (brand, Explore, Policies, Raise your hand), keeping the chalkboard and wooden ledge. The email box carries the email to the "Raise my hand" form, which still needs a name and one detail.
- **Founder photo** replaces the `[Founder photo]` placeholder in the report card, which makes the card's header taller than in the design.
- **Timetable sizing is CSS, not JavaScript** (`450vh` + a sticky `100vh` pin, at 900px and up), so nothing shifts on load. Same numbers as the design.
- **Minutes chart:** 40 tiny buttons became one slider over the chart. It looks and hovers the same, passes touch-target checks, and takes arrow keys instead of 40 tab stops.
- **Teacher nudges** rotate only while on screen, and not at all with reduced motion. They aren't announced to screen readers every 2.6 seconds. On phones each nudge has a fixed height, because in the design the rotating text moved the whole page below it up and down.
- **Keyboard:** tabbing into a panel that's panned off-screen scrolls that period into view.
- **Report card rows** rest fully visible and fade in from 20% when triggered, so they read without JavaScript.
- **Fade-ins** start at opacity .01 instead of 0, so Chrome can count the hero text as the LCP element. It looks identical.
- **Contrast fixes with almost no visual change:** notebook subtitles are fully white, and the LIVE badge uses `--red` instead of `--margin`.
- **Anchors on phones** land below the taller nav.

Kept as designed, worth a decision later:
- At 390px the sticky nav wraps onto three rows and takes 189px, about 22% of the screen, all the way down the page.
