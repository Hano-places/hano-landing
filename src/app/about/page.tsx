import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About Hano — Discover Rwanda",
  description: `Learn about ${site.name}, Rwanda's hospitality discovery platform for restaurants, cafés, bars, and places worth visiting.`,
});

export default function AboutPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <article className={styles.article}>
        <h1>About Hano</h1>
        <p>
          {site.name} is building Rwanda&apos;s definitive hospitality discovery platform.
          We help locals and visitors find restaurants, cafés, bakeries, bars, lounges, and
          hidden gems — starting in Kigali and expanding nationwide.
        </p>
        <p>
          Finding a great place to eat should not mean scrolling endless WhatsApp threads or
          outdated listings. {site.name} brings curated recommendations, ratings, opening
          hours, and neighborhood context into one place you can trust.
        </p>
        <h2 style={{ marginTop: "2rem", color: "var(--color-heading)" }}>
          What we index
        </h2>
        <ul className={styles.list}>
          <li>
            <Link href="/restaurants">Restaurants</Link> and fine dining across Kigali
          </li>
          <li>
            <Link href="/cafes">Cafés</Link>, bakeries, and coffee culture
          </li>
          <li>
            <Link href="/bars">Bars</Link> and <Link href="/lounges">lounges</Link>
          </li>
          <li>
            Guides to food and places across <Link href="/rwanda">Rwanda</Link>
          </li>
        </ul>
        <p>
          Made with love in Kigali.{" "}
          <Link href="/business">List your business</Link> or{" "}
          <Link href="/download">get the app</Link>.
        </p>
      </article>
    </SeoPageShell>
  );
}
