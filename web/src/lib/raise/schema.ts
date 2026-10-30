import { z } from "zod";
import { AUDIENCES, CHILD_CLASSES, SUBJECTS, type Audience } from "@/lib/audience";

export const RAISE_FIELDS = ["name", "email", "detail"] as const;
export type RaiseField = (typeof RAISE_FIELDS)[number];

const isHttpUrl = (value: string) => {
  try {
    const { protocol, hostname } = new URL(value);
    return (protocol === "http:" || protocol === "https:") && hostname.includes(".");
  } catch {
    return false;
  }
};

const base = {
  name: z.string().trim().min(1, "Please write your name.").max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email.")
    .max(254, "That email is too long.")
    .pipe(z.email("That email doesn't look quite right. Check it and try again.")),
  // Honeypot: real visitors never see or fill this.
  website: z.string().optional().default(""),
};

/** The third field depends on who is raising their hand. */
export const raiseSchema = z.discriminatedUnion("audience", [
  z.object({ ...base, audience: z.literal("parent"), detail: z.enum(CHILD_CLASSES, "Please choose your child's class.") }),
  z.object({ ...base, audience: z.literal("teacher"), detail: z.enum(SUBJECTS, "Please choose the subject you teach.") }),
  z.object({
    ...base,
    audience: z.literal("maker"),
    detail: z.string().trim().max(2000, "That link is too long.").refine(isHttpUrl, "Please paste a full link, starting with https://"),
  }),
]);

export const isAudience = (value: string): value is Audience => (AUDIENCES as readonly string[]).includes(value);

export type RaiseState =
  | { status: "idle" }
  | { status: "success"; audience: Audience }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<RaiseField, string>>;
      values?: Partial<Record<RaiseField, string>>;
    };
