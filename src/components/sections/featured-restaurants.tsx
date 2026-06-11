import Image from "next/image";
import { featuredRestaurants } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
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
        </div>
        <div className={styles.track} role="list">
          {featuredRestaurants.items.map((restaurant) => (
            <article key={restaurant.name} className={styles.card} role="listitem">
              <div className={styles.imageWrap}>
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className={styles.image}
                  sizes="320px"
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{restaurant.name}</h3>
                <div className={styles.meta}>
                  <span>{restaurant.category}</span>
                  <span>·</span>
                  <span>{restaurant.location}</span>
                  <span>·</span>
                  <span className={styles.rating}>
                    {restaurant.rating}
                    <Icon name="star" size={14} />
                  </span>
                  <span>·</span>
                  <span>{restaurant.priceRange}</span>
                </div>
                <p className={styles.description}>{restaurant.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
