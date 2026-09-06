/** The mark: a pause glyph inside a pulse ring, in the app's accent. */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="sp-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--pulse-bright)" />
          <stop offset="100%" stopColor="var(--pulse)" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="url(#sp-logo)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="13.5" fill="url(#sp-logo)" />
      <rect x="15.6" y="14.4" width="3" height="11.2" rx="1.5" fill="var(--on-pulse)" />
      <rect x="21.4" y="14.4" width="3" height="11.2" rx="1.5" fill="var(--on-pulse)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-[17px] font-bold tracking-[-0.02em] text-ink">
      Slow<span className="text-accent">Pulse</span>
    </span>
  );
}
