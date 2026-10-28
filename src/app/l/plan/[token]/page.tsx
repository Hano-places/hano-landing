import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ token: string }> };

// Built on the first visit, then served from Vercel's edge and refreshed every few minutes:
// WhatsApp, iMessage and others get the preview at once instead of waiting for a fresh render.
export const revalidate = 300;
export const generateStaticParams = async () => [];

/** An invite to plan a menu together: the preview shows the place and dishes; the app joins it. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  return shareMetadata(await getSharePreview("plan", token), `/l/plan/${token}`);
}

export default async function PlanInvitePage({ params }: Props) {
  const { token } = await params;
  return <SharedItemPage preview={await getSharePreview("plan", token)} path={`/l/plan/${token}`} />;
}
