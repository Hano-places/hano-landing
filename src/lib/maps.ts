import type { Place } from "@/content/places";

export function getMapSearchQuery(place: Place): string {
  return `${place.name}, ${place.address.street}, ${place.address.locality}, Rwanda`;
}

export function getDirectionsUrl(place: Place): string {
  const query = encodeURIComponent(getMapSearchQuery(place));
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export function getMapEmbedSearchUrl(place: Place): string {
  const query = encodeURIComponent(getMapSearchQuery(place));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getGoogleMapsApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return key?.trim() || undefined;
}
