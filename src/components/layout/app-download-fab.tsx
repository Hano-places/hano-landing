import { site } from "@/content/landing";
import {
  AppStoreDownloadBadge,
  PlayStoreDownloadBadge,
} from "@/components/ui/store-logos";
import styles from "./app-download-fab.module.css";

export function AppDownloadFab() {
  return (
    <div className={styles.fab} role="group" aria-label="Download the Hano app">
      <a
        href={site.appStoreUrl}
        className={styles.storeBtn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
      >
        <AppStoreDownloadBadge className={styles.badgeContent} />
      </a>
      <a
        href={site.playStoreUrl}
        className={styles.storeBtn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
      >
        <PlayStoreDownloadBadge className={styles.badgeContent} />
      </a>
    </div>
  );
}
