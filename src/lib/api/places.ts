import type { PlaceSeed } from "@/content/places";
import { enrichPlace } from "@/lib/places-data";
import { PLACES_TAG } from "@/lib/places-data";

/**
 * Backend API client — not active yet.
 *
 * The site uses static data from `src/content/places.ts` until both env vars are set:
 *   HANO_API_ENABLED=true
 *   HANO_API_URL=https://your-api.example.com
 *
 * Do not enable until the places API is deployed and stable.
 */

function isPlacesApiEnabled(): boolean {
  return (
    process.env.HANO_API_ENABLED === "true" &&
    Boolean(process.env.HANO_API_URL?.trim())
  );
}

function getApiUrl(): string | undefined {
  return process.env.HANO_API_URL?.replace(/\/$/, "");
}

function getFetchOptions(): RequestInit {
  return {
    next: {
      revalidate: 3600,
      tags: [PLACES_TAG],
    },
  };
}

type ApiPlace = PlaceSeed;

export async function fetchPlacesFromApi(): Promise<PlaceSeed[]> {
  if (!isPlacesApiEnabled()) {
    return [];
  }

  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}/places`, getFetchOptions());
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as ApiPlace[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchPlaceBySlugFromApi(
  category: string,
  slug: string,
): Promise<PlaceSeed | null> {
  if (!isPlacesApiEnabled()) {
    return null;
  }

  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiUrl}/places/${category}/${slug}`,
      getFetchOptions(),
    );
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ApiPlace;
    return data ?? null;
  } catch {
    return null;
  }
}

export async function fetchPlaceBySlug(category: string, slug: string) {
  const seed = await fetchPlaceBySlugFromApi(category, slug);
  return seed ? enrichPlace(seed) : null;
}
