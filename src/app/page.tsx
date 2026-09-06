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
