"use client";

import { footer } from "@/content/landing";
import { EmailCaptureForm } from "@/components/forms/waitlist-form";
import styles from "./footer.module.css";

export function FooterSubscribe() {
  return (
    <div className={styles.subscribeForm}>
      <EmailCaptureForm
        cta={footer.subscribe.cta}
        placeholder={footer.subscribe.placeholder}
        source="footer"
        className={styles.subscribeEmailForm}
      />
    </div>
  );
}
