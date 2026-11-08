import { site } from "@/content/landing";
import {
  AppStoreDownloadBadge,
  PlayStoreDownloadBadge,
} from "@/components/ui/store-logos";
import styles from "./store-buttons.module.css";

type StoreButtonsProps = {
  className?: string;
  size?: "md" | "lg";
  tabIndex?: number;
};

/** The official App Store and Google Play buttons, linking to Hano's store listings. */
export function StoreButtons({ className, size = "md", tabIndex }: StoreButtonsProps) {
  return (
    <div
      className={`${styles.row} ${size === "lg" ? styles.lg : ""} ${className ?? ""}`}
      role="group"
      aria-label="Download the Hano app"
    >
      <a
        href={site.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.storeBtn}
        aria-label="Download Hano on the App Store"
        tabIndex={tabIndex}
      >
        <AppStoreDownloadBadge className={styles.badgeContent} />
      </a>
      <a
        href={site.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.storeBtn} ${styles.storeBtnOfficial}`}
        aria-label="Get Hano on Google Play"
        tabIndex={tabIndex}
      >
        <PlayStoreDownloadBadge className={styles.badgeImage} />
      </a>
    </div>
  );
}
