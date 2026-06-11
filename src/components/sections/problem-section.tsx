import { problem } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./problem-section.module.css";

export function ProblemSection() {
  return (
    <Section
      id={problem.id}
      topMargin
      className={styles.section}
      ariaLabelledBy="problem-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="problem-heading" className={styles.headline}>
            {problem.headline.before}{" "}
            <SerifEmphasis>{problem.headline.emphasis}</SerifEmphasis>{" "}
            {problem.headline.after}
          </h2>
          <p className={styles.supporting}>{problem.supporting}</p>
        </div>
        <div className={styles.grid}>
          {problem.painPoints.map((point) => (
            <FeatureCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
