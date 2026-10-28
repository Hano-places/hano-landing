import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ username: string }> };

// Built on the first visit, then served from Vercel's edge and refreshed every few minutes:
// WhatsApp, iMessage and others get the preview at once instead of waiting for a fresh render.
export const revalidate = 300;
export const generateStaticParams = async () => [];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return shareMetadata(await getSharePreview("map", username), `/u/${username}/map`);
}

export default async function SharedMapPage({ params }: Props) {
  const { username } = await params;
  return <SharedItemPage preview={await getSharePreview("map", username)} path={`/u/${username}/map`} />;
}
