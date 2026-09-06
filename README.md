# SlowPulse — marketing site

Promotional site for the [SlowPulse](../slowpulse-flutter) mobile app. Next.js
(App Router) + Tailwind v4, statically rendered.

```bash
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| All copy, features, categories, pricing, FAQ | `src/lib/site.ts` |
| Color tokens (mirrors the Flutter palette) | `src/app/globals.css` |
| Theme switcher + no-flash boot script | `src/components/theme-*.tsx` |
| In-page app renders (no screenshots) | `src/components/phone.tsx` |
| Page sections | `src/components/hero.tsx`, `sections.tsx` |

## Palette

Every color is a CSS variable lifted from
`slowpulse-flutter/lib/core/theme/app_theme.dart`, so the site and the app
stay in step. The accent is the app's `AppColors.pulse` (`#37B6FF`); like
`AppPalette.accent` it swaps to the deep variant (`#0B6FA8`) in light mode,
where the neon blue can't hold contrast as text.

## Theme

Defaults to the visitor's system preference and follows it live. The switcher
in the header offers light / system / dark; picking light or dark writes
`slowpulse-theme` to `localStorage` and overrides the system from then on,
and picking system clears it. An inline script in `<head>` applies the
resolved theme before first paint, so there's no flash on load.

## Before launch

`src/lib/site.ts` has two empty store URLs (`appStoreUrl`, `playStoreUrl`).
Filling either one flips the hero, header and closing CTA from the
pre-launch wording to real download buttons — nothing else needs editing.
