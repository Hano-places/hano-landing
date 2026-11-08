import type { Metadata } from "next";
import { DownloadContent } from "@/components/download/download-content";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/download",
  title: "Download the Hano App",
  description: `Download ${site.name} free on the App Store and Google Play. Discover restaurants, cafés, and places across Rwanda.`,
});

export default function DownloadPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Download", path: "/download" },
        ])}
      />
      <DownloadContent />
    </SeoPageShell>
  );
}
