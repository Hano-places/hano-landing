import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return shareMetadata(await getSharePreview("review", id), `/r/${id}`);
}

export default async function SharedReviewPage({ params }: Props) {
  const { id } = await params;
  return <SharedItemPage preview={await getSharePreview("review", id)} path={`/r/${id}`} />;
}
