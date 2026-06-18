import {
  CATEGORY_SEGMENTS,
  CITY_SLUGS,
  DISH_TAGS,
  NEIGHBORHOOD_SLUGS,
  bestOfPath,
  categoryCityPath,
  categoryNeighborhoodPath,
  categorySegmentLabel,
  dishRankingPath,
  type CategorySegment,
} from "@/lib/places-slug";

export function getStaticSitemapPaths(): {
  path: string;
  lastModified: Date;
  priority: number;
}[] {
  const now = new Date();
  return [
    { path: "/", lastModified: now, priority: 1 },
    { path: "/places", lastModified: now, priority: 0.9 },
    { path: "/kigali", lastModified: now, priority: 0.9 },
    { path: "/privacy", lastModified: now, priority: 0.3 },
    { path: "/terms", lastModified: now, priority: 0.3 },
    { path: "/cookies", lastModified: now, priority: 0.3 },
    { path: "/contact", lastModified: now, priority: 0.4 },
    { path: "/guides/ultimate-kigali-food-guide", lastModified: now, priority: 0.7 },
    { path: "/guides/best-date-night-restaurants-kigali", lastModified: now, priority: 0.7 },
    { path: "/guides/hidden-gems-kigali", lastModified: now, priority: 0.7 },
  ];
}

export function getHubSitemapPaths(): {
  path: string;
  lastModified: Date;
  priority: number;
}[] {
  const now = new Date();
  const paths: { path: string; lastModified: Date; priority: number }[] = [];

  for (const segment of CATEGORY_SEGMENTS) {
    paths.push({ path: `/${segment}`, lastModified: now, priority: 0.85 });

    for (const city of CITY_SLUGS) {
      paths.push({
        path: categoryCityPath(segment, city),
        lastModified: now,
        priority: 0.85,
      });
      paths.push({
        path: bestOfPath(segment, city),
        lastModified: now,
        priority: 0.75,
      });
    }

    for (const neighborhood of NEIGHBORHOOD_SLUGS) {
      if (neighborhood === "kigali") continue;
      paths.push({
        path: categoryNeighborhoodPath(segment, neighborhood),
        lastModified: now,
        priority: 0.7,
      });
    }
  }

  for (const dish of DISH_TAGS) {
    for (const city of CITY_SLUGS) {
      paths.push({
        path: dishRankingPath(dish, city),
        lastModified: now,
        priority: 0.7,
      });
    }
  }

  paths.push({
    path: "/best/rooftop-restaurants/kigali",
    lastModified: now,
    priority: 0.75,
  });

  return paths;
}

export function getSitemapIds() {
  return [
    { id: "static" },
    { id: "businesses" },
    { id: "categories" },
    { id: "locations" },
    { id: "blog" },
  ] as const;
}

export type SitemapId = ReturnType<typeof getSitemapIds>[number]["id"];

export function getCategoryHubLabels(): { segment: CategorySegment; label: string }[] {
  return CATEGORY_SEGMENTS.map((segment) => ({
    segment,
    label: categorySegmentLabel(segment),
  }));
}
