import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { termsOfService } from "@/content/legal";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: `Terms of service for using ${site.name}, the hospitality discovery platform for Kigali.`,
});

export default function TermsPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={termsOfService} />
    </SeoPageShell>
  );
}
