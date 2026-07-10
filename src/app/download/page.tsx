import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/download",
  title: "Download the Hano App",
  description: `Download ${site.name} on iOS and Android — discover restaurants, cafés, and places across Rwanda on the go.`,
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
      <article className={styles.article}>
        <h1>Download the Hano app</h1>
        <p>
          Take restaurant discovery with you. Browse curated places in Kigali and across
          Rwanda, check hours and ratings, and find your next meal faster.
        </p>
        <ul className={styles.list}>
          <li>
            <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
              Download on the App Store
            </a>
          </li>
          <li>
            <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer">
              Get it on Google Play
            </a>
          </li>
        </ul>
        <p>
          Prefer the web?{" "}
          <Link href="/places">Explore places</Link> or{" "}
          <Link href="/restaurants">browse restaurants</Link> now. Join the{" "}
          <Link href="/#early-access">early access waitlist</Link> for launch updates.
        </p>
      </article>
    </SeoPageShell>
  );
}
