import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return shareMetadata(await getSharePreview("user", username), `/u/${username}`);
}

export default async function SharedUserPage({ params }: Props) {
  const { username } = await params;
  return <SharedItemPage preview={await getSharePreview("user", username)} path={`/u/${username}`} />;
}
