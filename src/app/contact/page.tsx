import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { contactPage } from "@/content/legal";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact Hano",
  description: `Get in touch with the ${site.name} team for partnerships, restaurant listings, and support.`,
});

export default function ContactPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={contactPage} />
    </SeoPageShell>
  );
}
