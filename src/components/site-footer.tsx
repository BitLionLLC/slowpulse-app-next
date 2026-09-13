import Link from "next/link";
import { Logo, Wordmark } from "./logo";
import { bitlion } from "@/lib/apps";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-outline/70 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <Wordmark />
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            {site.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {/* Root-relative anchors: these live on every page now, and a bare
              "#how" scrolls nowhere from /apps. */}
          <FooterColumn
            title="Product"
            links={[
              { label: "How it works", href: "/#how" },
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/#pricing" },
              { label: "FAQ", href: "/#faq" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Privacy", href: site.privacyUrl },
              { label: "Terms (EULA)", href: site.eulaUrl },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "Check out our other apps", href: "/apps" },
              { label: site.maker, href: site.makerUrl },
              { label: bitlion.label, href: bitlion.url },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl px-5 sm:px-8">
        <p className="border-t border-outline pt-6 text-[12.5px] text-muted">
          © {new Date().getFullYear()}{" "}
          <a
            href={site.makerUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-muted/45 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/60"
          >
            {site.maker}
          </a>
          . {site.name} is a pause, not a lock — you can always continue.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[12px] font-bold tracking-[0.12em] text-ink uppercase">
        {title}
      </h3>
      <ul className="mt-3 grid gap-2">
        {links.map((link) => {
          const className =
            "text-[13.5px] text-muted transition-colors hover:text-accent";
          const internal = link.href.startsWith("/");
          return (
            <li key={link.label}>
              {internal ? (
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
