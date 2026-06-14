import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getCategoryHubLabels } from "@/lib/sitemap-paths";
import { getPlaces } from "@/lib/places-data";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import { categoryCityPath } from "@/lib/places-slug";
import styles from "./kigali-page.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/kigali",
  title: "Places to Visit in Kigali — Restaurants, Cafés & Experiences",
  description:
    "Discover the best restaurants, cafés, bars, and food experiences in Kigali, Rwanda. Explore neighborhoods, top-rated spots, and local favorites on Hano.",
});

export default async function KigaliPage() {
  const places = (await getPlaces()).sort((a, b) => b.rating - a.rating);
  const categories = getCategoryHubLabels();

  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={[
          buildItemListSchema(places, "Best places in Kigali", "/kigali"),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Kigali", path: "/kigali" },
          ]),
        ]}
      />
      <div className={styles.page}>
        <p className={styles.eyebrow}>Rwanda</p>
        <h1 className={styles.title}>Discover Kigali</h1>
        <p className={styles.description}>
          Kigali is one of East Africa&apos;s most dynamic food cities — from rooftop
          restaurants and specialty coffee to fine dining and neighborhood grills. Start
          exploring by category or browse all curated places.
        </p>

        <nav className={styles.categories} aria-label="Categories in Kigali">
          {categories.map(({ segment, label }) => (
            <Link key={segment} href={categoryCityPath(segment, "kigali")}>
              {label} in Kigali
            </Link>
          ))}
        </nav>
      </div>

      <HubPage
        eyebrow="Top picks"
        title="Top-rated places in Kigali"
        description="Hand-picked restaurants, cafés, and lounges across the city."
        places={places.slice(0, 12)}
        links={[{ href: "/places", label: "View all places" }]}
      />
    </SeoPageShell>
  );
}
