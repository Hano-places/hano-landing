"use client";

import Link from "next/link";
import { featuredRestaurants } from "@/content/landing";
import { PlaceCutoutCard } from "@/components/places/place-cutout-card";
import {
  PlaceDetailsProvider,
  usePlaceDetails,
} from "@/components/places/place-details-popover";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import styles from "./featured-restaurants.module.css";

function FeaturedRestaurantsCarousel() {
  const { openPlaceDetails } = usePlaceDetails();

  return (
    <div className={styles.trackWrap}>
      <div className={styles.track} role="list">
        {featuredRestaurants.items.map((place) => (
          <div key={place.id} className={styles.trackItem} role="listitem">
            <PlaceCutoutCard place={place} onOpenDetails={openPlaceDetails} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturedRestaurantsSection() {
  return (
    <Section
      id={featuredRestaurants.id}
      className={styles.section}
      ariaLabelledBy="restaurants-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="restaurants-heading" className={styles.headline}>
            {featuredRestaurants.headline}
          </h2>
          <p className={styles.supporting}>{featuredRestaurants.supporting}</p>
          <Link href={featuredRestaurants.viewAllHref} className={styles.viewAll}>
            {featuredRestaurants.viewAllLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <PlaceDetailsProvider>
          <FeaturedRestaurantsCarousel />
        </PlaceDetailsProvider>
      </Container>
    </Section>
  );
}
