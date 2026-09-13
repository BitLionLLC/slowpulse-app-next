# SlowPulse — marketing site

Promotional site for the [SlowPulse](../slowpulse-flutter) mobile app. Next.js
(App Router) + Tailwind v4, statically rendered — apart from
`/extension/connect`, which is the one page with a server, an account and a
reason to be dynamic. See *The extension handshake* below.

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
| The browser-extension handshake | `src/app/extension/connect/`, `src/lib/extension.ts` |
| Clerk, scoped to `/extension` only | `src/proxy.ts` |

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

## The extension handshake

`slowpulse-chrome-extension` unlocks SlowPulse Pro from the subscription bought
in the phone app — Apple's guideline 3.1.3(b), Multiplatform Services. Nothing
is sold in the browser. To read that entitlement the extension has to know which
account it belongs to, and it can't hold a Clerk session of its own, so this
site does the introduction once:

```
extension ──launchWebAuthFlow──▶ /extension/connect?redirect_uri=…
                                    │ Clerk sign-in if needed
                                    │ then a press on "Connect"
                                    ▼
                        Convex mints an opaque token
                                    │
              redirect back to the extension, token in the fragment
```

The token rides in the **fragment**, never the query: a fragment isn't sent to
any server, so it stays out of access logs and `Referer` headers, and Chrome
still hands the extension the whole URL.

`safeRedirectTarget` in `src/lib/extension.ts` is the security-critical part of
this repo. The page hands a credential to whatever that function returns, so an
unchecked `redirect_uri` would turn the handshake into an open redirect that
mails a user's account token to any site that asked for it. It requires https,
requires the origin to be listed in `EXTENSION_REDIRECT_ORIGINS`, and drops the
caller's query and fragment rather than preserving them.

Clerk runs only here: the matcher in `src/proxy.ts` is `/extension/:path*`, so
the marketing pages stay static and never pay for an auth round trip. (Next 16
deprecated `middleware.ts` and renamed it to `proxy.ts` — same function.)

Environment variables are documented in `.env.example`.
