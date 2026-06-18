import type { LegalDocumentContent } from "@/content/legal";
import styles from "./legal-document.module.css";

type LegalDocumentProps = {
  document: LegalDocumentContent;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  const { eyebrow, title, intro, updatedAt, sections } = document;

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.updated}>Last updated: {updatedAt}</p>
      </header>

      {sections.length > 3 ? (
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocLabel}>On this page</p>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className={styles.sections}>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.sectionCard}
            aria-labelledby={`${section.id}-heading`}
          >
            <h2 id={`${section.id}-heading`} className={styles.sectionTitle}>
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className={styles.list}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
