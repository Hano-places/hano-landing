import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { HubPage } from "@/components/seo/hub-page";
import { getCategoryHubLabels } from "@/lib/sitemap-paths";
import type { Place } from "@/content/places";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
} from "@/lib/seo";
import styles from "@/app/kigali/kigali-page.module.css";

type CityHubProps = {
  cityName: string;
  cityPath: string;
  description: string;
  places: readonly Place[];
};

export function CityHubContent({
  cityName,
  cityPath,
  description,
  places,
}: CityHubProps) {
  const categories = getCategoryHubLabels();
  const ranked = [...places].sort((a, b) => b.rating - a.rating);

  return (
    <SeoPageShell backHref="/rwanda" backLabel="← Explore Rwanda">
      <JsonLd
        data={[
          buildItemListSchema(
            ranked,
            `Best places in ${cityName}`,
            cityPath,
          ),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rwanda", path: "/rwanda" },
            { name: cityName, path: cityPath },
          ]),
          buildFAQSchema([
            {
              question: `What are the best places to visit in ${cityName}?`,
              answer: `Hano is expanding hospitality discovery across Rwanda. ${description} Browse categories below and check back as we add more curated listings for ${cityName}.`,
            },
          ]),
        ]}
      />
      <div className={styles.page}>
        <p className={styles.eyebrow}>Rwanda</p>
        <h1 className={styles.title}>Discover {cityName}</h1>
        <p className={styles.description}>{description}</p>

        <nav className={styles.categories} aria-label={`Categories in ${cityName}`}>
          {categories.map(({ segment, label }) => (
            <Link key={segment} href={`/${segment}`}>
              {label} in Rwanda
            </Link>
          ))}
          <Link href="/kigali">Explore Kigali</Link>
          <Link href="/rankings">View rankings</Link>
        </nav>
      </div>

      {ranked.length > 0 ? (
        <HubPage
          eyebrow="Top picks"
          title={`Top-rated places near ${cityName}`}
          description={`Curated hospitality picks as Hano grows coverage in ${cityName}.`}
          places={ranked.slice(0, 12)}
          links={[
            { href: "/places", label: "View all places" },
            { href: "/download", label: "Download the app" },
          ]}
        />
      ) : (
        <div className={styles.page}>
          <p className={styles.description}>
            We&apos;re building listings for {cityName}. Meanwhile, explore{" "}
            <Link href="/kigali">Kigali</Link>,{" "}
            <Link href="/restaurants">restaurants across Rwanda</Link>, or{" "}
            <Link href="/business">list your business</Link> in {cityName}.
          </p>
        </div>
      )}
    </SeoPageShell>
  );
}
