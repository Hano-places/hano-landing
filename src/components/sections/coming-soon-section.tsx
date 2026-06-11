import { comingSoon } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import styles from "./coming-soon-section.module.css";

const bgClass = {
  gray: styles.gray,
  lavender: styles.lavender,
  mint: styles.mint,
} as const;

export function ComingSoonSection() {
  return (
    <Section
      id={comingSoon.id}
      className={styles.section}
      ariaLabelledBy="coming-soon-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="coming-soon-heading" className={styles.headline}>
            {comingSoon.headline}
          </h2>
          <p className={styles.supporting}>{comingSoon.supporting}</p>
        </div>
        <div className={styles.grid}>
          {comingSoon.features.map((feature) => (
            <article
              key={feature.title}
              className={`${styles.card} ${bgClass[feature.bg]}`}
            >
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
