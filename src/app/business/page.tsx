import type { Metadata } from "next";
import { BizFaq, BizFeatures, BizFinal, BizGrowth, BizHero, BizPromise, BizSteps, BizValues } from "@/components/business-v2/business-v2";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { Boxes } from "@/components/v2/home-v2";
import { bizFaqs } from "@/content/business-v2";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildFAQSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/business",
  title: "Hano for Business: Claim Your Restaurant, Café or Bar",
  description: `Claim your place on ${site.name} for free. Show Kigali your menu, photos and offers, reach everyone who saved you, and see who keeps coming back.`,
});

/** Landing page for businesses: why claim a place on Hano, what you get, and how to start. */
export default function BusinessPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Business", path: "/business" },
          ]),
          buildFAQSchema([...bizFaqs]),
        ]}
      />
      <MainWrapper>
        <Boxes>
          <Header boxed />
          <main style={{ display: "contents" }}>
            <BizHero />
            <BizValues />
            <BizFeatures />
            <BizGrowth />
            <BizSteps />
            <BizPromise />
            <BizFaq />
            <BizFinal />
          </main>
          <Footer boxed />
        </Boxes>
      </MainWrapper>
    </>
  );
}
