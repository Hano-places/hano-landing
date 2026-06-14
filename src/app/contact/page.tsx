import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact Hano",
  description: `Get in touch with the ${site.name} team for partnerships, restaurant listings, and support.`,
});

export default function ContactPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <article className={styles.article}>
        <h1>Contact Hano</h1>
        <p>
          We&apos;d love to hear from you — whether you&apos;re a restaurant owner, a food
          lover in Kigali, or interested in partnering with {site.name}.
        </p>
        <ul className={styles.list}>
          <li>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            Website: <a href={site.url}>{site.url.replace("https://", "")}</a>
          </li>
        </ul>
        <p>
          For restaurant onboarding or listing updates, include the business name, neighborhood,
          and website so we can respond faster.
        </p>
      </article>
    </SeoPageShell>
  );
}
