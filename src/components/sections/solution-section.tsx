import { solution } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import styles from "./solution-section.module.css";

export function SolutionSection() {
  return (
    <Section
      id={solution.id}
      className={styles.section}
      ariaLabelledBy="solution-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="solution-heading" className={styles.headline}>
            {solution.headline}
          </h2>
          <p className={styles.supporting}>{solution.supporting}</p>
        </div>
        <div className={styles.grid}>
          {solution.features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
