import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { privacyPolicy } from "@/content/legal";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}, how we collect, use, and protect your information.`,
});

export default function PrivacyPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={privacyPolicy} />
    </SeoPageShell>
  );
}
