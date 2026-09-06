/** Everything the marketing site says about SlowPulse, in one place.
 *
 * Copy here is kept in step with the app's own strings (onboarding, the
 * paywall gates, the guarded-app taxonomy) so the site never promises a
 * feature the build doesn't ship. Where a number is load-bearing — the free
 * guard limit, the pause length — it matches the constant it mirrors, and
 * the comment says which one. */

export const site = {
  name: "SlowPulse",
  tagline: "A one-second pause before the apps that empty your cart and your attention span.",
  description:
    "SlowPulse puts a deliberate pause in front of shopping, doomscroll and food-delivery apps, labels what you were really doing, and shows you the money and time you kept.",
  url: "https://slowpulse.app",
  // Mirrors lib/core/constants/legal.dart.
  privacyUrl: "https://thebitlion.com/privacy",
  eulaUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  maker: "BitLion",
  makerUrl: "https://thebitlion.com",
  /** Store listings aren't live yet. Fill these in and the hero, nav and
   *  closing CTA all switch from "notify me" to real download buttons. */
  appStoreUrl: "",
  playStoreUrl: "",
  /** Mirrors Billing.freeGuardedAppLimit. */
  freeGuardedAppLimit: 1,
  /** Mirrors Billing.proName. */
  proName: "SlowPulse Pro",
} as const;

export const storeLive = Boolean(site.appStoreUrl || site.playStoreUrl);

export type Step = {
  n: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Pick what to guard",
    body: "Choose the apps that cost you — Amazon, TikTok, DoorDash, a trading app. Android matches on the app itself; iOS uses Apple's own Screen Time picker, so the selection never leaves your phone.",
  },
  {
    n: "02",
    title: "Get stopped at the door",
    body: "Opening a guarded app raises the intervention instead of the feed. Shopping asks what problem the purchase solves. Doomscroll apps get a four-second breathing pause and today's open count. Food delivery gets the late-night version.",
  },
  {
    n: "03",
    title: "Answer in ten seconds",
    body: "Planned, replacement, gift, or impulse — pre-picked for you by an on-device heuristic reading your note, the hour and how often you've been here this week. One tap to override it. Then you continue, or you don't.",
  },
  {
    n: "04",
    title: "See what you kept",
    body: "Your streak, this week's spend split by label, money you decided against and an estimate of the time you didn't lose. The receipt for a decision nobody else saw you make.",
  },
];

export type Feature = {
  title: string;
  body: string;
  icon: "pause" | "tag" | "chart" | "shield" | "sync" | "clock";
  accent?: boolean;
};

export const features: Feature[] = [
  {
    title: "An interruption, not a block",
    body: "SlowPulse never confiscates an app. It asks a question you have to answer on purpose, then gets out of the way — including when the answer is \"yes, I'm buying it\".",
    icon: "pause",
    accent: true,
  },
  {
    title: "Labels that aren't guesswork",
    body: "A deterministic on-device classifier — no LLM, no upload — reads your note for intent, then falls back to time of day and this week's frequency. It suggests; you decide.",
    icon: "tag",
  },
  {
    title: "Your money, split honestly",
    body: "Weekly spend broken out as planned, replacement, gift and impulse. The chart isn't a scold — it's the difference between a budget you keep and one you invent.",
    icon: "chart",
  },
  {
    title: "Nine categories of trouble",
    body: "Shopping, social, food delivery, trading and gambling, video, games, dating, news. Each gets the pause it deserves, from a two-minute cooldown to the sternest one in the app.",
    icon: "shield",
  },
  {
    title: "Works with the phone off the grid",
    body: "Everything is written to a local database first. Sign in and your streak and history follow you to your other devices; skip it and the app is fully functional anyway.",
    icon: "sync",
  },
  {
    title: "Time saved, stated as an estimate",
    body: "Backing out of a doomscroll app credits a typical session for that category. We call it an estimate everywhere it appears, because neither platform will tell us the truth.",
    icon: "clock",
  },
];

export type Category = {
  label: string;
  description: string;
  flavor: string;
  tone: "impulse" | "warn" | "planned" | "gift" | "replacement";
};

/** Mirrors GuardedAppCategory in lib/core/constants/guarded_apps.dart. */
export const categories: Category[] = [
  {
    label: "Shopping",
    description: "Where impulse buys happen",
    flavor: "What problem will this solve?",
    tone: "replacement",
  },
  {
    label: "Social & Doomscroll",
    description: "Where minutes disappear",
    flavor: "Four-second pause + today's opens",
    tone: "gift",
  },
  {
    label: "Food Delivery",
    description: "Late-night orders you regret",
    flavor: "What's driving this order?",
    tone: "warn",
  },
  {
    label: "Trading & Gambling",
    description: "Highest stakes, sternest pause",
    flavor: "Five-minute cooldown",
    tone: "impulse",
  },
  {
    label: "Video & Streaming",
    description: "“One more episode” territory",
    flavor: "Are you sure?",
    tone: "planned",
  },
  {
    label: "Games",
    description: "Sessions that outlast the plan",
    flavor: "Are you sure?",
    tone: "gift",
  },
  {
    label: "Dating",
    description: "Swiping that never quite resolves",
    flavor: "Are you sure?",
    tone: "impulse",
  },
  {
    label: "News & Outrage",
    description: "Refreshing for something to be upset about",
    flavor: "Are you sure?",
    tone: "warn",
  },
];

export type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  points: string[];
  cta: string;
  highlight: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "The whole pause, on one app.",
    points: [
      "One guarded app",
      "Every intervention flavor",
      "On-device labeling",
      "Streak, weekly spend and insights",
      "Optional sync across devices",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "Subscription",
    cadence: "monthly, quarterly or yearly",
    blurb: "Guard as many apps as you want, cap what you spend per category, and make the big purchases wait.",
    points: [
      "Unlimited guarded apps",
      "Custom budgets — a monthly cap per category, checked at the moment of purchase",
      "Cooling-off periods — anything over your threshold waits, and we remind you when it's up",
      "Price watch — park what you talked yourself out of and come back to it on purpose",
    ],
    cta: "See plans in the app",
    highlight: true,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Does SlowPulse see what I buy?",
    a: "No. There's no purchase tracking, no receipt parsing and no store integration. The only amount SlowPulse knows is the one you type into an intervention yourself, and the label is your answer to a question.",
  },
  {
    q: "How does it know I opened an app?",
    a: "On Android, an Accessibility Service watches for the guarded package coming to the foreground. On iOS it's Apple's Screen Time framework, which hands the app an opaque token — Apple deliberately doesn't tell third parties which app you picked, and SlowPulse doesn't need to know.",
  },
  {
    q: "Is the labeling AI?",
    a: "Not in the sense that word usually means. It's a deterministic heuristic that runs entirely on your phone: keyword intent in your note first, then time of day and how often you've opened this app this week. Nothing is sent anywhere to produce it, and every suggestion is one tap from being overridden.",
  },
  {
    q: "Can I still open the app?",
    a: "Always. SlowPulse is a speed bump, not a lock. The point is that continuing becomes a decision you made rather than a reflex you had — and the app records both answers the same way.",
  },
  {
    q: "Do I have to make an account?",
    a: "No. Sign-in is optional and exists only to sync your streak and history across devices. Skip it and everything is stored locally on your phone.",
  },
  {
    q: "What happens to my streak if I proceed?",
    a: "Proceeding isn't a failure — it's data. The insights screen counts what you decided against as money saved, and if you later buy something you'd put on hold, SlowPulse rewrites the original event rather than letting that number quietly only ever go up.",
  },
];
