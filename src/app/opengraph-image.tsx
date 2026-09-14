import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ShareCard, ogFonts } from "@/lib/og";
import { site, storeLive } from "@/lib/site";

/** The card every social network pulls for the home page.
 *
 *  Next turns this route into `og:image` (plus `og:image:alt`, `:type`,
 *  `:width` and `:height`) on every page that doesn't ship its own — which
 *  is what LinkedIn, Facebook and Slack were missing. Statically generated
 *  at build time, so crawlers get a plain cached PNG. */

export const alt = `${site.name} — the pause before the purchase`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <ShareCard
        eyebrow="An interruption, not a block"
        title="The pause before the purchase"
        description={site.tagline}
        footnote={storeLive ? "Download on the App Store" : undefined}
      />
    ),
    { ...size, fonts: await ogFonts() },
  );
}
