import Link from "next/link";
import { featuredRestaurants } from "@/content/landing";
import { PlaceCard } from "@/components/places/place-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import styles from "./featured-restaurants.module.css";

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
        <div className={styles.trackWrap}>
          <div className={styles.track} role="list">
            {featuredRestaurants.items.map((place) => (
              <div key={place.id} className={styles.trackItem} role="listitem">
                <PlaceCard place={place} variant="carousel" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
