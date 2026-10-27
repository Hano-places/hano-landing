import type { Metadata } from "next";
import { SharedItemPage } from "@/components/share/shared-item-page";
import { getSharePreview, shareMetadata } from "@/lib/hano-share";

type Props = { params: Promise<{ token: string }> };

/** An invite to plan a menu together: the preview shows the place and dishes; the app joins it. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  return shareMetadata(await getSharePreview("plan", token), `/l/plan/${token}`);
}

export default async function PlanInvitePage({ params }: Props) {
  const { token } = await params;
  return <SharedItemPage preview={await getSharePreview("plan", token)} path={`/l/plan/${token}`} />;
}
