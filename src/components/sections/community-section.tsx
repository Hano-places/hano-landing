import { community, site } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import styles from "./community-section.module.css";

export function CommunitySection() {
  return (
    <Section
      id={community.id}
      className={styles.section}
      ariaLabelledBy="community-heading"
    >
      <Container>
        <div className={styles.card}>
          <h2 id="community-heading" className={styles.headline}>
            {community.headline}
          </h2>
          <p className={styles.description}>{community.description}</p>
          <ul className={styles.benefits}>
            {community.benefits.map((benefit) => (
              <li key={benefit} className={styles.benefit}>
                {benefit}
              </li>
            ))}
          </ul>
          <a
            href={site.whatsappUrl}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            {community.cta}
          </a>
        </div>
      </Container>
    </Section>
  );
}
