import type { MetadataRoute } from "next";
import { site } from "@/content/landing";
import { guides } from "@/content/guides";
import { getPlaces } from "@/lib/places-data";
import { placeUrlFromParts } from "@/lib/places-slug";
import { getHubSitemapPaths, getSitemapIds, getStaticSitemapPaths } from "@/lib/sitemap-paths";

export async function generateSitemaps() {
  return getSitemapIds();
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  if (id === "static") {
    return getStaticSitemapPaths().map((entry) => ({
      url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: "weekly",
      priority: entry.priority,
    }));
  }

  if (id === "businesses") {
    const places = await getPlaces();
    return places.map((place) => ({
      url: `${site.url}${placeUrlFromParts(place.type, place.slug)}`,
      lastModified: new Date(place.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  if (id === "categories") {
    const hubPaths = getHubSitemapPaths().filter(
      (entry) =>
        entry.path.startsWith("/best/") ||
        entry.path.startsWith("/dishes/") ||
        /^\/(restaurants|cafes|bars|lounges|bakeries|bistros)$/.test(entry.path),
    );

    return hubPaths.map((entry) => ({
      url: `${site.url}${entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: "weekly",
      priority: entry.priority,
    }));
  }

  if (id === "locations") {
    const hubPaths = getHubSitemapPaths().filter(
      (entry) =>
        entry.path.includes("/kigali") ||
        entry.path.includes("/kiyovu") ||
        entry.path.includes("/kimihurura") ||
        entry.path.includes("/kacyiru") ||
        entry.path.includes("/nyarutarama") ||
        entry.path.includes("/gishushu") ||
        entry.path.includes("/kibagabaga") ||
        entry.path.includes("/city-centre") ||
        entry.path === "/kigali" ||
        entry.path.includes("/best/rooftop"),
    );

    const locationPaths = [
      ...hubPaths,
      ...getStaticSitemapPaths().filter((entry) => entry.path === "/kigali"),
    ];

    return locationPaths.map((entry) => ({
      url: `${site.url}${entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: "weekly",
      priority: entry.priority,
    }));
  }

  if (id === "blog") {
    return guides.map((guide) => ({
      url: `${site.url}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  }

  return [];
}
