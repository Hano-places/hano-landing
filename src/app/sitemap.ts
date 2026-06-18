import type { MetadataRoute } from "next";
import { site } from "@/content/landing";
import { getSitemapEntries } from "@/lib/places-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
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
