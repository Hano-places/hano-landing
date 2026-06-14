import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: `Terms of service for using ${site.name}, the hospitality discovery platform for Kigali.`,
});

export default function TermsPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <article className={styles.article}>
        <h1>Terms of Service</h1>
        <p>Last updated: June 2026</p>
        <p>
          By using {site.name}, you agree to use the platform for lawful purposes and to
          provide accurate information when joining the waitlist or submitting content.
        </p>
        <p>
          Restaurant listings, ratings, and descriptions are provided for discovery purposes
          and may change. {site.name} does not guarantee availability, pricing, or service
          quality at listed businesses.
        </p>
        <p>
          Sponsored placements, if introduced, will always be clearly labeled. Contact{" "}
          {site.email} for questions about these terms.
        </p>
      </article>
    </SeoPageShell>
  );
}
