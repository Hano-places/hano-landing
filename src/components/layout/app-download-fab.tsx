"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { waitlistOnboarding } from "@/content/waitlist";
import {
  FloatingPanelRoot,
  useFloatingPanel,
} from "@/components/ui/floating-panel";
import { WaitlistPanel } from "@/components/forms/waitlist-onboarding";
import {
  AppStoreDownloadBadge,
  PlayStoreDownloadBadge,
} from "@/components/ui/store-logos";
import styles from "./app-download-fab.module.css";

function FabTriggers({ nearFooter }: { nearFooter: boolean }) {
  const { openFloatingPanel } = useFloatingPanel();
  const groupRef = useRef<HTMLDivElement>(null);

  const openWaitlist = (store: "app_store" | "google_play") => {
    posthog.capture("waitlist_started", {
      source: "app-download-fab",
      intent: "app",
      entry_variant: "store_badge",
      store,
    });
    openFloatingPanel(
      groupRef.current?.getBoundingClientRect() ?? null,
      waitlistOnboarding.titleApp,
      "centered",
    );
  };

  return (
    <div
      ref={groupRef}
      className={`${styles.fab} ${nearFooter ? styles.fabHidden : ""}`}
      role="group"
      aria-label="Download the Hano app"
      aria-hidden={nearFooter}
    >
      <button
        type="button"
        className={styles.storeBtn}
        aria-label="Download on the App Store"
        onClick={() => openWaitlist("app_store")}
        tabIndex={nearFooter ? -1 : undefined}
      >
        <AppStoreDownloadBadge className={styles.badgeContent} />
      </button>
      <button
        type="button"
        className={`${styles.storeBtn} ${styles.storeBtnOfficial}`}
        aria-label="Get it on Google Play"
        onClick={() => openWaitlist("google_play")}
        tabIndex={nearFooter ? -1 : undefined}
      >
        <PlayStoreDownloadBadge className={styles.badgeImage} />
      </button>
    </div>
  );
}

export function AppDownloadFab() {
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
    <FloatingPanelRoot className={styles.shell}>
      <FabTriggers nearFooter={nearFooter} />
      <WaitlistPanel
        source="app-download-fab"
        initialEmail=""
        intent="app"
      />
    </FloatingPanelRoot>
  );
}
