import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { guides } from "@/content/guides";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/guides",
  title: "Guides to Food & Places in Rwanda",
  description:
    "Long-form guides to the best restaurants, cafés, date nights, and hidden gems in Kigali and across Rwanda.",
});

export default function GuidesIndexPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Guides to Food & Places in Rwanda",
            url: "https://hano.now/guides",
          },
        ]}
      />
      <article className={styles.article}>
        <h1>Guides to food & places in Rwanda</h1>
        <p>
          Curated long-form guides to help you discover restaurants, cafés, and experiences
          across Kigali and Rwanda — with links to every place on Hano.
        </p>
        <ul className={styles.list}>
          {guides.map((guide) => (
            <li key={guide.slug} style={{ marginTop: "1.25rem" }}>
              <Link href={`/guides/${guide.slug}`}>
                <strong>{guide.title}</strong>
              </Link>
              <p style={{ marginTop: "0.35rem" }}>{guide.description}</p>
            </li>
          ))}
        </ul>
        <p>
          Also explore <Link href="/rankings">rankings</Link>,{" "}
          <Link href="/restaurants">restaurants</Link>, and{" "}
          <Link href="/rwanda">places in Rwanda</Link>.
        </p>
      </article>
    </SeoPageShell>
  );
}
