import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import {
  getPlacesByCategorySegment,
  getPlacesByNeighborhood,
  getPlaceBySlug,
  getRelatedPlaces,
} from "@/lib/places-data";
import { PlaceDetailPage } from "@/components/places/place-detail-page";
import {
  buildBreadcrumbSchema,
  buildBusinessMetadata,
  buildFAQSchema,
  buildItemListSchema,
  buildPageMetadata,
  buildRestaurantSchema,
} from "@/lib/seo";
import {
  CATEGORY_SEGMENTS,
  categoryCityPath,
  categorySegmentLabel,
  isCategorySegment,
  isCitySlug,
  isNeighborhoodSlug,
  neighborhoodLabel,
  placeCategorySegment,
} from "@/lib/places-slug";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const { getPlaces } = await import("@/lib/places-data");
  const places = await getPlaces();
  const params: { category: string; slug: string }[] = [];

  for (const segment of CATEGORY_SEGMENTS) {
    params.push({ category: segment, slug: "kigali" });
    params.push({ category: segment, slug: "musanze" });
    params.push({ category: segment, slug: "rubavu" });
    params.push({ category: segment, slug: "huye" });
  }

  for (const place of places) {
    params.push({
      category: placeCategorySegment(place.type),
      slug: place.slug,
    });
  }

  return params;
}

async function resolvePage(params: PageProps["params"]) {
  const { category, slug } = await params;

  if (!isCategorySegment(category)) {
    return null;
  }

  if (isCitySlug(slug)) {
    const places =
      slug === "kigali"
        ? (await getPlacesByCategorySegment(category)).sort(
            (a, b) => b.rating - a.rating,
          )
        : [];
    return {
      kind: "city" as const,
      category,
      slug,
      places,
    };
  }

  if (isNeighborhoodSlug(slug)) {
    const allInCategory = await getPlacesByCategorySegment(category);
    const label = neighborhoodLabel(slug);
    const places = allInCategory
      .filter((place) => place.location === label)
      .sort((a, b) => b.rating - a.rating);

    return {
      kind: "neighborhood" as const,
      category,
      slug,
      label,
      places,
    };
  }

  const place = await getPlaceBySlug(category, slug);
  if (!place) {
    return null;
  }

  const relatedPlaces = await getRelatedPlaces(place);
  return { kind: "entity" as const, category, place, relatedPlaces };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await resolvePage(params);
  if (!resolved) {
    return {};
  }

  if (resolved.kind === "entity") {
    return buildBusinessMetadata(resolved.place);
  }

  if (resolved.kind === "city") {
    const label = categorySegmentLabel(resolved.category);
    const cityName =
      resolved.slug.charAt(0).toUpperCase() + resolved.slug.slice(1);
    return buildPageMetadata({
      path: categoryCityPath(resolved.category, resolved.slug),
      title: `Best ${label} in ${cityName}, Rwanda`,
      description: `Discover the best ${label.toLowerCase()} in ${cityName}, Rwanda — ratings, hours, and curated recommendations on Hano.`,
    });
  }

  const label = categorySegmentLabel(resolved.category);
  return buildPageMetadata({
    path: `/${resolved.category}/${resolved.slug}`,
    title: `${label} in ${resolved.label} | Kigali`,
    description: `Find ${label.toLowerCase()} in ${resolved.label}, Kigali — browse ratings, opening hours, and local favorites on Hano.`,
  });
}

export default async function CategorySlugPage({ params }: PageProps) {
  const resolved = await resolvePage(params);
  if (!resolved) {
    notFound();
  }

  if (resolved.kind === "entity") {
    const { place, relatedPlaces, category } = resolved;
    const segment = placeCategorySegment(place.type);

    return (
      <SeoPageShell backHref={`/${segment}`} backLabel={`← All ${categorySegmentLabel(segment).toLowerCase()}`}>
        <JsonLd
          data={[
            buildRestaurantSchema(place),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: categorySegmentLabel(category), path: `/${category}` },
              { name: "Kigali", path: categoryCityPath(category, "kigali") },
              {
                name: place.name,
                path: `/${category}/${place.slug}`,
              },
            ]),
            buildFAQSchema(place.faqs),
          ]}
        />
        <PlaceDetailPage place={place} relatedPlaces={relatedPlaces} />
      </SeoPageShell>
    );
  }

  if (resolved.kind === "city") {
    const label = categorySegmentLabel(resolved.category);
    const path = categoryCityPath(resolved.category, resolved.slug);
    const cityName =
      resolved.slug.charAt(0).toUpperCase() + resolved.slug.slice(1);

    return (
      <SeoPageShell>
        <JsonLd
          data={[
            buildItemListSchema(
              resolved.places,
              `Best ${label} in ${cityName}`,
              path,
            ),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: label, path: `/${resolved.category}` },
              { name: cityName, path },
            ]),
          ]}
        />
        <HubPage
          eyebrow={cityName}
          title={`Best ${label} in ${cityName}`}
          description={
            resolved.places.length > 0
              ? `Explore top-rated ${label.toLowerCase()} across ${cityName} — from neighborhood favorites to hidden gems, with hours, ratings, and details on Hano.`
              : `Hano is expanding ${label.toLowerCase()} coverage in ${cityName}. Browse Kigali listings or list your business in ${cityName}.`
          }
          places={resolved.places}
          links={[
            { href: `/${resolved.category}`, label: `All ${label.toLowerCase()}` },
            { href: "/rwanda", label: "Explore Rwanda" },
            { href: "/kigali", label: "Explore Kigali" },
            { href: "/business", label: "List your business" },
            { href: "/download", label: "Download the app" },
          ]}
        />
      </SeoPageShell>
    );
  }

  const label = categorySegmentLabel(resolved.category);
  const path = `/${resolved.category}/${resolved.slug}`;

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          buildItemListSchema(
            resolved.places,
            `${label} in ${resolved.label}`,
            path,
          ),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: label, path: `/${resolved.category}` },
            { name: resolved.label, path },
          ]),
        ]}
      />
      <HubPage
        eyebrow={resolved.label}
        title={`${label} in ${resolved.label}`}
        description={`Discover ${label.toLowerCase()} in ${resolved.label}, one of Kigali's most popular neighborhoods for dining and going out.`}
        places={resolved.places}
        links={[
          {
            href: categoryCityPath(resolved.category, "kigali"),
            label: `${label} in Kigali`,
          },
        ]}
      />
    </SeoPageShell>
  );
}
