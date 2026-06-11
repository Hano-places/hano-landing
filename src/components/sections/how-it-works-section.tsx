import { howItWorks } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./how-it-works-section.module.css";

const bgClass = {
  gray: styles.gray,
  lavender: styles.lavender,
  mint: styles.mint,
} as const;

export function HowItWorksSection() {
  return (
    <Section
      id={howItWorks.id}
      className={styles.section}
      ariaLabelledBy="how-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="how-heading" className={styles.headline}>
            {howItWorks.headline.before}{" "}
            <SerifEmphasis>{howItWorks.headline.emphasis}</SerifEmphasis>
            {howItWorks.headline.after}{" "}
            <SerifEmphasis>{howItWorks.headline.emphasis2}</SerifEmphasis>
          </h2>
          <p className={styles.supporting}>{howItWorks.supporting}</p>
        </div>
        <div className={styles.grid}>
          {howItWorks.steps.map((step) => (
            <article
              key={step.title}
              className={`${styles.card} ${bgClass[step.bg]}`}
            >
              <div className={styles.phoneMock}>
                <div className={styles.phone}>Hano app</div>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
