import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { site } from "@/content/landing";
import { buildBreadcrumbSchema, buildFAQSchema, buildPageMetadata } from "@/lib/seo";
import styles from "../legal.module.css";

export const metadata: Metadata = buildPageMetadata({
  path: "/business",
  title: "List Your Business on Hano",
  description: `Register or claim your restaurant, café, or hospitality business on ${site.name}. Reach diners searching for places in Rwanda.`,
});

const businessFaqs = [
  {
    question: "Can restaurants join Hano?",
    answer:
      "Yes. Restaurants, cafés, bars, lounges, and other hospitality businesses can create profiles, showcase information, and connect with potential customers.",
  },
  {
    question: "Can restaurants pay for higher rankings?",
    answer:
      "No. Trust and transparency are important principles for Hano. Any sponsored content will always be clearly labeled.",
  },
];

export default function BusinessPage() {
  return (
    <SeoPageShell backHref="/" backLabel="← Back to home">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Business", path: "/business" },
          ]),
          buildFAQSchema(businessFaqs),
        ]}
      />
      <article className={styles.article}>
        <h1>List your business on Hano</h1>
        <p>
          Get discovered by people searching for restaurants, cafés, and places to visit in
          Rwanda. {site.name} helps diners find accurate hours, ratings, and neighborhood
          context — and helps great businesses get found.
        </p>
        <h2 style={{ marginTop: "2rem", color: "var(--color-heading)" }}>
          Why list with us
        </h2>
        <ul className={styles.list}>
          <li>Appear in category and neighborhood searches across Kigali and Rwanda</li>
          <li>Share menus, hours, photos, and your official website</li>
          <li>Earn a &quot;Find us on Hano&quot; badge for your own site</li>
          <li>Transparent rankings — no pay-to-rank</li>
        </ul>
        <p>
          Ready to get started? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> with your business name,
          neighborhood, and website. Or{" "}
          <Link href="/contact">use our contact page</Link>.
        </p>
        <p>
          Looking for places to eat?{" "}
          <Link href="/restaurants">Browse restaurants</Link> or{" "}
          <Link href="/rwanda">explore Rwanda</Link>.
        </p>
      </article>
    </SeoPageShell>
  );
}
