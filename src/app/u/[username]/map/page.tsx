import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return shareMetadata(await getSharePreview("map", username), `/u/${username}/map`);
}

export default async function SharedMapPage({ params }: Props) {
  const { username } = await params;
  return <SharedItemPage preview={await getSharePreview("map", username)} path={`/u/${username}/map`} />;
}
