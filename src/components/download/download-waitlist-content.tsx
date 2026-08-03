"use client";

import Link from "next/link";
import { WaitlistOnboarding } from "@/components/forms/waitlist-onboarding";
import { site } from "@/content/landing";
import styles from "../legal.module.css";

export function DownloadWaitlistContent() {
  return (
    <article className={styles.article}>
      <h1>Download the Hano app</h1>
      <p>
        The mobile app is almost ready. Join the waitlist and we&apos;ll notify you
        the moment Hano launches on iOS and Android.
      </p>
      <div style={{ margin: "1.25rem 0 1.75rem" }}>
        <WaitlistOnboarding
          cta="Join the waitlist"
          source="download-page"
          intent="app"
        />
      </div>
      <p>
        Prefer the web for now?{" "}
        <Link href="/places">Explore places</Link> or{" "}
        <Link href="/restaurants">browse restaurants</Link> across Rwanda.
      </p>
      <ul className={styles.list}>
        <li>
          <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer">
            App Store (coming soon)
          </a>
        </li>
        <li>
          <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer">
            Google Play (coming soon)
          </a>
        </li>
      </ul>
    </article>
  );
}
