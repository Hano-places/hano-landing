import type { Metadata } from "next";
import { DownloadWaitlistContent } from "@/components/download/download-waitlist-content";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/download",
  title: "Download the Hano App",
  description: `Get notified when ${site.name} launches on iOS and Android. Join the waitlist to discover restaurants, cafés, and places across Rwanda.`,
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
      <DownloadWaitlistContent />
    </SeoPageShell>
  );
}
