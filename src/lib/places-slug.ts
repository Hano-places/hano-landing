import type { PlaceType } from "@/content/places";

export const CATEGORY_SEGMENTS = [
  "restaurants",
  "cafes",
  "bars",
  "lounges",
  "bakeries",
  "bistros",
  "hotels",
] as const;

export type CategorySegment = (typeof CATEGORY_SEGMENTS)[number];

export const CITY_SLUGS = ["kigali", "musanze", "rubavu", "huye"] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];

export const NEIGHBORHOOD_SLUGS = [
  "kiyovu",
  "kibagabaga",
  "gishushu",
  "nyarutarama",
  "city-centre",
  "kimihurura",
  "kacyiru",
  "kigali",
] as const;

export type NeighborhoodSlug = (typeof NEIGHBORHOOD_SLUGS)[number];

const NEIGHBORHOOD_LABELS: Record<NeighborhoodSlug, string> = {
  kiyovu: "Kiyovu",
  kibagabaga: "Kibagabaga",
  gishushu: "Gishushu",
  nyarutarama: "Nyarutarama",
  "city-centre": "City Centre",
  kimihurura: "Kimihurura",
  kacyiru: "Kacyiru",
  kigali: "Kigali",
};

const LOCATION_TO_SLUG: Record<string, NeighborhoodSlug> = {
  Kiyovu: "kiyovu",
  Kibagabaga: "kibagabaga",
  Gishushu: "gishushu",
  Nyarutarama: "nyarutarama",
  "City Centre": "city-centre",
  Kimihurura: "kimihurura",
  Kacyiru: "kacyiru",
  Kigali: "kigali",
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function placeCategorySegment(type: PlaceType): CategorySegment {
  switch (type) {
    case "restaurant":
    case "fine-dining":
      return "restaurants";
    case "cafe":
      return "cafes";
    case "bar":
      return "bars";
    case "lounge":
      return "lounges";
    case "bakery":
      return "bakeries";
    case "bistro":
      return "bistros";
    default:
      return "restaurants";
  }
}

export function categorySegmentLabel(segment: CategorySegment): string {
  switch (segment) {
    case "restaurants":
      return "Restaurants";
    case "cafes":
      return "Cafés";
    case "bars":
      return "Bars";
    case "lounges":
      return "Lounges";
    case "bakeries":
      return "Bakeries";
    case "bistros":
      return "Bistros";
    case "hotels":
      return "Hotels";
    default:
      return "Places";
  }
}

export function categorySegmentSingular(segment: CategorySegment): string {
  switch (segment) {
    case "restaurants":
      return "Restaurant";
    case "cafes":
      return "Café";
    case "bars":
      return "Bar";
    case "lounges":
      return "Lounge";
    case "bakeries":
      return "Bakery";
    case "bistros":
      return "Bistro";
    case "hotels":
      return "Hotel";
    default:
      return "Place";
  }
}

export function isCategorySegment(value: string): value is CategorySegment {
  return (CATEGORY_SEGMENTS as readonly string[]).includes(value);
}

export function isCitySlug(value: string): value is CitySlug {
  return (CITY_SLUGS as readonly string[]).includes(value);
}

export function isNeighborhoodSlug(value: string): value is NeighborhoodSlug {
  return (NEIGHBORHOOD_SLUGS as readonly string[]).includes(value);
}

export function neighborhoodSlugFromLocation(location: string): NeighborhoodSlug | null {
  return LOCATION_TO_SLUG[location] ?? null;
}

export function neighborhoodLabel(slug: NeighborhoodSlug): string {
  return NEIGHBORHOOD_LABELS[slug];
}

export function getPlaceSlug(id: string): string {
  return `${id}-kigali`;
}

export function placePath(category: CategorySegment, slug: string): string {
  return `/${category}/${slug}`;
}

export function placeUrlFromParts(type: PlaceType, slug: string): string {
  return placePath(placeCategorySegment(type), slug);
}

export function categoryCityPath(segment: CategorySegment, city: CitySlug): string {
  return `/${segment}/${city}`;
}

export function categoryNeighborhoodPath(
  segment: CategorySegment,
  neighborhood: NeighborhoodSlug,
): string {
  return `/${segment}/${neighborhood}`;
}

export function dishRankingPath(dish: string, city: CitySlug): string {
  return `/dishes/${slugify(dish)}/${city}`;
}

export function bestOfPath(segment: CategorySegment, city: CitySlug): string {
  return `/best/${segment}/${city}`;
}

export const DISH_TAGS = [
  "burger",
  "pizza",
  "coffee",
  "brunch",
  "rooftop",
  "cocktails",
] as const;

export type DishTag = (typeof DISH_TAGS)[number];

export function isDishTag(value: string): value is DishTag {
  return (DISH_TAGS as readonly string[]).includes(value);
}

export function dishLabel(tag: DishTag): string {
  switch (tag) {
    case "burger":
      return "Burgers";
    case "pizza":
      return "Pizza";
    case "coffee":
      return "Coffee";
    case "brunch":
      return "Brunch";
    case "rooftop":
      return "Rooftop Restaurants";
    case "cocktails":
      return "Cocktails";
    default:
      return tag;
  }
}
