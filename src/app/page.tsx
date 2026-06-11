import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FeaturedRestaurantsSection } from "@/components/sections/featured-restaurants";
import { CategoryMarqueeSection } from "@/components/sections/category-marquee";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CommunitySection } from "@/components/sections/community-section";
import { ComingSoonSection } from "@/components/sections/coming-soon-section";
import { EarlyAccessSection } from "@/components/sections/early-access-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <MainWrapper>
        <HeroSection />
        <main>
          <ProblemSection />
          <SolutionSection />
          <FeaturedRestaurantsSection />
          <CategoryMarqueeSection />
          <TestimonialsSection />
          <HowItWorksSection />
          <CommunitySection />
          <ComingSoonSection />
          <EarlyAccessSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </MainWrapper>
      <AppDownloadFab />
    </>
  );
}
