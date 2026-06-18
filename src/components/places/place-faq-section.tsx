import { Accordion } from "@/components/ui/accordion";
import type { PlaceFAQ } from "@/content/places";
import styles from "./place-faq-section.module.css";

type PlaceFaqSectionProps = {
  faqs: readonly PlaceFAQ[];
};

export function PlaceFaqSection({ faqs }: PlaceFaqSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="place-faq-heading">
      <h2 id="place-faq-heading" className={styles.heading}>
        Frequently asked questions
      </h2>
      <div className={styles.card}>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
