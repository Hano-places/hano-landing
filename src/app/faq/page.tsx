import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { faq, site } from "@/content/landing";
import { buildFAQSchema, buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title: "FAQ",
  description: `Answers about ${site.name} — restaurant discovery in Rwanda, the app, waitlist, business listings, and privacy.`,
});

export default function FaqPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd data={buildFAQSchema(faq.items)} />
      <article className={styles.article}>
        <h1>Frequently asked questions</h1>
        <p>
          Everything you need to know about discovering restaurants, cafés, and places
          across Rwanda with {site.name}.
        </p>
        <dl className={styles.list}>
          {faq.items.map((item) => (
            <div key={item.question} style={{ marginTop: "1.5rem" }}>
              <dt>
                <strong>{item.question}</strong>
              </dt>
              <dd style={{ marginTop: "0.5rem" }}>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p>
          Still have questions?{" "}
          <Link href="/contact">Contact us</Link> or{" "}
          <Link href="/download">download the app</Link>.
        </p>
      </article>
    </SeoPageShell>
  );
}
