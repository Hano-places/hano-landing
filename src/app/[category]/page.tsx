import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getPlacesByCategorySegment } from "@/lib/places-data";
import {
  buildBreadcrumbSchema,
  buildCategoryMetadata,
  buildItemListSchema,
} from "@/lib/seo";
import {
  CATEGORY_SEGMENTS,
  categoryCityPath,
  categorySegmentLabel,
  isCategorySegment,
} from "@/lib/places-slug";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return CATEGORY_SEGMENTS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySegment(category)) {
    return {};
  }
  return buildCategoryMetadata(category);
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category } = await params;
  if (!isCategorySegment(category)) {
    notFound();
  }

  const places = (await getPlacesByCategorySegment(category)).sort(
    (a, b) => b.rating - a.rating,
  );
  const label = categorySegmentLabel(category);

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          buildItemListSchema(places, `Best ${label} in Kigali`, `/${category}`),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: label, path: `/${category}` },
          ]),
        ]}
      />
      <HubPage
        eyebrow="Categories"
        title={`Best ${label} in Kigali`}
        description={`Browse curated ${label.toLowerCase()} across Kigali with ratings, opening hours, neighborhoods, and official links.`}
        places={places}
        links={[
          { href: categoryCityPath(category, "kigali"), label: `${label} in Kigali` },
          { href: `/best/${category}/kigali`, label: `Top rated ${label.toLowerCase()}` },
        ]}
      />
    </SeoPageShell>
  );
}
