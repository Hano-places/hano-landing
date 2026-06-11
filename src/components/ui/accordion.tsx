"use client";

import { useState } from "react";
import styles from "./accordion.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly FaqItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <div key={item.question} className={styles.item}>
            <button
              type="button"
              id={triggerId}
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span
                className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
