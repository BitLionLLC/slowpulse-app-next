import type { Metadata } from "next";
import { ArrowIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GROUPS, bitlion, fetchCatalog } from "@/lib/apps";
import type { CatalogItem } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Other apps by BitLion",
  description: `The rest of what ${site.maker} makes — the apps, browser extensions and web tools that live alongside ${site.name}.`,
  alternates: { canonical: "/apps" },
  // `openGraph` and `twitter` are replaced wholesale per route, not merged
  // into the root layout's, so the boilerplate is repeated here on purpose —
  // leave it out and this page ships without og:type or og:site_name.
  openGraph: {
    type: "website",
    url: "/apps",
    siteName: site.name,
    locale: "en_US",
    title: `Other apps by ${site.maker}`,
    description: `The rest of what ${site.maker} makes, alongside ${site.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Other apps by ${site.maker}`,
    description: `The rest of what ${site.maker} makes, alongside ${site.name}.`,
  },
};

export default async function AppsPage() {
  const catalog = await fetchCatalog();
  const groups = GROUPS.map((group) => ({
    ...group,
    items: catalog?.items.filter((item) => item.kind === group.kind) ?? [],
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-outline/70">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, var(--glow) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-20">
            <p className="text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
              {site.maker}
            </p>
            <h1 className="mt-3 max-w-3xl text-[38px] leading-[1.08] font-bold tracking-[-0.04em] text-balance text-ink sm:text-[50px]">
              Check out our other apps.
            </h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">
              The same people who made {site.name} make a handful of other
              small things. This list is read straight from{" "}
              <a
                href={bitlion.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {bitlion.label}
              </a>
              , so it&apos;s whatever we&apos;re actually shipping today.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={bitlion.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[14px] bg-pulse px-6 py-3.5 text-[15px] font-bold text-[var(--on-pulse)] transition-transform hover:-translate-y-0.5"
              >
                Visit {bitlion.label}
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={site.makerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[14px] border-[1.4px] border-accent/55 px-6 py-3.5 text-[15px] font-semibold text-accent transition-colors hover:bg-[var(--glow)]"
              >
                thebitlion.com
              </a>
            </div>
          </div>
        </section>

        {groups.length === 0 ? (
          <Unavailable />
        ) : (
          groups.map((group) => (
            <section
              key={group.kind}
              className="border-b border-outline/70 py-16 sm:py-20"
            >
              <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
                <h2 className="text-[26px] leading-tight font-bold tracking-[-0.03em] text-ink sm:text-[30px]">
                  {group.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {group.lead}
                </p>
                <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <AppCard key={`${item.kind}:${item.id}`} item={item} />
                  ))}
                </div>
              </div>
            </section>
          ))
        )}

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="rounded-[24px] border border-outline bg-surface p-8 sm:p-10">
              <h2 className="text-[22px] font-bold tracking-[-0.025em] text-ink">
                {catalog?.developer.name ?? `${site.maker}, LLC`}
              </h2>
              <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">
                Everything above is made by the same people who make{" "}
                {site.name}. If something here is broken or missing, the
                fastest way to tell us is to say so directly.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <PillLink href={bitlion.url}>{bitlion.label}</PillLink>
                <PillLink href={catalog?.developer.url ?? site.makerUrl}>
                  thebitlion.com
                </PillLink>
                {catalog?.developer.supportEmail && (
                  <PillLink href={`mailto:${catalog.developer.supportEmail}`}>
                    {catalog.developer.supportEmail}
                  </PillLink>
                )}
                <PillLink href={site.privacyUrl}>Privacy</PillLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/** Shown when bitlion.us can't be reached. The page still has to say
 *  something true and give people the door out. */
function Unavailable() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="rounded-[24px] border border-outline bg-surface p-8 text-center sm:p-12">
          <h2 className="text-[22px] font-bold tracking-[-0.025em] text-ink">
            The list didn&apos;t load.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
            We couldn&apos;t reach {bitlion.label} just now. Everything we make
            is listed there directly.
          </p>
          <a
            href={bitlion.url}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-[14px] border-[1.4px] border-accent/55 px-6 py-3 text-[14.5px] font-semibold text-accent transition-colors hover:bg-[var(--glow)]"
          >
            Open {bitlion.label}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AppCard({ item }: { item: CatalogItem }) {
  const accent = item.accentColor;
  return (
    <article className="relative flex flex-col overflow-hidden rounded-[20px] border border-outline bg-surface p-6 transition-colors hover:border-accent/40">
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 h-40 w-40 rounded-full opacity-45 blur-3xl"
          style={{ background: accent }}
        />
      )}

      <div className="relative flex items-start gap-4">
        <AppIcon item={item} />
        <div className="min-w-0">
          <h3 className="text-[16.5px] leading-snug font-bold tracking-[-0.02em] text-ink">
            {item.title}
          </h3>
          {item.tagline && (
            <p className="mt-1 text-[13px] leading-snug text-muted">
              {item.tagline}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        {item.comingSoon && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--warn)]/45 bg-[var(--warn)]/12 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em] text-[var(--warn)] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--warn)]" />
            Coming soon
          </span>
        )}
        {item.category && (
          <span className="rounded-full border border-outline bg-[var(--surface-high)] px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em] text-muted uppercase">
            {item.category}
          </span>
        )}
      </div>

      {item.blurb && (
        <p className="relative mt-4 text-[14px] leading-relaxed text-muted">
          {item.blurb}
        </p>
      )}

      {item.links.length > 0 && (
        <div className="relative mt-auto flex flex-wrap gap-2 border-t border-outline pt-5 [&:not(:first-child)]:mt-6">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-outline px-3 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:border-accent/45 hover:text-accent"
            >
              <span className="sr-only">{item.title}: </span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

/** The app's own icon, over a monogram tinted with its accent. The monogram
 *  isn't decoration — it's the fallback: an icon the catalogue names but
 *  hasn't uploaded yet leaves an empty transparent box, and the initials
 *  show through it. */
function AppIcon({ item }: { item: CatalogItem }) {
  const monogram = item.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[16px] border border-outline"
      style={{ background: tint(item.accentColor) ?? "var(--surface-high)" }}
    >
      <span
        className="text-[17px] font-bold tracking-[-0.02em]"
        style={{ color: item.accentColor ?? "var(--muted)" }}
      >
        {monogram}
      </span>
      {item.icon && (
        // A plain <img>: next/image would need every bitlion.us path
        // allow-listed, and would turn an icon the catalogue lists but
        // hasn't uploaded into an optimiser error rather than a monogram.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.icon}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}

/** A 6-digit hex at ~12% opacity, for the icon tile behind a transparent
 *  logo. Anything else (a 3- or 8-digit hex) is left to the default. */
function tint(hex: string | null): string | null {
  return hex && /^#[0-9a-f]{6}$/i.test(hex) ? `${hex}1f` : null;
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center rounded-full border border-outline px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:border-accent/45 hover:text-accent"
    >
      {children}
    </a>
  );
}
