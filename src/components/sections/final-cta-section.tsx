import Image from "next/image";
import { finalCta } from "@/content/landing";
import { EmailCaptureForm } from "@/components/forms/waitlist-form";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./final-cta-section.module.css";

const avatarUrls = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
];

const floatClasses = [
  styles.img1,
  styles.img2,
  styles.img3,
  styles.img4,
  styles.img5,
  styles.img6,
];

export function FinalCtaSection() {
  return (
    <Section
      id={finalCta.id}
      className={styles.section}
      ariaLabelledBy="final-cta-heading"
    >
      <Container className={styles.inner}>
        {finalCta.floatingImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={100}
            height={120}
            className={`${styles.floatingImage} ${floatClasses[i]}`}
            aria-hidden
          />
        ))}

        <div className={styles.logoWrap}>
          <Logo showText={false} size="lg" />
        </div>

        <h2 id="final-cta-heading" className={styles.headline}>
          {finalCta.headline.parts.map((part) =>
            part.emphasis ? (
              <SerifEmphasis key={part.text}>{part.text}</SerifEmphasis>
            ) : (
              <span key={part.text}>{part.text}</span>
            ),
          )}
        </h2>

        <p className={styles.supporting}>{finalCta.supporting}</p>

        <div className={styles.formWrap}>
          <EmailCaptureForm cta={finalCta.cta} />
        </div>

        <div className={styles.socialProof}>
          <div className={styles.avatars} aria-hidden>
            {avatarUrls.map((url) => (
              <Image
                key={url}
                src={url}
                alt=""
                width={32}
                height={32}
                className={styles.avatar}
              />
            ))}
          </div>
          <span>{finalCta.socialProof}</span>
        </div>
      </Container>
    </Section>
  );
}
