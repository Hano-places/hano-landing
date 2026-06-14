import Link from "next/link";
import type { Place } from "@/content/places";
import { PlaceCutoutCard } from "@/components/places/place-cutout-card";
import { placeUrlFromParts } from "@/lib/places-slug";
import styles from "./hub-page.module.css";

type HubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  places: readonly Place[];
  links?: readonly { href: string; label: string }[];
};

export function HubPage({
  eyebrow,
  title,
  description,
  places,
  links = [],
}: HubPageProps) {
  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      {links.length > 0 ? (
        <nav className={styles.links} aria-label="Related pages">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}

      <p className={styles.count}>
        {places.length} {places.length === 1 ? "place" : "places"}
      </p>

      <div className={styles.grid} role="list">
        {places.map((place) => (
          <div key={place.id} className={styles.gridItem} role="listitem">
            <PlaceCutoutCard
              place={place}
              href={placeUrlFromParts(place.type, place.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
