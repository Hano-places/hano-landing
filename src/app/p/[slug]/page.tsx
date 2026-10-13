import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return shareMetadata(await getSharePreview("place", slug), `/p/${slug}`);
}

export default async function SharedPlacePage({ params }: Props) {
  const { slug } = await params;
  return <SharedItemPage preview={await getSharePreview("place", slug)} path={`/p/${slug}`} />;
}
