"use client";

import { useTheme, type Theme } from "./theme-provider";

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
        <rect
          x="3"
          y="4.5"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
        <path
          d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/** Three-state switcher: the system default plus the two overrides.
 *
 * A two-state toggle can't express "go back to following my phone" once
 * it's been touched, which is exactly the state most visitors arrive in. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-outline bg-surface/80 p-1 shadow-sm backdrop-blur-md"
    >
      {OPTIONS.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${option.label} theme`}
            title={`${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={[
              "grid h-8 w-8 place-items-center rounded-full transition-colors duration-200",
              active
                ? "bg-[var(--glow)] text-accent"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}
