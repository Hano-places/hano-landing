import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildPageMetadata,
} from "@/lib/seo";
import {
  CATEGORY_SEGMENTS,
  DISH_TAGS,
  bestOfPath,
  categoryCityPath,
  categorySegmentLabel,
  dishLabel,
  dishRankingPath,
} from "@/lib/places-slug";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/rankings",
  title: "Top Rankings — Best Restaurants & Food in Rwanda",
  description:
    "Top-rated restaurants, cafés, rooftops, burgers, pizza, and coffee in Kigali and Rwanda. Browse Hano rankings by category and dish.",
});

export default function RankingsPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rankings", path: "/rankings" },
          ]),
          buildFAQSchema([
            {
              question: "How does Hano rank places in Rwanda?",
              answer:
                "Hano rankings highlight curated and highly rated restaurants, cafés, and food experiences in Kigali and across Rwanda based on community ratings and editorial picks.",
            },
          ]),
        ]}
      />
      <article className={styles.article}>
        <h1>Top rankings in Rwanda</h1>
        <p>
          Explore the best restaurants, cafés, and dishes in Kigali — ranked for discovery
          across Rwanda&apos;s hospitality scene.
        </p>

        <h2 style={{ marginTop: "2rem", color: "var(--color-heading)" }}>
          Best by category
        </h2>
        <ul className={styles.list}>
          {CATEGORY_SEGMENTS.map((segment) => (
            <li key={segment}>
              <Link href={bestOfPath(segment, "kigali")}>
                Top rated {categorySegmentLabel(segment).toLowerCase()} in Kigali
              </Link>
              {" · "}
              <Link href={categoryCityPath(segment, "kigali")}>
                All {categorySegmentLabel(segment).toLowerCase()}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/best/rooftop-restaurants/kigali">
              Best rooftop restaurants in Kigali
            </Link>
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem", color: "var(--color-heading)" }}>
          Best by dish
        </h2>
        <ul className={styles.list}>
          {DISH_TAGS.map((dish) => (
            <li key={dish}>
              <Link href={dishRankingPath(dish, "kigali")}>
                Top rated {dishLabel(dish).toLowerCase()} in Kigali
              </Link>
            </li>
          ))}
        </ul>

        <p>
          <Link href="/rwanda">Explore Rwanda</Link>
          {" · "}
          <Link href="/guides">Read guides</Link>
          {" · "}
          <Link href="/download">Download the app</Link>
        </p>
      </article>
    </SeoPageShell>
  );
}
