import type { WeeklyHours } from "@/lib/place-hours";

export type PlaceType =
  | "restaurant"
  | "cafe"
  | "bar"
  | "lounge"
  | "bistro"
  | "fine-dining"
  | "bakery";

export type PlaceFilter = "all" | PlaceType;

export type PlaceAddress = {
  street: string;
  locality: string;
  region: string;
  country: string;
};

export type PlaceGeo = {
  lat: number;
  lng: number;
};

export type PlaceReview = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

export type PlaceMediaAttribution = {
  displayName: string;
  uri?: string;
  photoUri?: string;
};

export type PlaceGalleryImage = {
  src: string;
  alt?: string;
  source: "google" | "official" | "partner";
  authorAttributions?: readonly PlaceMediaAttribution[];
  googleMapsUri?: string;
};

export type PlaceVideo = {
  type: "youtube" | "file";
  src: string;
  title?: string;
  poster?: string;
  source: "official" | "youtube" | "partner";
};

export type PlaceMenuItem = {
  name: string;
  description?: string;
  price?: string;
  image?: string;
};

export type PlaceMenuSection = {
  name: string;
  items: readonly PlaceMenuItem[];
};

export type PlaceFAQ = {
  question: string;
  answer: string;
};

export type PlaceBase = {
  id: string;
  name: string;
  category: string;
  type: PlaceType;
  location: string;
  rating: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  description: string;
  /** Hero image path under /public */
  image: string;
  website?: string;
  tags: readonly string[];
  hours: WeeklyHours;
  featured?: boolean;
};

export type PlaceSeed = PlaceBase & {
  slug?: string;
  address?: Partial<PlaceAddress>;
  geo?: Partial<PlaceGeo>;
  phone?: string;
  reviews?: readonly PlaceReview[];
  menu?: readonly PlaceMenuSection[];
  menuUrl?: string;
  faqs?: readonly PlaceFAQ[];
  gallery?: readonly PlaceGalleryImage[];
  videos?: readonly PlaceVideo[];
  googlePlaceId?: string;
  sameAs?: readonly string[];
  updatedAt?: string;
};

export type Place = PlaceBase & {
  slug: string;
  address: PlaceAddress;
  geo: PlaceGeo;
  phone?: string;
  reviews: readonly PlaceReview[];
  menu: readonly PlaceMenuSection[];
  menuUrl?: string;
  faqs: readonly PlaceFAQ[];
  gallery: readonly PlaceGalleryImage[];
  videos: readonly PlaceVideo[];
  googlePlaceId?: string;
  sameAs: readonly string[];
  updatedAt: string;
};

export function gallerySrcs(gallery: readonly PlaceGalleryImage[]): string[] {
  return gallery.map((item) => item.src);
}

export function placeHeroSrc(place: Pick<PlaceBase, "image"> & { gallery?: readonly PlaceGalleryImage[] }): string {
  return place.gallery?.[0]?.src ?? place.image;
}
