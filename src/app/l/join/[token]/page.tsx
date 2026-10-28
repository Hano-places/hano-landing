import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ token: string }> };

// Built on the first visit, then served from Vercel's edge and refreshed every few minutes:
// WhatsApp, iMessage and others get the preview at once instead of waiting for a fresh render.
export const revalidate = 300;
export const generateStaticParams = async () => [];

/** An invite to plan a list together: the preview names the list; the app joins it. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  return shareMetadata(await getSharePreview("invite", token), `/l/join/${token}`);
}

export default async function ListInvitePage({ params }: Props) {
  const { token } = await params;
  return <SharedItemPage preview={await getSharePreview("invite", token)} path={`/l/join/${token}`} />;
}
