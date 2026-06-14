import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getPlacesByTag } from "@/lib/places-data";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import { CITY_SLUGS, isCitySlug } from "@/lib/places-slug";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  if (!isCitySlug(city)) {
    return {};
  }

  return buildPageMetadata({
    path: `/best/rooftop-restaurants/${city}`,
    title: "Best Rooftop Restaurants in Kigali",
    description:
      "Discover the best rooftop restaurants in Kigali with skyline views, cocktails, and top-rated dining on Hano.",
  });
}

export default async function BestRooftopRestaurantsPage({ params }: PageProps) {
  const { city } = await params;
  if (!isCitySlug(city)) {
    notFound();
  }

  const places = (await getPlacesByTag("rooftop"))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
  const path = `/best/rooftop-restaurants/${city}`;

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          buildItemListSchema(places, "Best rooftop restaurants in Kigali", path),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Best rooftop restaurants in Kigali", path },
          ]),
          buildFAQSchema([
            {
              question: "What are the best rooftop restaurants in Kigali?",
              answer:
                "Kigali's best rooftop restaurants combine skyline views with strong food and drinks. Hano highlights top-rated rooftops across neighborhoods like Kiyovu and Nyarutarama.",
            },
          ]),
        ]}
      />
      <HubPage
        eyebrow="Rankings"
        title="Best rooftop restaurants in Kigali"
        description="Sunset views, cocktails, and elevated dining — the top rooftop restaurants in Kigali ranked on Hano."
        places={places}
        links={[
          { href: "/restaurants/kigali", label: "All restaurants in Kigali" },
          { href: "/kigali", label: "Explore Kigali" },
        ]}
      />
    </SeoPageShell>
  );
}
