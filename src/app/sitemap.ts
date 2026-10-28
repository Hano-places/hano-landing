import type { MetadataRoute } from "next";
import { site } from "@/content/landing";
import { listPlaces } from "@/lib/hano-places";
import { getSitemapEntries } from "@/lib/places-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, appPlaces] = await Promise.all([getSitemapEntries(), listPlaces()]);
  // Every place in the app has its own page at /p/<slug>.
  entries.push(...appPlaces.map((place) => ({ path: `/p/${place.slug}`, lastModified: new Date(), priority: 0.6 })));
  const seen = new Set<string>();

  return entries
    .filter((entry) => {
      if (seen.has(entry.path)) {
        return false;
      }
      seen.add(entry.path);
      return true;
    })
    .map((entry) => ({
      url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: "weekly" as const,
      priority: entry.priority,
    }));
}
export const revalidate = 3600;
