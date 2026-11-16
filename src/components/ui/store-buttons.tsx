"use client";

import { site } from "@/content/landing";
import {
  AppStoreDownloadBadge,
  PlayStoreDownloadBadge,
} from "@/components/ui/store-logos";
import { useSyncExternalStore } from "react";
import { currentRef, playUrl } from "@/lib/referral";
import { track } from "@/lib/track";
import styles from "./store-buttons.module.css";

const noop = () => () => {};

type StoreButtonsProps = {
  className?: string;
  size?: "md" | "lg";
  tabIndex?: number;
  /** Where these buttons sit, for analytics (e.g. "download_modal", "hero"). */
  source?: string;
};

/** The official App Store and Google Play buttons, linking to Hano's store listings. */
export function StoreButtons({ className, size = "md", tabIndex, source = "page" }: StoreButtonsProps) {
  // A referral code from this visit or a recent one (the server renders without it).
  const ref = useSyncExternalStore(noop, currentRef, () => undefined);
  const click = (store: "app_store" | "google_play") => track("Store Click", { store, source, page: window.location.pathname, ref: ref ?? null });
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
        onClick={() => click("app_store")}
      >
        <AppStoreDownloadBadge className={styles.badgeContent} />
      </a>
      <a
        href={playUrl(ref)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.storeBtn} ${styles.storeBtnOfficial}`}
        aria-label="Get Hano on Google Play"
        tabIndex={tabIndex}
        onClick={() => click("google_play")}
      >
        <PlayStoreDownloadBadge className={styles.badgeImage} />
      </a>
    </div>
  );
}
