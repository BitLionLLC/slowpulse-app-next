import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ShareCard, ogFonts } from "@/lib/og";
import { site } from "@/lib/site";

/** `/apps` gets its own card — it's a different pitch, and a share of the
 *  catalog shouldn't come up titled "the pause before the purchase". */

export const alt = `Other apps by ${site.maker}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <ShareCard
        eyebrow={site.maker}
        title={`Other apps by ${site.maker}`}
        description={`The rest of what ${site.maker} makes — the apps, browser extensions and web tools that live alongside ${site.name}.`}
        footnote="Apps, extensions and web tools"
      />
    ),
    { ...size, fonts: await ogFonts() },
  );
}
