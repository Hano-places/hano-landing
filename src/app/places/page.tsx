import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { PlacesDirectory } from "@/components/places/places-directory";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { placesPage } from "@/content/places";
import { listPlaces } from "@/lib/hano-places";
import { getPlaces } from "@/lib/places-data";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import styles from "./places-page.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/places",
  title: "Explore Places in Rwanda | Restaurants, Cafés & Hidden Gems",
  description:
    "Browse restaurants, cafés, bars, and hidden gems across Rwanda. Search by name, neighborhood, or cuisine and find top-rated places in Kigali.",
});

export const revalidate = 600;

const CATEGORY_LABELS: Record<string, string> = {
  restaurants: "Restaurants",
  cafes: "Cafés",
  nightlife: "Bars & nightlife",
  hotels: "Hotels",
  outdoor: "Outdoors",
  experiences: "Experiences",
  hiddenGems: "Hidden gems",
};

export default async function PlacesPage() {
  const [places, appPlaces] = await Promise.all([getPlaces(), listPlaces()]);
  // Every place in the app, by category, each linking to its page (hano.now/p/<slug>).
  const groups = Object.entries(CATEGORY_LABELS)
    .map(([id, label]) => ({
      id,
      label,
      places: appPlaces.filter((p) => p.category === id).sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((g) => g.places.length);

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema(
            placesPage.headline,
            "/places",
            placesPage.supporting,
          ),
          buildItemListSchema(places, placesPage.headline, "/places"),
        ]}
      />
      <Header />
      <MainWrapper>
        <section className={styles.hero}>
          <Container>
            <Link href="/" className={styles.backLink}>
              ← Back to home
            </Link>
            <p className={styles.eyebrow}>{placesPage.title}</p>
            <h1 className={styles.headline}>{placesPage.headline}</h1>
            <p className={styles.supporting}>{placesPage.supporting}</p>
            <p className={styles.count}>
              {places.length} curated picks · {appPlaces.length || "hundreds of"} places in the app
            </p>
            <p className={styles.count}>
              <Link href="/download">Download the app</Link>
              {" · "}
              <Link href="/business">List your business</Link>
            </p>
          </Container>
        </section>

        <section className={styles.directorySection}>
          <Container>
            <Suspense fallback={<p>Loading places…</p>}>
              <PlacesDirectory />
            </Suspense>
          </Container>
        </section>

        {groups.length ? (
          <section className={styles.allSection} aria-labelledby="all-places">
            <Container>
              <h2 id="all-places" className={styles.allTitle}>
                Every place on Hano
              </h2>
              <p className={styles.allSupporting}>Menus, hours, offers and reviews for each, the same as in the app.</p>
              {groups.map((group, i) => (
                <details key={group.id} className={styles.group} open={i === 0}>
                  <summary className={styles.groupSummary}>
                    {group.label}
                    <span className={styles.groupCount}>{group.places.length}</span>
                  </summary>
                  <ul className={styles.allList}>
                    {group.places.map((place) => (
                      <li key={place.id}>
                        <Link href={`/p/${place.slug}`} className={styles.allLink}>
                          <span className={styles.allName}>{place.name}</span>
                          {place.neighborhood ? <span className={styles.allArea}>{place.neighborhood}</span> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </Container>
          </section>
        ) : null}
      </MainWrapper>
      <Footer />
      <AppDownloadFab />
    </>
  );
}
