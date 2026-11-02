import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { communityGuidelines } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/community-guidelines",
  title: "Community Guidelines",
  description: "How Hano keeps the community useful, kind and safe: zero tolerance for objectionable content, reporting and blocking.",
});

export default function Page() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={communityGuidelines} />
    </SeoPageShell>
  );
}
