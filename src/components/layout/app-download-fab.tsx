"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/landing";
import {
  AppStoreDownloadBadge,
  PlayStoreDownloadBadge,
} from "@/components/ui/store-logos";
import styles from "./app-download-fab.module.css";

function FabLinks({ nearFooter }: { nearFooter: boolean }) {
  return (
    <div
      className={`${styles.fab} ${nearFooter ? styles.fabHidden : ""}`}
      role="group"
      aria-label="Download the Hano app"
      aria-hidden={nearFooter}
    >
      <a
        href={site.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.storeBtn}
        aria-label="Download Hano on the App Store"
        tabIndex={nearFooter ? -1 : undefined}
      >
        <AppStoreDownloadBadge className={styles.badgeContent} />
      </a>
      <a
        href={site.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.storeBtn} ${styles.storeBtnOfficial}`}
        aria-label="Get Hano on Google Play"
        tabIndex={nearFooter ? -1 : undefined}
      >
        <PlayStoreDownloadBadge className={styles.badgeImage} />
      </a>
    </div>
  );
}

/** Off for now: the floating store buttons are hidden on every page. Set to true to bring them back. */
const SHOW_FAB = false;

export function AppDownloadFab() {
  return SHOW_FAB ? <FloatingStoreButtons /> : null;
}

function FloatingStoreButtons() {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;

    const updateVisibility = () => {
      const rect = footer.getBoundingClientRect();
      // Hide only once the site footer actually enters the viewport.
      setNearFooter(rect.top < window.innerHeight);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const observer = new IntersectionObserver(updateVisibility, {
      root: null,
      threshold: 0,
    });
    observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <FabLinks nearFooter={nearFooter} />
  );
}
