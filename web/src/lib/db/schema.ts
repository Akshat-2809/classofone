import { index, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const handRaises = pgTable(
  "hand_raises",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    // Stored trimmed and lowercased, so the unique constraint catches duplicates.
    email: text("email").notNull(),
    // "parent", "teacher" or "maker": which door the visitor came through.
    audience: text("audience").notNull(),
    // Child's class (parent), subject (teacher) or a lesson link (maker).
    detail: text("detail").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // Salted SHA-256 of the client IP, used only for rate limiting. Never the raw IP.
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent"),
  },
  (t) => [
    // One person can be both a parent and a teacher, so the same email may appear once per audience.
    unique("hand_raises_email_audience_unique").on(t.email, t.audience),
    index("hand_raises_ip_created_idx").on(t.ipHash, t.createdAt),
  ],
);

export type HandRaiseRow = typeof handRaises.$inferSelect;

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // Salted SHA-256 of the client IP, used only for rate limiting. Never the raw IP.
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent"),
  },
  (t) => [index("contact_messages_ip_created_idx").on(t.ipHash, t.createdAt)],
);

export type ContactMessageRow = typeof contactMessages.$inferSelect;
