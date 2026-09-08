import Image from "next/image";
import { AndroidIcon, AppleIcon, ArrowIcon } from "./icons";
import { InterventionScreen, InsightsScreen, PhoneFrame } from "./phone";
import { site, storeLive } from "@/lib/site";

const STATS = [
  { value: "1 tap", label: "to answer" },
  { value: "9", label: "app categories" },
  { value: "0", label: "data sent to label a purchase" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Neon halo behind the headline — the same accent wash the app uses
          behind its stat tiles, scaled up to page size. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, var(--glow) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface/70 px-3 py-1.5 text-[12px] font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse" />
            </span>
            iOS Screen Time &amp; Android — built by {site.maker}
          </span>

          <h1 className="mt-6 text-[42px] leading-[1.08] font-bold tracking-[-0.04em] text-balance text-ink sm:leading-[1.03] sm:text-[58px]">
            The pause between{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-accent">wanting it</span>
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-0.5 left-0 h-2 w-full text-pulse/45 sm:-bottom-1.5 sm:h-2.5"
              >
                <path
                  d="M2 8.5c60-5 100-5 148-2.5S250 8 298 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            and buying it.
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            {site.tagline} SlowPulse raises one honest question the moment you
            open a guarded app — then shows you the money and the hours you kept.
          </p>

          <div id="get" className="mt-8 flex flex-wrap items-center gap-3 scroll-mt-24">
            {storeLive ? (
              <>
                {site.appStoreUrl && <AppStoreBadge href={site.appStoreUrl} />}
                {site.playStoreUrl && (
                  <StoreButton href={site.playStoreUrl} icon={<AndroidIcon className="h-5 w-5" />} sub="Get it on" name="Google Play" />
                )}
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-[14px] border-[1.4px] border-accent/55 px-6 py-3.5 text-[15px] font-semibold text-accent transition-colors hover:bg-[var(--glow)]"
                >
                  How the pause works
                </a>
              </>
            ) : (
              <>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-[14px] bg-pulse px-6 py-3.5 text-[15px] font-bold text-[var(--on-pulse)] transition-transform hover:-translate-y-0.5"
                >
                  See what it does
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-[14px] border-[1.4px] border-accent/55 px-6 py-3.5 text-[15px] font-semibold text-accent transition-colors hover:bg-[var(--glow)]"
                >
                  How the pause works
                </a>
              </>
            )}
          </div>

          <p className="mt-4 flex items-center gap-2 text-[12.5px] text-muted">
            <AppleIcon className="h-3.5 w-3.5" />
            <AndroidIcon className="h-3.5 w-3.5" />
            {storeLive
              ? "Free to start. One guarded app on the free plan."
              : "Coming to iOS and Android. Free to start — one guarded app, no account required."}
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-outline pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[22px] font-bold tracking-[-0.03em] text-ink">
                  {stat.value}
                </dd>
                <dd className="mt-0.5 text-[12px] leading-snug text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, var(--glow) 0%, transparent 70%)",
            }}
          />
          <div className="relative flex items-end">
            <PhoneFrame className="hidden translate-y-8 scale-[0.82] opacity-90 lg:block">
              <InsightsScreen />
            </PhoneFrame>
            <PhoneFrame className="-ml-0 lg:-ml-32 lg:z-10">
              <InterventionScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Apple's supplied badge, which its marketing guidelines require us to use
 *  unaltered. Two files rather than one recolored by CSS: the black badge is
 *  only legible on the light theme, the white one only on the dark theme, and
 *  the paths are Apple's artwork either way. */
function AppStoreBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block transition-transform hover:-translate-y-0.5"
    >
      <Image
        src="/app-store-badge.svg"
        alt="Download SlowPulse on the App Store"
        width={144}
        height={48}
        priority
        className="h-12 w-auto dark:hidden"
      />
      <Image
        src="/app-store-badge-dark.svg"
        alt=""
        aria-hidden
        width={144}
        height={48}
        priority
        className="hidden h-12 w-auto dark:block"
      />
    </a>
  );
}

function StoreButton({
  href,
  icon,
  sub,
  name,
  primary = false,
}: {
  href: string;
  icon: React.ReactNode;
  sub: string;
  name: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center gap-3 rounded-[14px] px-5 py-3 transition-transform hover:-translate-y-0.5",
        primary
          ? "bg-pulse text-[var(--on-pulse)]"
          : "border-[1.4px] border-outline bg-surface text-ink",
      ].join(" ")}
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] opacity-75">{sub}</span>
        <span className="block text-[15px] font-bold">{name}</span>
      </span>
    </a>
  );
}
