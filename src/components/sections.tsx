import {
  ChartIcon,
  CheckIcon,
  ClockIcon,
  PauseIcon,
  ShieldIcon,
  SyncIcon,
  TagIcon,
} from "./icons";
import { categories, faqs, features, site, steps, tiers } from "@/lib/site";
import type { Feature } from "@/lib/site";

const ICONS: Record<Feature["icon"], React.ComponentType<{ className?: string }>> = {
  pause: PauseIcon,
  tag: TagIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
  sync: SyncIcon,
  clock: ClockIcon,
};

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[32px] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink sm:text-[40px]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{lead}</p>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-outline/70 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, and only one of them is yours to do daily."
          lead="Set it up once. After that, SlowPulse only shows up at the exact moment a decision is about to be made for you."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group relative flex flex-col rounded-[20px] border border-outline bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <span className="font-mono text-[13px] font-bold text-accent">
                {step.n}
              </span>
              <h3 className="mt-3 text-[17px] font-bold tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-outline/70 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What you get"
          title="A speed bump with a memory."
          lead="Blocking apps fails because you uninstall the blocker. SlowPulse works the other way around: it lets you through every time, and makes you notice that you asked."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <article
                key={feature.title}
                className={[
                  "relative overflow-hidden rounded-[20px] border p-6 transition-transform hover:-translate-y-0.5",
                  feature.accent
                    ? "border-accent/35 bg-surface"
                    : "border-outline bg-surface",
                ].join(" ")}
              >
                {feature.accent && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl"
                    style={{ background: "var(--glow)" }}
                  />
                )}
                <span className="relative grid h-10 w-10 place-items-center rounded-[13px] bg-[var(--glow)] text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 text-[16.5px] font-bold tracking-[-0.02em] text-ink">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-[14px] leading-relaxed text-muted">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="border-t border-outline/70 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <SectionHeading
            eyebrow="The taxonomy"
            title="Every category gets the pause it deserves."
            lead="A five-minute cooldown in front of a trading app and a four-second breath in front of Instagram are not the same intervention — so SlowPulse doesn't pretend they are."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.label}
                className="rounded-[18px] border border-outline bg-surface p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: `var(--${category.tone})` }}
                  />
                  <h3 className="text-[14.5px] font-bold tracking-[-0.01em] text-ink">
                    {category.label}
                  </h3>
                </div>
                <p className="mt-1 text-[13px] text-muted">{category.description}</p>
                <p className="mt-2.5 border-t border-outline pt-2.5 text-[11.5px] font-medium text-accent">
                  {category.flavor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  const points = [
    "The labeling model runs on your phone. It's a heuristic, not an LLM, and nothing is uploaded to produce a suggestion.",
    "There is no purchase tracking. The only amount SlowPulse knows is the one you typed in yourself.",
    "On iOS, Apple's Screen Time picker returns an opaque token — even Apple won't tell us which app you guarded.",
    "Sign-in is optional. Skip it and every row stays in a local database on your device.",
  ];

  return (
    <section className="border-t border-outline/70 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-outline bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "var(--glow)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
                Privacy
              </p>
              <h2 className="mt-3 text-[30px] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink sm:text-[36px]">
                An app about restraint should show some.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                SlowPulse asks about the most private thing you do on your phone.
                The design answer to that is to know as little as possible.
              </p>
            </div>
            <ul className="grid gap-3">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-[16px] border border-outline bg-[var(--background)] p-4"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--planned)]" />
                  <span className="text-[14px] leading-relaxed text-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-outline/70 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Free guards one app. Pro guards the rest of the habit."
          lead={`Plans are sold in-app through the App Store and Google Play, so the price you see is your local one. ${site.proName} is monthly, quarterly or yearly — the longer plans carry the saving.`}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={[
                "relative overflow-hidden rounded-[24px] border p-8",
                tier.highlight
                  ? "border-accent/45 bg-surface"
                  : "border-outline bg-surface",
              ].join(" ")}
            >
              {tier.highlight && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: "var(--glow)" }}
                />
              )}
              <div className="relative flex items-center gap-2">
                <h3 className="text-[19px] font-bold tracking-[-0.02em] text-ink">
                  {tier.name}
                </h3>
                {tier.highlight && (
                  <span className="rounded-full bg-[var(--glow)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-accent uppercase">
                    {site.proName}
                  </span>
                )}
              </div>
              <p className="relative mt-4 flex items-baseline gap-2">
                <span className="text-[34px] font-bold tracking-[-0.04em] text-ink">
                  {tier.price}
                </span>
                <span className="text-[13px] text-muted">{tier.cadence}</span>
              </p>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-muted">
                {tier.blurb}
              </p>
              <ul className="relative mt-6 grid gap-3 border-t border-outline pt-6">
                {tier.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckIcon
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{
                        color: tier.highlight
                          ? "var(--accent)"
                          : "var(--planned)",
                      }}
                    />
                    <span className="text-[14px] leading-relaxed text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#get"
                className={[
                  "relative mt-8 inline-flex w-full items-center justify-center rounded-[14px] px-6 py-3.5 text-[14.5px] font-bold transition-opacity hover:opacity-90",
                  tier.highlight
                    ? "bg-pulse text-[var(--on-pulse)]"
                    : "border-[1.4px] border-accent/55 font-semibold text-accent",
                ].join(" ")}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
          Subscriptions renew automatically until cancelled, and can be managed
          or cancelled from your store account at any time. Free covers{" "}
          {site.freeGuardedAppLimit === 1
            ? "one guarded app"
            : `${site.freeGuardedAppLimit} guarded apps`}{" "}
          with no account and no time limit.
        </p>
      </div>
    </section>
  );
}

export function Faqs() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-outline/70 py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <SectionHeading eyebrow="FAQ" title="The questions people actually ask." />
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-[18px] border border-outline bg-surface px-5 py-4 open:border-accent/35"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold tracking-[-0.01em] text-ink marker:hidden">
                {faq.q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--surface-high)] text-muted transition-transform group-open:rotate-45 group-open:bg-[var(--glow)] group-open:text-accent">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="border-t border-outline/70 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-accent/35 bg-surface px-8 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
            style={{ background: "var(--glow)" }}
          />
          <div className="relative">
            <span className="relative mx-auto grid h-14 w-14 place-items-center">
              <span className="absolute inset-0 animate-ring rounded-full bg-pulse/25" />
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-pulse text-[var(--on-pulse)]">
                <PauseIcon className="h-5 w-5" />
              </span>
            </span>
            <h2 className="mt-6 text-[32px] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink sm:text-[42px]">
              One second now, or the receipt later.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-balance text-muted">
              Guard your worst app for free. Keep the answer you gave — and the
              money you didn&apos;t spend.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#get"
                className="inline-flex items-center gap-2 rounded-[14px] bg-pulse px-7 py-3.5 text-[15px] font-bold text-[var(--on-pulse)] transition-transform hover:-translate-y-0.5"
              >
                Get {site.name}
              </a>
              <a
                href={site.privacyUrl}
                className="inline-flex items-center gap-2 rounded-[14px] border-[1.4px] border-outline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-accent/45 hover:text-accent"
              >
                Read the privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
