import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
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

export default async function SharedPostPage({ params }: Props) {
  const { id } = await params;
  return <SharedItemPage preview={await getSharePreview("post", id)} path={`/post/${id}`} />;
}
