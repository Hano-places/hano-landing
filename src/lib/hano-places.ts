/**
 * Place pages on the web (hano.now/p/<slug> and a claimed place's own address, slug.hano.now)
 * read everything from the Hano API, the same data the app shows.
 */

const API = (process.env.HANO_API_URL ?? "https://api.hano.now").replace(/\/$/, "");
const REVALIDATE = 120;

export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  priceFrom?: boolean;
  photo?: string;
  tags?: string[];
  available: boolean;
};

export type MenuSection = { id: string; name: string; emoji?: string; description?: string; items: MenuItem[] };

export type Place = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  neighborhood: string;
  city: string;
  address: string;
  location: { latitude: number; longitude: number };
  description: string;
  photos: string[];
  logo?: string;
  site?: string;
  tags: string[];
  hours?: Record<WeekDay, string>;
  contacts?: { phone?: string; email?: string; whatsapp?: string; website?: string; instagram?: string; facebook?: string; tiktok?: string };
  menu?: { sections: MenuSection[] };
  priceLevel?: 1 | 2 | 3 | 4;
  claimStatus?: "unclaimed" | "pending" | "claimed";
  verified?: boolean;
};

export type Promo = {
  id: string;
  placeId: string;
  kind: string;
  title: string;
  description?: string;
  offer?: string;
  photo?: string;
  /** Menu items the offer features. */
  itemIds?: string[];
  startsAt: string;
  endsAt?: string;
  endedAt?: string;
  terms?: string;
};

export type Review = { id: string; stars: number; text?: string; author: string; at: string };

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/v1${path}`, { next: { revalidate: REVALIDATE } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export const getPlace = (slug: string) => get<Place>(`/places/${encodeURIComponent(slug)}`);

/** Every place in the app, for the sitemap and the full list on /places. */
export async function listPlaces(): Promise<Place[]> {
  const res = await get<{ places: Place[] }>("/places?limit=2000");
  return res?.places ?? [];
}

/** Offers running now at this place (scheduled and ended ones are left out). */
export async function getPlacePromos(place: Place): Promise<Promo[]> {
  const res = await get<Promo[] | { promos: Promo[] }>(`/promos?city=${encodeURIComponent(place.city.toLowerCase())}`);
  const all = Array.isArray(res) ? res : (res?.promos ?? []);
  const now = Date.now();
  return all.filter(
    (p) => p.placeId === place.id && !p.endedAt && Date.parse(p.startsAt) <= now && (!p.endsAt || Date.parse(p.endsAt) > now),
  );
}

type Activity = {
  ratings: { id: string; userId: string; stars: number; text?: string; updatedAt: string }[];
  users: { id: string; displayName?: string; username?: string }[];
};

/** The average rating, how many people rated, and a few recent reviews with words. */
export async function getPlaceReviews(place: Place) {
  const res = await get<Activity>(`/places/${place.id}/activity`);
  const ratings = res?.ratings ?? [];
  const names = new Map((res?.users ?? []).map((u) => [u.id, (u.displayName || u.username || "").split(" ")[0]]));
  const average = ratings.length ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length : 0;
  const reviews: Review[] = ratings
    .filter((r) => r.text?.trim())
    .slice(0, 3)
    .map((r) => ({ id: r.id, stars: r.stars, text: r.text, author: names.get(r.userId) || "A Hano explorer", at: r.updatedAt }));
  return { average, count: ratings.length, reviews };
}

/* ─── Opening hours (Kigali time) ──────────────────────────────────────── */

export const WEEK: WeekDay[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** "8 AM", "10:30 PM", "22:00" → minutes after midnight. */
function toMinutes(t: string): number | null {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!m) return null;
  let h = Number(m[1]) % 24;
  const min = Number(m[2] ?? 0);
  const ap = m[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

/** Today in Kigali (UTC+2, no daylight saving) and whether the place is open now. */
export function openStatus(hours: Place["hours"], now = new Date()) {
  const kigali = new Date(now.getTime() + 2 * 3_600_000);
  const today = WEEK[(kigali.getUTCDay() + 6) % 7];
  const minutes = kigali.getUTCHours() * 60 + kigali.getUTCMinutes();
  const text = hours?.[today]?.trim();
  if (!text) return { today, open: null as boolean | null, label: "" };
  if (/closed/i.test(text)) return { today, open: false, label: "Closed today" };
  if (/24\s*h|24 hours/i.test(text)) return { today, open: true, label: "Open 24 hours" };
  const [a, b] = text.split(/\s*[–-]\s*/);
  const from = a ? toMinutes(a) : null;
  let to = b ? toMinutes(b) : null;
  if (from === null || to === null) return { today, open: null, label: text };
  if (to <= from) to += 24 * 60;
  const m = minutes < from && to > 24 * 60 ? minutes + 24 * 60 : minutes;
  const open = m >= from && m < to;
  return { today, open, label: open ? `Open now · until ${b.trim()}` : `Closed now · opens ${a.trim()}` };
}

export const money = (rwf: number) => `RWF ${rwf.toLocaleString("en-US")}`;
