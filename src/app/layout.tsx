import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — the pause before the purchase`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "impulse spending",
    "screen time",
    "doomscroll",
    "app blocker alternative",
    "mindful spending",
    "digital wellbeing",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — the pause before the purchase`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — the pause before the purchase`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  // Matches the two scaffold backgrounds so the mobile browser chrome
  // tracks whichever theme is showing.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The nav's section links are now root-relative ("/#how"), so they
      // scroll on a route transition rather than in-page. This tells Next
      // the smooth scroll in globals.css is deliberate.
      data-scroll-behavior="smooth"
      // The inline script below rewrites this before paint; the attribute is
      // only the server's best guess, so React shouldn't complain about it.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} flex min-h-full flex-col font-sans`}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
      {/* gtag.js, loaded after hydration. Production only, so `next dev`
          sessions don't land in the property's reports. */}
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={site.gaId} />}
    </html>
  );
}