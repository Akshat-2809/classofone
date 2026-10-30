/** Everything on the page that changes with "I'm a…". Copy is verbatim from design/project/Main.dc.html. */
export const AUDIENCES = ["parent", "teacher", "maker"] as const;
export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_DATA = {
  parent: {
    short: "Parent",
    word: "parent",
    cta: "Join as a parent",
    lab: "For parents",
    head: "See inside every class.",
    lede: "We are building live one-on-one online classes for school children, Nursery to Class 12. Before we build much further, we want to hear from parents.",
    raise: "Want this for your child?",
    hint: "raise your hand, we’ll reach out",
    items: [
      "A brilliant teacher, one-on-one, live.",
      "Lessons rebuilt around what your child loves.",
      "A window into every class, so you know whether it’s working.",
      "Most of the survey asks what your family already does and pays for, rather than what you think of our idea.",
      "Five minutes. And if you know parents with strong views, a share helps more than anything.",
    ],
  },
  teacher: {
    short: "Teacher",
    word: "teacher",
    cta: "Apply to teach",
    lab: "For teachers",
    head: "Teach from home, with tools that make you better every week.",
    lede: "We are starting with a small group of exceptional teachers. You don’t need a big-brand résumé. You need to be brilliant with children.",
    raise: "Light up when a child finally gets it?",
    hint: "raise your hand to teach",
    items: [
      "You light up when a child finally gets it.",
      "You care more about curiosity than marks.",
      "You make subjects come alive, not just syllabi get covered.",
      "If you can make “saving vs spending” fun for a 12-year-old, we want to talk.",
      "You want to teach from home, with tools that make you better every week.",
    ],
  },
  maker: {
    short: "Lesson maker",
    word: "curriculum maker",
    cta: "Apply to build lessons",
    lab: "For curriculum makers",
    head: "Write lessons a child would pick on a free evening.",
    lede: "What you write gets taught again and again, to children you will never meet. That is the whole job, and it is a big one.",
    raise: "Got a lesson you’re proud of?",
    hint: "raise your hand to build",
    items: [
      "Deep subject command in Maths or Science: CBSE, IB or IGCSE.",
      "Beyond-school range: something children kept coming back to after school hours.",
      "A maker’s hands. You write, build and test the lessons yourself.",
      "A very high bar for engagement. You know exactly why a lesson worked.",
      "Real AI fluency. You can tell when its output is confidently wrong.",
    ],
  },
} as const satisfies Record<Audience, Record<string, string | readonly string[]>>;

export const DOORS: Record<Audience, { color: string; title: string; scrawl: string; sub: string }> = {
  parent: { color: "#2F5F9E", title: "Parent", scrawl: "my child", sub: "See what we’re building for your child, and tell us what you need." },
  teacher: { color: "#C8483F", title: "Teacher", scrawl: "ma’am / sir", sub: "Teach live, one-on-one, from home, with an AI that makes you better every week." },
  maker: { color: "#2F6B52", title: "Curriculum maker", scrawl: "lessons & stories", sub: "Write lessons that get taught again and again, to children you’ll never meet." },
};

export const CHILD_CLASSES = ["Nursery – KG", "Class 1 – 4", "Class 5 – 8", "Class 9 – 10", "Class 11 – 12"] as const;
export const SUBJECTS = ["Maths", "Science", "English", "Kannada", "Hindi", "Money & financial literacy"] as const;
