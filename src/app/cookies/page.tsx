import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { cookiePolicy } from "@/content/legal";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/cookies",
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies and similar technologies on our marketing website.`,
});

export default function CookiesPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <LegalDocument document={cookiePolicy} />
    </SeoPageShell>
  );
}
