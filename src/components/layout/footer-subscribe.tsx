"use client";

import { footer } from "@/content/landing";
import { WaitlistOnboarding } from "@/components/forms/waitlist-onboarding";
import styles from "./footer.module.css";

export function FooterSubscribe() {
  return (
    <div className={styles.subscribeForm}>
      <WaitlistOnboarding
        cta={footer.subscribe.cta}
        source="footer"
        variant="email"
        fullWidth
        placeholder={footer.subscribe.placeholder}
      />
    </div>
  );
}
