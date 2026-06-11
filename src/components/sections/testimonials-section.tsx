import { testimonials } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import styles from "./testimonials-section.module.css";

export function TestimonialsSection() {
  return (
    <Section
      id={testimonials.id}
      className={styles.section}
      ariaLabelledBy="testimonials-heading"
    >
      <Container>
        <div className={styles.header}>
          <h2 id="testimonials-heading" className={styles.headline}>
            {testimonials.headline}
          </h2>
          <p className={styles.supporting}>{testimonials.supporting}</p>
        </div>
        <div className={styles.grid}>
          {testimonials.items.map((item) => (
            <blockquote key={item.name} className={styles.card}>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <div className={styles.author}>{item.name}</div>
                <div className={styles.role}>{item.role}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  );
}
