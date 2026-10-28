import type { Metadata } from "next";
import { PlacePage } from "@/components/place/place-page";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getPlace, getPlacePromos, getPlaceReviews } from "@/lib/hano-places";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ slug: string }> };

// Built on the first visit, then served from Vercel's edge and refreshed every few minutes:
// WhatsApp, iMessage and others get the preview at once instead of waiting for a fresh render.
export const revalidate = 300;
export const generateStaticParams = async () => [];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return shareMetadata(await getSharePreview("place", slug), `/p/${slug}`);
}

/** A place's page: the full place from the API (offers, menu, hours…); the plain card if it can't load. */
export default async function SharedPlacePage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) return <SharedItemPage preview={await getSharePreview("place", slug)} path={`/p/${slug}`} />;
  const [promos, rating] = await Promise.all([getPlacePromos(place), getPlaceReviews(place)]);
  return <PlacePage place={place} promos={promos} rating={rating} />;
}
