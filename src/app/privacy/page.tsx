import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your information.`,
});

export default function PrivacyPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <article className={styles.article}>
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <p>
          {site.name} respects your privacy. Information submitted through our waitlist or
          contact forms is used only for product updates, launch announcements, and community
          invitations related to {site.name}.
        </p>
        <p>
          We do not sell personal information. Analytics tools may collect aggregated usage
          data to improve the platform. Contact us at {site.email} with any privacy questions.
        </p>
      </article>
    </SeoPageShell>
  );
}
