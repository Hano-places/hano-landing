import Image from "next/image";
import { howItWorks } from "@/content/landing";
import { publicImageSrc } from "@/lib/public-image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./how-it-works-section.module.css";

const variantClass = {
  gray: styles.cardGray,
  violet: styles.cardViolet,
  green: styles.cardGreen,
} as const;

const sizeClass = {
  large: styles.cardLarge,
  small: styles.cardSmall,
} as const;

const roleClass = {
  main: styles.layerMain,
  chip: styles.layerChip,
} as const;

const alignClass = {
  "bottom-right": styles.alignBottomRight,
  "bottom-right-phone": styles.alignBottomRightPhone,
  "bottom-left": styles.alignBottomLeft,
  "top-right": styles.alignTopRight,
  "top-right-half-clip": styles.alignTopRightHalfClip,
  "below-text-left": styles.alignBelowTextLeft,
} as const;

export function HowItWorksSection() {
  return (
    <Section
      id={howItWorks.id}
      className={styles.section}
      ariaLabelledBy="how-heading"
    >
      <Container>
        <div className={styles.contentBlock}>
          <div className={styles.header}>
            <h2 id="how-heading" className={styles.headline}>
              {howItWorks.headline.before}{" "}
              <SerifEmphasis>{howItWorks.headline.emphasis}</SerifEmphasis>
              {howItWorks.headline.after}{" "}
              <SerifEmphasis>{howItWorks.headline.emphasis2}</SerifEmphasis>
            </h2>
            <p className={styles.supporting}>{howItWorks.supporting}</p>
          </div>

          <div className={styles.tabPanel}>
            <div className={styles.grid}>
              {howItWorks.cards.map((card, index) => (
                <article
                  key={card.title}
                  className={`${styles.card} ${variantClass[card.variant]} ${sizeClass[card.size]}`}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDesc}>{card.description}</p>
                  </div>
                  <div className={styles.cardVisual} aria-hidden>
                    {card.layers.map((layer) => (
                      <Image
                        key={`${layer.src}-${layer.role}`}
                        src={publicImageSrc(layer.src)}
                        alt={layer.alt}
                        width={
                          layer.align === "bottom-right-phone" ? 320 : 360
                        }
                        height={
                          layer.align === "bottom-right-phone" ? 640 : 400
                        }
                        className={`${styles.layer} ${roleClass[layer.role]} ${alignClass[layer.align]}`}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
