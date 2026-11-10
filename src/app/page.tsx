import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { FeaturedRestaurantsSection } from "@/components/sections/featured-restaurants";
import { EarlyAccessSection } from "@/components/sections/early-access-section";
import { Box, Boxes, BusinessV2, FinalV2, HeroV2, WebVsAppV2 } from "@/components/v2/home-v2";
import { StoryV2 } from "@/components/v2/story-v2";
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
        <Boxes>
          <HeroV2 />
          <main style={{ display: "contents" }}>
            <StoryV2 />
            <WebVsAppV2 />
            <Box>
              <FeaturedRestaurantsSection />
            </Box>
            <BusinessV2 />
            <Box>
              <EarlyAccessSection />
            </Box>
            <FinalV2 />
          </main>
        </Boxes>
        <Footer />
      </MainWrapper>
      <AppDownloadFab />
    </>
  );
}
