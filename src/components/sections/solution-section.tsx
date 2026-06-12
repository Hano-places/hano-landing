import Image from "next/image";
import { solution } from "@/content/landing";
import { publicImageSrc } from "@/lib/public-image";
import { Container } from "@/components/ui/container";
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
          {solution.features.map((feature, index) => (
            <article key={feature.title} className={styles.featureCard}>
              <Image
                src={publicImageSrc(feature.image)}
                alt=""
                fill
                priority={index < 2}
                className={styles.featureImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.featureOverlay} aria-hidden />
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
              <div className={styles.metrics} aria-hidden>
                {feature.metrics.map((metric) => (
                  <div key={metric.name} className={styles.metric}>
                    <Image
                      src={publicImageSrc(metric.image)}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.metricThumb}
                    />
                    <div className={styles.metricBody}>
                      <span className={styles.metricTag}>{metric.tag}</span>
                      <span className={styles.metricName}>{metric.name}</span>
                      <span className={styles.metricDetail}>
                        {metric.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
