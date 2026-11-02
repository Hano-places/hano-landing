import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { termsOfService } from "@/content/legal";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "Terms of Use (EULA)",
  description: `Terms of Use and end-user licence agreement for the ${site.name} app and website.`,
});

export default function TermsPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={termsOfService} />
    </SeoPageShell>
  );
}
