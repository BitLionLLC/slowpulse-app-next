/** The BitLion catalogue, read from the company site at request time.
 *
 * bitlion.us publishes one apps.json that every BitLion property reads, so
 * a new app shows up here the hour after it ships rather than whenever this
 * repo is next deployed. The shape is that file's, not ours, so everything
 * below narrows defensively: a field that isn't the type we expect is
 * dropped instead of rendered, and only http(s) URLs survive. */

import { site } from "./site";

/** Where the catalogue lives, and the site the page points people at. */
export const bitlion = {
  url: "https://www.bitlion.us",
  label: "bitlion.us",
  catalogUrl: "https://www.bitlion.us/apps.json",
} as const;

/** How long a copy of the catalogue is served before it's refetched. An
 *  hour: the file changes a few times a year, and a stale card is a worse
 *  trade than a fetch on every request. */
const REVALIDATE_SECONDS = 3600;

export type CatalogKind = "app" | "extension" | "saas";

export type CatalogLink = { label: string; href: string };

export type CatalogItem = {
  id: string;
  kind: CatalogKind;
  title: string;
  tagline: string | null;
  blurb: string | null;
  icon: string | null;
  category: string | null;
  accentColor: string | null;
  comingSoon: boolean;
  links: CatalogLink[];
};

export type CatalogDeveloper = {
  name: string | null;
  url: string | null;
  supportEmail: string | null;
};

export type Catalog = {
  developer: CatalogDeveloper;
  items: CatalogItem[];
};

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Accepts a link only if it resolves to a real web address. Relative icon
 *  paths resolve against the catalogue's own origin; anything exotic —
 *  `javascript:`, `data:` — is dropped rather than put in an href. */
function webUrl(value: unknown, base?: string): string | null {
  const raw = str(value);
  if (!raw) return null;
  try {
    const url = new URL(raw, base);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function hexColor(value: unknown): string | null {
  const raw = str(value);
  return raw && /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(raw)
    ? raw
    : null;
}

function host(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

/** This site's own entries. The catalogue lists both the SlowPulse app and
 *  the SlowPulse browser extension under slowpulse.app, and a page headed
 *  "our other apps" shouldn't be advertising the site you're standing on. */
const OWN_HOST = host(site.url);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Collapses the per-kind URL fields into one ordered list of links, keeping
 *  the first label for any address that appears twice (a SaaS entry usually
 *  repeats its website as the signup URL). */
function linksFor(raw: Record<string, unknown>, kind: CatalogKind): CatalogLink[] {
  const candidates: [string, unknown][] =
    kind === "app"
      ? [
          ["Website", raw.websiteUrl],
          ["App Store", raw.appStoreUrl],
          ["Google Play", raw.playStoreUrl],
          ["Privacy", raw.privacyUrl],
        ]
      : kind === "extension"
        ? [
            ["Website", raw.websiteUrl],
            ["Chrome Web Store", raw.chromeWebStoreUrl],
            ["Firefox Add-ons", raw.firefoxAddonUrl],
            ["Edge Add-ons", raw.edgeAddonUrl],
            ["Privacy", raw.privacyUrl],
          ]
        : [
            ["Website", raw.websiteUrl],
            ["Sign up", raw.signupUrl],
            ["Privacy", raw.privacyUrl],
          ];

  const links: CatalogLink[] = [];
  const seen = new Set<string>();
  for (const [label, value] of candidates) {
    const href = webUrl(value);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    links.push({ label, href });
  }
  return links;
}

function toItem(value: unknown, kind: CatalogKind): CatalogItem | null {
  if (!isRecord(value)) return null;

  const title = str(value.title);
  if (!title) return null;

  const websiteHost = host(webUrl(value.websiteUrl));
  if (OWN_HOST && websiteHost === OWN_HOST) return null;

  return {
    id: str(value.id) ?? title.toLowerCase().replace(/\s+/g, "-"),
    kind,
    title,
    tagline: str(value.tagline),
    blurb: str(value.shortDescription) ?? str(value.description),
    icon: webUrl(value.icon, bitlion.url),
    category: str(value.category),
    accentColor: hexColor(value.accentColor),
    comingSoon: value.comingSoon === true,
    links: linksFor(value, kind),
  };
}

function toItems(value: unknown, kind: CatalogKind): CatalogItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => toItem(entry, kind))
    .filter((item): item is CatalogItem => item !== null);
}

/** Confirms an icon is actually there. Every catalogue entry names one,
 *  including entries whose artwork hasn't been uploaded yet, and a broken
 *  <img> paints the browser's torn-page glyph exactly where the monogram
 *  fallback is supposed to show through. One HEAD per distinct icon, cached
 *  on the same clock as the catalogue. */
async function verifyIcons(items: CatalogItem[]): Promise<CatalogItem[]> {
  const urls = [
    ...new Set(items.map((item) => item.icon).filter((url) => url !== null)),
  ];

  const checked = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: "HEAD",
          cache: "force-cache",
          next: { revalidate: REVALIDATE_SECONDS },
        });
        const type = response.headers.get("content-type") ?? "";
        return [url, response.ok && type.startsWith("image/")] as const;
      } catch {
        return [url, false] as const;
      }
    }),
  );

  const present = new Map(checked);
  return items.map((item) =>
    item.icon && !present.get(item.icon) ? { ...item, icon: null } : item,
  );
}

/** Fetches and normalises the catalogue. Returns `null` if bitlion.us is
 *  unreachable or serves something that isn't the file we expect — the page
 *  falls back to a plain link rather than failing to render. */
export async function fetchCatalog(): Promise<Catalog | null> {
  let payload: unknown;
  try {
    const response = await fetch(bitlion.catalogUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    payload = await response.json();
  } catch {
    return null;
  }

  if (!isRecord(payload)) return null;

  const parsed = [
    ...toItems(payload.apps, "app"),
    ...toItems(payload.extensions, "extension"),
    ...toItems(payload.saas, "saas"),
  ];
  if (parsed.length === 0) return null;

  const items = await verifyIcons(parsed);

  const developer = isRecord(payload.developer) ? payload.developer : {};
  const email = str(developer.supportEmail);

  return {
    developer: {
      name: str(developer.name),
      url: webUrl(developer.url),
      // Guard against a display string sneaking into a mailto: href.
      supportEmail: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
    },
    items,
  };
}

/** The catalogue split into the three shelves the page renders, in the order
 *  it renders them. Empty groups are dropped by the page. */
export const GROUPS: { kind: CatalogKind; title: string; lead: string }[] = [
  {
    kind: "app",
    title: "Apps",
    lead: "Small, single-purpose phone apps. Same rules as SlowPulse: they work offline, and they ask for as little as they can get away with.",
  },
  {
    kind: "extension",
    title: "Browser extensions",
    lead: "The same ideas, in the tab where you actually spend the day.",
  },
  {
    kind: "saas",
    title: "On the web",
    lead: "Nothing to install.",
  },
];
