import type { Place, PlaceFilter } from "@/content/places";

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function filterPlaces(
  places: readonly Place[],
  query: string,
  filter: PlaceFilter,
): Place[] {
  const normalizedQuery = normalize(query);

  return places.filter((place) => {
    if (filter !== "all" && place.type !== filter) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = normalize(
      [
        place.name,
        place.category,
        place.location,
        place.description,
        ...place.tags,
      ].join(" "),
    );

    return haystack.includes(normalizedQuery);
  });
}
