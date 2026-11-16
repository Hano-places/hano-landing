import type { Metadata } from "next";
import { MomentsViewer } from "@/components/moments/moments";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getPlace, getPlaceMoments, getPostMoment } from "@/lib/hano-places";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ id: string }> };

// Built on the first visit, then served from Vercel's edge and refreshed every few minutes:
// WhatsApp, iMessage and others get the preview at once instead of waiting for a fresh render.
export const revalidate = 300;
export const generateStaticParams = async () => [];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return shareMetadata(await getSharePreview("post", id), `/post/${id}`);
}

/**
 * A shared post, on the web as in the app: full screen, and swiping up carries on through other
 * moments from the same place. Posts without photos (or that can't load) show the plain card.
 */
export default async function SharedPostPage({ params }: Props) {
  const { id } = await params;
  const found = await getPostMoment(id);
  const place = found?.placeId ? await getPlace(found.placeId) : null;
  if (!found || !found.moment.photos.length) return <SharedItemPage preview={await getSharePreview("post", id)} path={`/post/${id}`} />;
  const more = place ? (await getPlaceMoments(place)).filter((m) => m.id !== id).slice(0, 30) : [];
  return (
    <MomentsViewer
      asPage
      moments={[found.moment, ...more]}
      start={0}
      placeName={place?.name ?? "Hano"}
      appPath={place ? `p/${place.slug}` : `post/${id}`}
    />
  );
}
