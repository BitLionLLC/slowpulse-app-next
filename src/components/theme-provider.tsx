"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "slowpulse-theme";

type Snapshot = {
  /** What the user chose — "system" until they touch the switcher. */
  theme: Theme;
  /** What that resolves to right now. */
  resolved: "light" | "dark";
};

/** The preference lives in localStorage and `prefers-color-scheme`, not in
 * React state, so it's read as an external store. That keeps the source of
 * truth in one place — the same two things the pre-paint inline script
 * reads — instead of a copy in state that has to be re-synced in an effect. */
const SERVER_SNAPSHOT: Snapshot = { theme: "system", resolved: "light" };

let snapshot: Snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStored(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    // Storage denied (private browsing, blocked cookies): fall back to the
    // system preference rather than failing the render.
    return "system";
  }
}

function getSnapshot(): Snapshot {
  const theme = readStored();
  const resolved =
    theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;
  // useSyncExternalStore compares snapshots by identity, so an unchanged
  // preference has to hand back the very same object or every render loops.
  if (theme !== snapshot.theme || resolved !== snapshot.resolved) {
    snapshot = { theme, resolved };
  }
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

/** Pushes the resolved theme onto <html>, mirroring the inline script. */
function paint(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

function emit() {
  paint(getSnapshot().resolved);
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Following the OS live is the whole point of "system" — someone whose
  // phone flips to dark at sunset shouldn't have to reload. `storage` keeps
  // a second tab in step with a choice made in this one.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", emit);
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", emit);
    window.removeEventListener("storage", emit);
  };
}

function writeTheme(next: Theme) {
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice still applies to this page; it just won't be remembered.
  }
  emit();
}

type ThemeContextValue = Snapshot & { setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, resolved } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const setTheme = useCallback((next: Theme) => writeTheme(next), []);

  const value = useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
