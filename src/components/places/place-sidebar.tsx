import Link from "next/link";
import type { Place } from "@/content/places";
import { getOpenStatus } from "@/lib/place-hours";
import { withHanoReferral } from "@/lib/place-links";
import { getDirectionsUrl } from "@/lib/maps";
import { Icon } from "@/components/ui/icon";
import { PlaceMap } from "@/components/places/place-map";
import styles from "./place-sidebar.module.css";

type PlaceSidebarProps = {
  place: Place;
};

export function PlaceSidebar({ place }: PlaceSidebarProps) {
  const { isOpen, todayHours } = getOpenStatus(place.hours);
  const directionsUrl = getDirectionsUrl(place);

  return (
    <aside className={styles.sidebar} aria-label="Location and quick actions">
      <div className={styles.card}>
        <PlaceMap place={place} />
        <div className={styles.body}>
          <div className={styles.statusRow}>
            <span
              className={`${styles.status} ${isOpen ? styles.statusOpen : styles.statusClosed}`}
            >
              {isOpen ? "Open now" : "Closed"}
            </span>
            <span className={styles.todayHours}>Today · {todayHours}</span>
          </div>

          <p className={styles.address}>
            <Icon name="location" size={15} />
            {place.address.street}, {place.address.locality}
          </p>

          <div className={styles.actions}>
            <a
              href={directionsUrl}
              className={styles.primaryAction}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="location" size={16} />
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
            <Link href="/places" className={styles.tertiaryAction}>
              Browse all places
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
