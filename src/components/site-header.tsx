import Link from "next/link";
import { Logo, Wordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { site, storeLive } from "@/lib/site";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline/70 bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo className="h-8 w-8" />
          <Wordmark />
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-[var(--surface-high)] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#get"
            className="hidden rounded-full bg-pulse px-4 py-2 text-[13px] font-bold text-[var(--on-pulse)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {storeLive ? "Download" : "Get early access"}
          </a>
        </div>
      </div>
    </header>
  );
}
