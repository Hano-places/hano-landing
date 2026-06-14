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
import { getPlaces } from "@/lib/places-data";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";
import styles from "./places-page.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/places",
  title: `${placesPage.title} — Restaurants, Cafés & Hidden Gems`,
  description: placesPage.supporting,
});

export default async function PlacesPage() {
  const places = await getPlaces();

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
            <p className={styles.count}>{places.length} curated places in Kigali</p>
          </Container>
        </section>

        <section className={styles.directorySection}>
          <Container>
            <PlacesDirectory />
          </Container>
        </section>
      </MainWrapper>
      <Footer />
      <AppDownloadFab />
    </>
  );
}
