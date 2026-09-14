/** The social share card, drawn once and reused by every `opengraph-image`
 *  and `twitter-image` route.
 *
 *  Facebook, LinkedIn, Slack, iMessage and friends all read the same
 *  Open Graph tags, and X reads the Twitter ones, so a single 1200x630 PNG
 *  covers the lot. It's rendered by satori at build time, which supports
 *  flexbox and a subset of CSS only — no grid, no Tailwind classes, and
 *  every element holding more than one child needs an explicit `display`. */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** 1200x630 is the size Facebook, LinkedIn and X all document, and the one
 *  ratio that survives every crawler's crop. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Geist, vendored as TTF under `assets/fonts`.
 *
 *  The site's body font comes from `next/font/google`, which caches woff2 —
 *  a format satori can't parse — and `next/og` only bundles the regular
 *  weight, so a bold heading would silently render at 400. Reading real
 *  files keeps the card on-brand and the build offline. */
export async function ogFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf")),
  ]);

  return [
    { name: "Geist", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Geist", data: bold, style: "normal" as const, weight: 700 as const },
  ];
}

const PULSE = "#37b6ff";
const PULSE_BRIGHT = "#8ad6ff";
const ON_PULSE = "#001019";
const INK = "#edf4f9";
const MUTED = "#93a6b6";

export type ShareCardProps = {
  /** Small accent line above the title. */
  eyebrow: string;
  title: string;
  description: string;
  /** Optional pill in the bottom-right — the store badge, usually. */
  footnote?: string;
};

export function ShareCard({ eyebrow, title, description, footnote }: ShareCardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "68px 76px 76px",
        backgroundColor: "#000000",
        color: INK,
        fontFamily: "Geist",
      }}
    >
      {/* The same pulse glow the hero sits in, pushed off the top-right
          corner so it lights the card without competing with the text. */}
      <div
        style={{
          position: "absolute",
          top: -280,
          left: 380,
          width: 1000,
          height: 700,
          display: "flex",
          backgroundImage:
            "radial-gradient(50% 50% at 50% 50%, rgba(55, 182, 255, 0.28) 0%, rgba(55, 182, 255, 0) 70%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Mark />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          <span>Slow</span>
          <span style={{ color: PULSE }}>Pulse</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            marginBottom: 22,
            color: PULSE,
            fontSize: 20,
            fontWeight: 700,
            // satori's textTransform is fine, but uppercasing here keeps the
            // letter-spacing honest across renderers.
            letterSpacing: 3.5,
          }}
        >
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 960,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.08,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            marginTop: 26,
            color: MUTED,
            fontSize: 27,
            lineHeight: 1.45,
          }}
        >
          {description}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", color: MUTED, fontSize: 24 }}>slowpulse.app</div>
        {footnote ? (
          <div
            style={{
              display: "flex",
              padding: "11px 22px",
              borderRadius: 999,
              border: `1px solid rgba(55, 182, 255, 0.35)`,
              backgroundColor: "rgba(55, 182, 255, 0.10)",
              color: PULSE_BRIGHT,
              fontSize: 22,
            }}
          >
            {footnote}
          </div>
        ) : null}
      </div>

      {/* Accent rule along the bottom edge, the card's one bit of chrome. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 8,
          display: "flex",
          backgroundImage: `linear-gradient(90deg, ${PULSE_BRIGHT} 0%, ${PULSE} 45%, rgba(55, 182, 255, 0) 100%)`,
        }}
      />
    </div>
  );
}

/** The logo from `components/logo.tsx`, rebuilt out of divs: satori draws
 *  boxes and border-radius, not SVG paths. */
function Mark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 92,
        height: 92,
        borderRadius: 92,
        border: "2px solid rgba(55, 182, 255, 0.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          width: 69,
          height: 69,
          borderRadius: 69,
          backgroundImage: `linear-gradient(135deg, ${PULSE_BRIGHT} 0%, ${PULSE} 100%)`,
        }}
      >
        <div style={{ width: 9, height: 29, borderRadius: 5, backgroundColor: ON_PULSE }} />
        <div style={{ width: 9, height: 29, borderRadius: 5, backgroundColor: ON_PULSE }} />
      </div>
    </div>
  );
}
