import { earlyAccess, faq } from "@/content/landing";
import { FullWaitlistForm } from "@/components/forms/waitlist-form";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./early-access-section.module.css";

export function EarlyAccessSection() {
  return (
    <Section
      id={earlyAccess.id}
      className={styles.section}
      ariaLabelledBy="early-access-heading"
    >
      <span id={faq.id} className={styles.anchor} aria-hidden />
      <Container>
        <div className={styles.grid}>
          <div className={styles.faqColumn}>
            <h2 id="early-access-heading" className={styles.headline}>
              {earlyAccess.headline.before}{" "}
              <SerifEmphasis>{earlyAccess.headline.emphasis}</SerifEmphasis>{" "}
              {earlyAccess.headline.after}
            </h2>
            <div className={styles.faqList}>
              <Accordion items={faq.items} />
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.formInner}>
              <h3 className={styles.formTitle}>{earlyAccess.formTitle}</h3>
              <FullWaitlistForm
                cta={earlyAccess.cta}
                trustMessage={earlyAccess.trustMessage}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
