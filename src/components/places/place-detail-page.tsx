import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import {
  formatWeeklyHours,
  getOpenStatus,
} from "@/lib/place-hours";
import { withHanoReferral } from "@/lib/place-links";
import { getDirectionsUrl } from "@/lib/maps";
import {
  categoryCityPath,
  categoryNeighborhoodPath,
  categorySegmentLabel,
  dishRankingPath,
  neighborhoodSlugFromLocation,
  placeCategorySegment,
} from "@/lib/places-slug";
import { Icon } from "@/components/ui/icon";
import { PlaceFaqSection } from "@/components/places/place-faq-section";
import { PlaceRelatedCard } from "@/components/places/place-related-card";
import { PlaceSidebar } from "@/components/places/place-sidebar";
import styles from "./place-detail-page.module.css";

type PlaceDetailPageProps = {
  place: Place;
  relatedPlaces: readonly Place[];
};

function isPlaceholderReview(place: Place): boolean {
  return (
    place.reviews.length === 1 &&
    place.reviews[0]?.author === "Hano community"
  );
}

export function PlaceDetailPage({ place, relatedPlaces }: PlaceDetailPageProps) {
  const { isOpen, todayHours } = getOpenStatus(place.hours);
  const weeklyHours = formatWeeklyHours(place.hours);
  const segment = placeCategorySegment(place.type);
  const neighborhoodSlug = neighborhoodSlugFromLocation(place.location);
  const showReviews = place.reviews.length > 0 && !isPlaceholderReview(place);
  const directionsUrl = getDirectionsUrl(place);

  return (
    <article className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${segment}`}>{categorySegmentLabel(segment)}</Link>
        <span aria-hidden="true">/</span>
        <Link href={categoryCityPath(segment, "kigali")}>Kigali</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{place.name}</span>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src={publicImageSrc(place.image)}
            alt={place.name}
            fill
            priority
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.category}>{place.category}</p>
          <h1 className={styles.title}>{place.name}</h1>
          <div className={styles.metaRow}>
            <span className={styles.rating}>
              {place.rating}
              <Icon name="star" size={16} />
            </span>
            <span>{place.priceRange}</span>
            <span className={styles.location}>
              <Icon name="location" size={14} />
              {place.location}, Kigali
            </span>
            <span
              className={`${styles.status} ${isOpen ? styles.statusOpen : styles.statusClosed}`}
            >
              {isOpen ? "Open now" : "Closed"}
            </span>
          </div>
          <p className={styles.description}>{place.description}</p>
          {place.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="Highlights">
              {place.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          <div className={styles.heroActions}>
            <a
              href={directionsUrl}
              className={styles.primaryAction}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
            {place.website ? (
              <a
                href={withHanoReferral(place.website)}
                className={styles.secondaryAction}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.bodyGrid}>
        <div className={styles.mainColumn}>
          <section className={styles.cardSection}>
            <h2>Visit information</h2>
            <dl className={styles.infoList}>
              <div>
                <dt>Address</dt>
                <dd>
                  {place.address.street}, {place.address.locality},{" "}
                  {place.address.country}
                </dd>
              </div>
              {place.phone ? (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${place.phone}`}>{place.phone}</a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Today</dt>
                <dd>{todayHours}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{place.category}</dd>
              </div>
            </dl>

            <h3>Opening hours</h3>
            <ul className={styles.hoursList}>
              {weeklyHours.map((entry) => (
                <li key={entry.day}>
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </section>

          {place.menu.length > 0 ? (
            <section className={styles.cardSection}>
              <h2>Menu highlights</h2>
              {place.menu.map((section) => (
                <div key={section.name} className={styles.menuSection}>
                  <h3>{section.name}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        {item.description ? <span> — {item.description}</span> : null}
                        {item.price ? <em> · {item.price}</em> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ) : null}

          {place.gallery.length > 1 ? (
            <section className={styles.cardSection}>
              <h2>Gallery</h2>
              <div className={styles.gallery}>
                {place.gallery.map((image) => (
                  <div key={image} className={styles.galleryItem}>
                    <Image
                      src={publicImageSrc(image)}
                      alt={`${place.name} photo`}
                      fill
                      className={styles.galleryImage}
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <PlaceFaqSection faqs={place.faqs} />

          {showReviews ? (
            <section className={styles.cardSection}>
              <h2>Ratings & reviews</h2>
              <p className={styles.ratingSummary}>
                <strong>{place.rating}</strong> out of 5 based on {place.reviews.length}{" "}
                {place.reviews.length === 1 ? "review" : "reviews"} on Hano
              </p>
              <ul className={styles.reviewList}>
                {place.reviews.map((review) => (
                  <li key={`${review.author}-${review.text.slice(0, 20)}`}>
                    <div className={styles.reviewHeader}>
                      <strong>{review.author}</strong>
                      <span>
                        {review.rating}
                        <Icon name="star" size={12} />
                      </span>
                    </div>
                    <p>{review.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <PlaceSidebar place={place} />
      </div>

      {relatedPlaces.length > 0 ? (
        <section className={styles.relatedSection}>
          <h2>Related places</h2>
          <div className={styles.relatedGrid}>
            {relatedPlaces.map((related) => (
              <PlaceRelatedCard key={related.id} place={related} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.exploreSection} aria-label="Explore more in Kigali">
        <h2 className={styles.exploreHeading}>Explore more in Kigali</h2>
        <ul className={styles.explorePills}>
          <li>
            <Link href={categoryCityPath(segment, "kigali")} className={styles.explorePill}>
              All {categorySegmentLabel(segment).toLowerCase()} in Kigali
            </Link>
          </li>
          {neighborhoodSlug ? (
            <li>
              <Link
                href={categoryNeighborhoodPath(segment, neighborhoodSlug)}
                className={styles.explorePill}
              >
                {categorySegmentLabel(segment)} in {place.location}
              </Link>
            </li>
          ) : null}
          {place.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Link href={dishRankingPath(tag, "kigali")} className={styles.explorePill}>
                Top rated {tag} in Kigali
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
