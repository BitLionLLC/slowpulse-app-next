import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import {
  Categories,
  ClosingCta,
  Faqs,
  Features,
  HowItWorks,
  Pricing,
  Privacy,
} from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Title, description and the share card are inherited from the root
 *  layout; the canonical URL is the one thing that has to be stated per
 *  route, and crawlers dedupe previews by it. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Categories />
        <Privacy />
        <Pricing />
        <Faqs />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
