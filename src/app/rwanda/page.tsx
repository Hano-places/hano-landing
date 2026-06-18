import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getCategoryHubLabels } from "@/lib/sitemap-paths";
import { getPlaces } from "@/lib/places-data";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import { categoryCityPath } from "@/lib/places-slug";
import styles from "./rwanda-page.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/rwanda",
  title: "Best Places in Rwanda — Restaurants, Cafés, Bars & Hotels",
  description:
    "Discover the best restaurants, cafés, bars, hotels, and places to visit in Rwanda. Explore Kigali and top-rated hospitality spots across the country on Hano.",
});

export default async function RwandaPage() {
  const places = (await getPlaces()).sort((a, b) => b.rating - a.rating);
  const categories = getCategoryHubLabels();

  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={[
          buildItemListSchema(places, "Best places in Rwanda", "/rwanda"),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rwanda", path: "/rwanda" },
          ]),
          buildFAQSchema([
            {
              question: "What are the best places to visit in Rwanda?",
              answer:
                "Rwanda offers vibrant food scenes, coffee culture, and hospitality across Kigali and beyond. Hano curates top-rated restaurants, cafés, bars, and experiences to help you discover the best places in Rwanda.",
            },
            {
              question: "Where can I find the best restaurants in Rwanda?",
              answer:
                "Kigali is Rwanda's culinary capital with rooftop dining, fine dining, local favorites, and specialty coffee. Browse Hano's curated restaurant listings with ratings, hours, and neighborhoods.",
            },
          ]),
        ]}
      />
      <div className={styles.page}>
        <p className={styles.eyebrow}>Hospitality in Rwanda</p>
        <h1 className={styles.title}>Discover places in Rwanda</h1>
        <p className={styles.description}>
          From Kigali&apos;s restaurant scene to hidden gems across the country, Hano is
          your guide to hospitality in Rwanda — restaurants, cafés, bars, lounges, and
          places worth visiting.
        </p>

        <nav className={styles.links} aria-label="Explore Rwanda">
          <Link href="/kigali">Places in Kigali</Link>
          <Link href="/places">All curated places</Link>
          <Link href="/guides/ultimate-kigali-food-guide">Rwanda food guide</Link>
        </nav>

        <nav className={styles.categories} aria-label="Categories in Rwanda">
          {categories.map(({ segment, label }) => (
            <Link key={segment} href={categoryCityPath(segment, "kigali")}>
              Best {label.toLowerCase()} in Rwanda
            </Link>
          ))}
        </nav>
      </div>

      <HubPage
        eyebrow="Top picks in Rwanda"
        title="Top-rated places in Rwanda"
        description="Hand-picked restaurants, cafés, and lounges — starting with Kigali's best."
        places={places.slice(0, 12)}
        links={[
          { href: "/kigali", label: "Explore Kigali" },
          { href: "/restaurants/kigali", label: "Restaurants in Kigali" },
        ]}
      />
    </SeoPageShell>
  );
}
