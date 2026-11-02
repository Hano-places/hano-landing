import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { businessTerms } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/business-terms",
  title: "Business Terms",
  description: "Terms for businesses that claim or register a page on Hano.",
});

export default function Page() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={businessTerms} />
    </SeoPageShell>
  );
}
