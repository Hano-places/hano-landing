import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { FeaturedRestaurantsSection } from "@/components/sections/featured-restaurants";
import { EarlyAccessSection } from "@/components/sections/early-access-section";
import {
  BusinessV2,
  FeaturesV2,
  FinalV2,
  HeroV2,
  StripV2,
  WebVsAppV2,
} from "@/components/v2/home-v2";
import { JsonLd } from "@/components/seo/json-ld";
import { faq } from "@/content/landing";
import {
  buildFAQSchema,
  buildOrganizationSchema,
  buildSiteNavigationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationSchema(),
          buildWebSiteSchema(),
          buildSiteNavigationSchema(),
          buildFAQSchema(faq.items),
        ]}
      />
      <Header />
      <MainWrapper>
        <HeroV2 />
        <main>
          <StripV2 />
          <FeaturesV2 />
          <WebVsAppV2 />
          <FeaturedRestaurantsSection />
          <BusinessV2 />
          <EarlyAccessSection />
          <FinalV2 />
        </main>
        <Footer />
      </MainWrapper>
      <AppDownloadFab />
    </>
  );
}
