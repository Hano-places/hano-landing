import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getPlacesByCategorySegment } from "@/lib/places-data";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import {
  CATEGORY_SEGMENTS,
  categorySegmentLabel,
  isCategorySegment,
  isCitySlug,
} from "@/lib/places-slug";

type PageProps = {
  params: Promise<{ category: string; city: string }>;
};

export async function generateStaticParams() {
  return CATEGORY_SEGMENTS.flatMap((category) => [{ category, city: "kigali" }]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, city } = await params;
  if (!isCategorySegment(category) || !isCitySlug(city)) {
    return {};
  }

  const label = categorySegmentLabel(category);
  return buildPageMetadata({
    path: `/best/${category}/${city}`,
    title: `Top Rated ${label} in Kigali`,
    description: `See the top rated ${label.toLowerCase()} in Kigali ranked by community ratings, quality, and popularity on Hano.`,
  });
}

export default async function BestCategoryCityPage({ params }: PageProps) {
  const { category, city } = await params;
  if (!isCategorySegment(category) || !isCitySlug(city)) {
    notFound();
  }

  const label = categorySegmentLabel(category);
  const places = (await getPlacesByCategorySegment(category))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
  const path = `/best/${category}/${city}`;

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          buildItemListSchema(places, `Top rated ${label} in Kigali`, path),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: label, path: `/${category}` },
            { name: `Top rated in Kigali`, path },
          ]),
          buildFAQSchema([
            {
              question: `What are the top rated ${label.toLowerCase()} in Kigali?`,
              answer: `Hano ranks ${label.toLowerCase()} in Kigali by community ratings and curation. Current leaders include ${places
                .slice(0, 3)
                .map((place) => place.name)
                .join(", ")}.`,
            },
          ]),
        ]}
      />
      <HubPage
        eyebrow="Rankings"
        title={`Top rated ${label} in Kigali`}
        description={`A ranked list of the highest-rated ${label.toLowerCase()} in Kigali — updated from Hano's curated directory.`}
        places={places}
        links={[
          { href: `/${category}/kigali`, label: `All ${label.toLowerCase()} in Kigali` },
          { href: `/${category}`, label: `Browse ${label.toLowerCase()}` },
        ]}
      />
    </SeoPageShell>
  );
}
