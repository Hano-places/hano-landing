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
import {
  CITY_SLUGS,
  DISH_TAGS,
  dishLabel,
  dishRankingPath,
  isCitySlug,
  isDishTag,
} from "@/lib/places-slug";

type PageProps = {
  params: Promise<{ dish: string; city: string }>;
};

export async function generateStaticParams() {
  return DISH_TAGS.flatMap((dish) =>
    CITY_SLUGS.map((city) => ({ dish, city })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dish, city } = await params;
  if (!isDishTag(dish) || !isCitySlug(city)) {
    return {};
  }

  const label = dishLabel(dish);
  return buildPageMetadata({
    path: dishRankingPath(dish, city),
    title: `Top Rated ${label} in Kigali`,
    description: `Find the top rated ${label.toLowerCase()} in Kigali — ranked by ratings and community favorites on Hano.`,
  });
}

export default async function DishRankingPage({ params }: PageProps) {
  const { dish, city } = await params;
  if (!isDishTag(dish) || !isCitySlug(city)) {
    notFound();
  }

  const label = dishLabel(dish);
  const places = (await getPlacesByTag(dish))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
  const path = dishRankingPath(dish, city);

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          buildItemListSchema(places, `Top rated ${label} in Kigali`, path),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `${label} in Kigali`, path },
          ]),
          buildFAQSchema([
            {
              question: `What is the best ${dish} in Kigali?`,
              answer: `Hano ranks places serving ${label.toLowerCase()} in Kigali by ratings and community feedback. Explore the list to compare top options.`,
            },
          ]),
        ]}
      />
      <HubPage
        eyebrow="Food rankings"
        title={`Top rated ${label.toLowerCase()} in Kigali`}
        description={`Compare the best places for ${label.toLowerCase()} in Kigali — with ratings, neighborhoods, and opening hours.`}
        places={places}
        links={[
          { href: "/restaurants/kigali", label: "Restaurants in Kigali" },
          { href: "/places", label: "All places" },
        ]}
      />
    </SeoPageShell>
  );
}
