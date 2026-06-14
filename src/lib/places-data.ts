import type { Place, PlaceSeed } from "@/content/places";
import { places as staticPlaces } from "@/content/places";
import {
  getPlaceSlug,
  neighborhoodSlugFromLocation,
  placeCategorySegment,
  placeUrlFromParts,
} from "@/lib/places-slug";
import { getHubSitemapPaths, getStaticSitemapPaths } from "@/lib/sitemap-paths";

/** Cache tag for future on-demand revalidation when the backend API is live. */
export const PLACES_TAG = "places";

const DEFAULT_CITY = "Kigali";
const DEFAULT_REGION = "Kigali City";
const DEFAULT_COUNTRY = "RW";

const NEIGHBORHOOD_GEO: Record<string, Place["geo"]> = {
  Kiyovu: { lat: -1.9575, lng: 30.062 },
  Kibagabaga: { lat: -1.9365, lng: 30.1125 },
  Gishushu: { lat: -1.9442, lng: 30.0915 },
  Nyarutarama: { lat: -1.9525, lng: 30.1045 },
  "City Centre": { lat: -1.9441, lng: 30.0619 },
  Kimihurura: { lat: -1.9368, lng: 30.0825 },
  Kacyiru: { lat: -1.9285, lng: 30.0725 },
  Kigali: { lat: -1.9403, lng: 30.0588 },
};

function defaultAddress(location: string): Place["address"] {
  return {
    street: location,
    locality: DEFAULT_CITY,
    region: DEFAULT_REGION,
    country: DEFAULT_COUNTRY,
  };
}

function defaultGeo(location: string): Place["geo"] {
  return NEIGHBORHOOD_GEO[location] ?? { lat: -1.9441, lng: 30.0619 };
}

function defaultFaqs(place: PlaceSeed): Place["faqs"] {
  if (place.faqs?.length) {
    return place.faqs;
  }

  return [
    {
      question: `What type of place is ${place.name}?`,
      answer: `${place.name} is a ${place.category.toLowerCase()} in ${place.location}, ${DEFAULT_CITY}.`,
    },
    {
      question: `What are the opening hours for ${place.name}?`,
      answer: `${place.name} hours vary by day. Check the full weekly schedule on Hano for the latest opening times.`,
    },
    {
      question: `Where is ${place.name} located?`,
      answer: `${place.name} is located in ${place.location}, ${DEFAULT_CITY}, Rwanda.`,
    },
  ];
}

function defaultReviews(place: PlaceSeed): Place["reviews"] {
  if (place.reviews?.length) {
    return place.reviews;
  }

  return [
    {
      author: "Hano community",
      rating: place.rating,
      text: `${place.name} is a popular ${place.type.replace("-", " ")} in ${place.location} with a ${place.rating} rating on Hano.`,
    },
  ];
}

export function enrichPlace(seed: PlaceSeed): Place {
  const slug = seed.slug ?? getPlaceSlug(seed.id);
  const address = { ...defaultAddress(seed.location), ...seed.address };
  const geo = { ...defaultGeo(seed.location), ...seed.geo };
  const sameAs = [
    ...(seed.website ? [seed.website] : []),
    ...(seed.sameAs ?? []),
  ];

  return {
    ...seed,
    slug,
    address,
    geo,
    phone: seed.phone,
    reviews: defaultReviews(seed),
    menu: seed.menu ?? [],
    faqs: defaultFaqs(seed),
    gallery: seed.gallery ?? [seed.image],
    sameAs,
    updatedAt: seed.updatedAt ?? "2026-01-01T00:00:00.000Z",
  };
}

const enrichedStaticPlaces = staticPlaces.map((place) => enrichPlace(place));

/**
 * All place data currently comes from static content in `src/content/places.ts`.
 * When the backend API is ready, wire it in here behind an explicit feature flag.
 */
export async function getPlaces(): Promise<Place[]> {
  return enrichedStaticPlaces;
}

export async function getPlaceBySlug(
  category: string,
  slug: string,
): Promise<Place | null> {
  const all = await getPlaces();
  return (
    all.find(
      (place) => place.slug === slug && placeCategorySegment(place.type) === category,
    ) ?? null
  );
}

export async function getPlacesByCategorySegment(category: string): Promise<Place[]> {
  const all = await getPlaces();
  return all.filter((place) => placeCategorySegment(place.type) === category);
}

export async function getPlacesByNeighborhood(neighborhood: string): Promise<Place[]> {
  const all = await getPlaces();
  const { neighborhoodLabel, isNeighborhoodSlug } = await import("@/lib/places-slug");

  const label = isNeighborhoodSlug(neighborhood)
    ? neighborhoodLabel(neighborhood)
    : neighborhood;

  return all.filter((place) => place.location === label);
}

export async function getPlacesByTag(tag: string): Promise<Place[]> {
  const all = await getPlaces();
  const normalized = tag.toLowerCase();
  return all.filter((place) =>
    place.tags.some((entry) => entry.toLowerCase().includes(normalized)),
  );
}

export async function getRelatedPlaces(place: Place, limit = 6): Promise<Place[]> {
  const all = await getPlaces();
  const neighborhood = neighborhoodSlugFromLocation(place.location);

  return all
    .filter((candidate) => candidate.id !== place.id)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.type === place.type) scoreA += 2;
      if (b.type === place.type) scoreB += 2;

      if (a.location === place.location) scoreA += 3;
      if (b.location === place.location) scoreB += 3;

      const sharedTagsA = a.tags.filter((tag) => place.tags.includes(tag)).length;
      const sharedTagsB = b.tags.filter((tag) => place.tags.includes(tag)).length;
      scoreA += sharedTagsA;
      scoreB += sharedTagsB;

      if (neighborhood && neighborhoodSlugFromLocation(a.location) === neighborhood) {
        scoreA += 1;
      }
      if (neighborhood && neighborhoodSlugFromLocation(b.location) === neighborhood) {
        scoreB += 1;
      }

      return scoreB - scoreA || b.rating - a.rating;
    })
    .slice(0, limit);
}

export async function getSitemapEntries(): Promise<
  { path: string; lastModified: Date; priority: number }[]
> {
  const all = await getPlaces();
  const staticPaths = getStaticSitemapPaths();
  const hubPaths = getHubSitemapPaths();
  const businessPaths = all.map((place) => ({
    path: placeUrlFromParts(place.type, place.slug),
    lastModified: new Date(place.updatedAt),
    priority: 0.8,
  }));

  return [...staticPaths, ...hubPaths, ...businessPaths];
}

export function getStaticPlaces(): Place[] {
  return enrichedStaticPlaces;
}
