"use server";

import { and, count, eq, gt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { getDb } from "@/lib/db/client";
import { handRaises } from "@/lib/db/schema";
import { sendRaiseEmails } from "@/lib/raise/email";
import { isAudience, RAISE_FIELDS, raiseSchema, type RaiseField, type RaiseState } from "@/lib/raise/schema";
import { clientIp, hashIp, userAgent } from "@/lib/request";
import { CONTACT_EMAIL } from "@/lib/site";

const RATE_LIMIT = 10;
const RATE_WINDOW = "1 hour";

export async function raiseHand(_prev: RaiseState, formData: FormData): Promise<RaiseState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    audience: String(formData.get("audience") ?? ""),
    detail: String(formData.get("detail") ?? ""),
    website: String(formData.get("website") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, detail: raw.detail };

  if (!isAudience(raw.audience)) {
    return { status: "error", message: "Please tell us whether you're a parent, teacher or lesson maker.", values };
  }

  // Honeypot filled: pretend it worked, store nothing.
  if (raw.website.trim() !== "") {
    console.info("[raise] honeypot triggered, dropping submission");
    return { status: "success", audience: raw.audience };
  }

  const parsed = raiseSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<RaiseField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as RaiseField;
      if (RAISE_FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields and try again.", fieldErrors, values };
  }

  const db = getDb();
  if (!db) {
    console.error("[raise] DATABASE_URL is not set");
    return { status: "error", message: `We couldn't add you just now. Please try again, or email ${CONTACT_EMAIL}.`, values };
  }

  const h = await headers();
  const ipHash = hashIp(clientIp(h));
  const { name, email, audience, detail } = parsed.data;

  try {
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(handRaises)
      .where(and(eq(handRaises.ipHash, ipHash), gt(handRaises.createdAt, sql`now() - ${RATE_WINDOW}::interval`)));

    if (recent >= RATE_LIMIT) {
      return { status: "error", message: "Too many hands raised from your network in the last hour. Please try again later.", values };
    }

    const [row] = await db
      .insert(handRaises)
      .values({ name, email, audience, detail, ipHash, userAgent: userAgent(h) })
      .onConflictDoNothing({ target: [handRaises.email, handRaises.audience] })
      .returning({ id: handRaises.id });

    // Already on the list: treat as success, no error shown and no second email.
    if (!row) return { status: "success", audience };

    // Emails go out after the response is sent; failures are logged, never surfaced.
    after(() => sendRaiseEmails({ id: row.id, name, email, audience, detail }));

    return { status: "success", audience };
  } catch (err) {
    console.error("[raise] failed to store signup", err);
    return {
      status: "error",
      message: "Something went wrong on our side, so you're not on the list yet. Please try again.",
      values,
    };
  }
}
