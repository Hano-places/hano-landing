"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { PHONE, stepsV2, storyV2 } from "@/content/landing-v2";
import styles from "./story-v2.module.css";

/**
 * "How Hano works": one wide card per step, the words on the left and the app on the right, its
 * phone standing out above the card. On wide screens each card stops a little below the one before
 * and the next slides over it as you scroll (the page scrolls normally, nothing is held back). On
 * phones the cards simply follow each other.
 */
export function StoryV2() {
  const list = useRef<HTMLOListElement>(null);

  // How far each card has gone back into the stack: 0 while it's in front, +1 for every card that
  // has slid over it (fractions while one is sliding). Cards further back shrink and darken.
  useEffect(() => {
    const ol = list.current;
    if (!ol || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 900px)");
    const cards = Array.from(ol.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!wide.matches) {
        cards.forEach((c) => c.style.removeProperty("--depth"));
        return;
      }
      // Where each card stops (its sticky top), and how far the next ones have come over it.
      const over = cards.map((c) => {
        const r = c.getBoundingClientRect();
        const stop = parseFloat(getComputedStyle(c).top) || 0;
        return Math.min(1, Math.max(0, 1 - (r.top - stop) / r.height));
      });
      cards.forEach((c, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j++) depth += over[j];
        c.style.setProperty("--depth", depth.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.box} aria-labelledby="story-heading">
      <div data-reveal className={styles.head}>
        <h2 id="story-heading" className={styles.title}>
          {storyV2.title}
        </h2>
        <p className={styles.sub}>{storyV2.sub}</p>
      </div>

      <ol ref={list} className={styles.stack}>
        {stepsV2.map((s, i) => (
          <li key={s.id} className={styles.card} style={{ "--i": i } as React.CSSProperties}>
            <div className={styles.copy}>
              <span className={styles.num}>{i + 1}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
              <ul className={styles.points}>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.media}>
              <Screens screens={s.screens} title={s.title} interval={intervalOf(s)} sizes="(min-width: 900px) 300px, 60vw" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const intervalOf = (step: (typeof stepsV2)[number]) => ("interval" in step ? step.interval : 1800);

/**
 * A step's screens. One screen just shows; several cross-fade from one to the next like someone
 * using the app, while the card is on screen. Reduced motion keeps the first screen.
 */
function Screens({
  screens,
  title,
  interval,
  sizes,
}: {
  screens: readonly string[];
  title: string;
  interval: number;
  sizes: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  const many = screens.length > 1;
  const run = many && visible;

  // Play only while the card is on screen.
  useEffect(() => {
    if (!many || !box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [many]);

  useEffect(() => {
    if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setShown((n) => (n + 1) % screens.length), interval);
    return () => clearInterval(t);
  }, [run, interval, screens.length]);

  if (!many) {
    return <Image src={screens[0]} alt={`${title}: Hano app screen`} width={PHONE.width} height={PHONE.height} sizes={sizes} className={styles.phone} />;
  }
  return (
    <div ref={box} className={styles.frames}>
      {screens.map((src, j) => (
        <Image
          key={src}
          src={src}
          alt={j === shown ? `${title}: Hano app screen` : ""}
          aria-hidden={j !== shown}
          width={PHONE.width}
          height={PHONE.height}
          sizes={sizes}
          className={`${styles.phone} ${styles.frame} ${j === shown ? styles.frameOn : ""}`}
        />
      ))}
    </div>
  );
}
