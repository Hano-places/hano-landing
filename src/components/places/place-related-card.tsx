import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import { placeUrlFromParts } from "@/lib/places-slug";
import { Icon } from "@/components/ui/icon";
import styles from "./place-related-card.module.css";

type PlaceRelatedCardProps = {
  place: Place;
};

export function PlaceRelatedCard({ place }: PlaceRelatedCardProps) {
  return (
    <Link href={placeUrlFromParts(place.type, place.slug)} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={publicImageSrc(place.image)}
          alt={place.name}
          fill
          className={styles.image}
          sizes="200px"
        />
      </div>
      <div className={styles.body}>
        <strong className={styles.name}>{place.name}</strong>
        <span className={styles.meta}>
          {place.location} · {place.rating}
          <Icon name="star" size={12} />
        </span>
      </div>
    </Link>
  );
}
