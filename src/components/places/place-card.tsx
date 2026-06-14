"use client";

"use client";

import Image from "next/image";
import type { Place } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import {
  formatWeeklyHours,
  getOpenStatus,
} from "@/lib/place-hours";
import { Icon } from "@/components/ui/icon";
import styles from "./place-card.module.css";

type PlaceCardProps = {
  place: Place;
  variant?: "carousel" | "grid";
};

export function PlaceCard({ place, variant = "grid" }: PlaceCardProps) {
  const { isOpen, todayHours } = getOpenStatus(place.hours);
  const weeklyHours = formatWeeklyHours(place.hours);

  return (
    <article
      className={`${styles.card} ${variant === "carousel" ? styles.carousel : styles.grid}`}
    >
      <div className={styles.imageWrap}>
        <Image
          src={publicImageSrc(place.image)}
          alt={place.name}
          fill
          className={styles.image}
          sizes={variant === "carousel" ? "320px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
        <span
          className={`${styles.statusBadge} ${isOpen ? styles.statusOpen : styles.statusClosed}`}
        >
          {isOpen ? "Open now" : "Closed"}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{place.name}</h3>
          <span className={styles.rating}>
            {place.rating}
            <Icon name="star" size={14} />
          </span>
        </div>

        <div className={styles.meta}>
          <span>{place.category}</span>
          <span aria-hidden="true">·</span>
          <span>{place.location}</span>
          <span aria-hidden="true">·</span>
          <span>{place.priceRange}</span>
        </div>

        <p className={styles.description}>{place.description}</p>

        <div className={styles.hoursBlock}>
          <div className={styles.hoursToday}>
            <Icon name="clock" size={15} className={styles.hoursIcon} />
            <span>
              Today · <strong>{todayHours}</strong>
            </span>
          </div>
          {variant === "grid" ? (
            <ul className={styles.hoursWeek}>
              {weeklyHours.map((entry) => (
                <li key={entry.day}>
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {place.website ? (
          <a
            href={place.website}
            className={styles.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
