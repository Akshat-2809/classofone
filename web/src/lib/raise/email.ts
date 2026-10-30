import "server-only";
import { Resend } from "resend";
import { AUDIENCE_DATA, type Audience } from "@/lib/audience";
import { CONTACT_EMAIL, FOUNDER_NAME, SITE_URL } from "@/lib/site";

type Raise = { id: number; name: string; email: string; audience: Audience; detail: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends the thank-you email and the internal notification.
 * Never throws: email problems are logged and must not fail the signup.
 */
export async function sendRaiseEmails(raise: Raise) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const notify = process.env.NOTIFY_EMAIL;
  if (!apiKey || !from) {
    console.warn(`[raise] #${raise.id}: RESEND_API_KEY or EMAIL_FROM not set, skipping emails`);
    return;
  }
  const resend = new Resend(apiKey);
  const word = AUDIENCE_DATA[raise.audience].word;
  const thanks = `Thank you. ${FOUNDER_NAME.split(" ")[0]} will reach out personally.`;

  const jobs: Promise<unknown>[] = [
    resend.emails.send(
      {
        from,
        to: raise.email,
        replyTo: CONTACT_EMAIL,
        subject: "Hand raised",
        text: [thanks, `You're on the list as a ${word}.`, "", "— Class of One", SITE_URL].join("\n"),
        html: `<div style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#17223A">
<p style="margin:0 0 12px"><strong>${escape(thanks)}</strong> You're on the list as a ${escape(word)}.</p>
<p style="margin:0;color:#47546B">Class of One · <a href="${escape(SITE_URL)}" style="color:#17223A">${escape(SITE_URL.replace(/^https?:\/\//, ""))}</a></p>
</div>`,
      },
      { idempotencyKey: `raise-thanks/${raise.id}` },
    ),
  ];

  if (notify) {
    jobs.push(
      resend.emails.send(
        {
          from,
          to: notify,
          replyTo: raise.email,
          subject: `New hand raised (${word}): ${raise.name}`,
          text: [`Name: ${raise.name}`, `Email: ${raise.email}`, `As a: ${word}`, `Detail: ${raise.detail}`].join("\n"),
        },
        { idempotencyKey: `raise-notify/${raise.id}` },
      ),
    );
  } else {
    console.warn(`[raise] #${raise.id}: NOTIFY_EMAIL not set, skipping internal notification`);
  }

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error(`[raise] #${raise.id}: email failed`, r.reason);
    } else {
      const { error } = r.value as { error: unknown };
      if (error) console.error(`[raise] #${raise.id}: email rejected by Resend`, error);
    }
  }
}
