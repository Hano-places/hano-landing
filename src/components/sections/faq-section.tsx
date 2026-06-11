import { faq } from "@/content/landing";
import { EmailCaptureForm } from "@/components/forms/waitlist-form";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./faq-section.module.css";

export function FaqSection() {
  return (
    <Section
      id={faq.id}
      className={styles.section}
      ariaLabelledBy="faq-heading"
    >
      <Container>
        <div className={styles.grid}>
          <div>
            <h2 id="faq-heading" className={styles.headline}>
              {faq.headline.before}{" "}
              <SerifEmphasis>{faq.headline.emphasis}</SerifEmphasis>
            </h2>
            <Accordion items={faq.items} />
          </div>
          <aside className={styles.compactForm}>
            <h3 className={styles.compactTitle}>Still have questions?</h3>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
              }}
            >
              Join the waitlist and we&apos;ll keep you updated.
            </p>
            <EmailCaptureForm cta="Join Early Access" compact />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
