import type { ReactNode } from "react";

/** A device shell for the in-page app renders.
 *
 * These are hand-built HTML, not screenshots: they stay crisp at any size,
 * respond to the site's own theme, and — since the app's palette tokens are
 * the same ones the site uses — a palette change lands in both at once. */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[286px] shrink-0 rounded-[42px] border border-outline bg-surface p-[10px] shadow-[0_30px_80px_-24px_rgb(0_0_0/0.45)] ${className}`}
    >
      <div className="absolute inset-0 rounded-[42px] ring-1 ring-inset ring-white/5" />
      <div className="relative overflow-hidden rounded-[33px] bg-[var(--background)]">
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-muted">
          <span>9:41</span>
          <span className="h-[18px] w-[70px] rounded-full bg-[var(--surface-high)]" />
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-3 rounded-[2px] bg-current opacity-70" />
            <span className="inline-block h-2 w-4 rounded-[2px] border border-current opacity-70" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

const LABELS = [
  { name: "Planned", color: "var(--planned)" },
  { name: "Replacement", color: "var(--replacement)" },
  { name: "Gift", color: "var(--gift)" },
  { name: "Impulse", color: "var(--impulse)", selected: true },
];

/** The shopping intervention, mid-answer. */
export function InterventionScreen() {
  return (
    <div className="px-5 pt-4 pb-6">
      <div className="flex items-center gap-2">
        <span className="relative grid h-7 w-7 place-items-center">
          <span className="absolute inset-0 animate-ring rounded-full bg-pulse/30" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-pulse" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-muted uppercase">
          SlowPulse
        </span>
      </div>

      <p className="mt-4 text-[19px] leading-snug font-bold tracking-[-0.02em] text-ink">
        What problem will this purchase solve?
      </p>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
        Amazon · 4th open today
      </p>

      <div className="mt-4 rounded-2xl border border-outline bg-surface p-3">
        <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
          Amount
        </p>
        <p className="mt-0.5 text-[22px] font-bold tracking-[-0.03em] text-ink">
          $68.40
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          “saw this on my feed, kind of want it”
        </p>
      </div>

      <p className="mt-4 text-[10px] font-semibold tracking-wide text-muted uppercase">
        Suggested label
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {LABELS.map((label) => (
          <span
            key={label.name}
            className="flex items-center gap-1.5 rounded-[10px] border px-2.5 py-1.5 text-[11px] font-medium"
            style={{
              borderColor: label.selected ? label.color : "var(--outline)",
              background: label.selected
                ? "color-mix(in srgb, var(--impulse) 14%, transparent)"
                : "var(--surface-high)",
              color: label.selected ? label.color : "var(--muted)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: label.color }}
            />
            {label.name}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10.5px] leading-relaxed text-muted">
        “Saw this” reads as browsing, not a need — and it&apos;s your 3rd this week.
      </p>

      <div className="mt-4 grid gap-2">
        <button className="rounded-[14px] bg-pulse py-2.5 text-[13px] font-bold text-[var(--on-pulse)]">
          I&apos;ll wait
        </button>
        <button className="rounded-[14px] border-[1.4px] border-accent/55 py-2.5 text-[12.5px] font-semibold text-accent">
          Continue to Amazon
        </button>
      </div>
    </div>
  );
}

const BARS = [
  { label: "Planned", value: 62, color: "var(--planned)" },
  { label: "Replace", value: 34, color: "var(--replacement)" },
  { label: "Gift", value: 21, color: "var(--gift)" },
  { label: "Impulse", value: 78, color: "var(--impulse)" },
];

/** The insights screen: the receipt for the pauses. */
export function InsightsScreen() {
  return (
    <div className="px-5 pt-4 pb-6">
      <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Insights</p>
      <p className="mt-3 text-[10px] font-semibold tracking-wide text-muted uppercase">
        Since you started
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-outline bg-surface p-3">
          <p className="text-[10px] text-muted">Money saved</p>
          <p
            className="mt-1 text-[19px] font-bold tracking-[-0.03em]"
            style={{ color: "var(--planned)" }}
          >
            $412
          </p>
        </div>
        <div className="rounded-2xl border border-outline bg-surface p-3">
          <p className="text-[10px] text-muted">Time saved</p>
          <p
            className="mt-1 text-[19px] font-bold tracking-[-0.03em]"
            style={{ color: "var(--replacement)" }}
          >
            9h 20m
          </p>
        </div>
      </div>

      <p className="mt-4 text-[10px] font-semibold tracking-wide text-muted uppercase">
        This week by label
      </p>
      <div className="mt-3 flex h-24 items-end gap-3 rounded-2xl border border-outline bg-surface px-4 pt-3 pb-2">
        {BARS.map((bar) => (
          <div
            key={bar.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <div
              className="w-full rounded-t-[5px]"
              style={{ height: `${bar.value}%`, background: bar.color, opacity: 0.9 }}
            />
            <span className="text-[8.5px] text-muted">{bar.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border border-outline bg-surface p-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-ink">Cooling off</span>
          <span className="rounded-full bg-[var(--glow)] px-2 py-0.5 text-[8.5px] font-bold tracking-wide text-accent uppercase">
            Pro
          </span>
        </div>
        <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
          Standing desk · $340 — 14 hours left before you decide.
        </p>
      </div>
    </div>
  );
}
