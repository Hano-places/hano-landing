"use client";

import { useEffect, useRef } from "react";
import { earlyAccess, faq } from "@/content/landing";
import { FullWaitlistForm } from "@/components/forms/waitlist-form";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./early-access-section.module.css";

const PIN_TOP = 72;
const DESKTOP_MIN = 900;

export function EarlyAccessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const faqScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const faqScroll = faqScrollRef.current;
    if (!section || !faqScroll) return;

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < DESKTOP_MIN) return;

      const rect = section.getBoundingClientRect();
      const sectionPinned =
        rect.top <= PIN_TOP + 16 && rect.bottom > window.innerHeight * 0.45;

      if (!sectionPinned) return;

      const { scrollTop, scrollHeight, clientHeight } = faqScroll;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) return;

      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        event.preventDefault();
        faqScroll.scrollTop += event.deltaY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={earlyAccess.id}
      className={styles.section}
      aria-labelledby="early-access-heading"
    >
      <span id={faq.id} className={styles.anchor} aria-hidden />
      <Container>
        <div className={styles.grid}>
          <div className={styles.leftPin}>
            <h2 id="early-access-heading" className={styles.headline}>
              {earlyAccess.headline.before}{" "}
              <SerifEmphasis>{earlyAccess.headline.emphasis}</SerifEmphasis>{" "}
              {earlyAccess.headline.after}
            </h2>
            <div ref={faqScrollRef} className={styles.faqScroll}>
              <Accordion items={faq.items} />
            </div>
          </div>

          <div className={styles.rightPin}>
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
        </div>
      </Container>
    </section>
  );
}
