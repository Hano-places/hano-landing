"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PHONE, stepsV2, storyV2 } from "@/content/landing-v2";
import styles from "./story-v2.module.css";
import { Arrow } from "@/components/ui/arrow";

/**
 * "How Hano works": a big rounded box with one phone on the left, numbered steps on the right.
 * On wide screens the box stays put while you scroll and the step (and its screen) changes with
 * the scroll; tapping a step jumps to it. On phones the steps simply stack, each with its screen.
 */
export function StoryV2() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const n = stepsV2.length;

  // Which step is showing, from how far through the section you've scrolled.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.min(0.999, Math.max(0, -r.top / travel));
      setActive(Math.floor(p * n));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [n]);

  // The first step plays the review's photos like someone swiping through them.
  useEffect(() => {
    if (active !== 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % stepsV2[0].screens.length), 1800);
    return () => clearInterval(t);
  }, [active]);

  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / n, behavior: "smooth" });
  };

  const screenFor = (i: number) => (i === 0 ? stepsV2[0].screens[slide] : stepsV2[i].screens[0]);

  return (
    <section className={styles.box} aria-labelledby="story-heading">
      <div data-reveal className={styles.head}>
        <h2 id="story-heading" className={styles.title}>
          {storyV2.title}
        </h2>
        <p className={styles.sub}>{storyV2.sub}</p>
      </div>

      {/* Wide screens: pinned box, steps change with the scroll. */}
      <div ref={track} className={styles.track} style={{ height: `${n * 85}vh` }}>
        <div className={styles.pinned}>
          <div className={styles.media}>
            {stepsV2.map((s, i) => (
              <div key={s.id} className={`${styles.mediaItem} ${i === active ? styles.mediaOn : ""}`} aria-hidden={i !== active}>
                <Image src={screenFor(i)} alt={`${s.title}: Hano app screen`} width={PHONE.width} height={PHONE.height} sizes="340px" className={styles.phone} />
              </div>
            ))}
            {active === 0 ? (
              <div className={styles.dots} aria-hidden>
                {stepsV2[0].screens.map((src, i) => (
                  <span key={src} className={i === slide ? styles.dotOn : ""} />
                ))}
              </div>
            ) : null}
          </div>
          <ol className={styles.steps}>
            {stepsV2.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className={`${styles.step} ${on ? styles.stepOn : ""}`}>
                  <button type="button" className={styles.stepHead} onClick={() => jump(i)} aria-expanded={on}>
                    <span className={styles.num}>{i + 1}</span>
                    <span className={styles.stepTitle}>{s.title}</span>
                    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" className={styles.chev}>
                      <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={styles.stepBody}>
                    <div>
                      <p>{s.body}</p>
                      <ul>
                        {s.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      {i < n - 1 ? (
                        <span className={styles.next}>
                          Next: {stepsV2[i + 1].title} <Arrow dir="down" size={16} />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Phones: one card per step. */}
      <ol data-reveal-stagger className={styles.stack}>
        {stepsV2.map((s, i) => (
          <li key={s.id} className={styles.card}>
            <div className={styles.cardMedia}>
              <Image src={s.screens[0]} alt={`${s.title}: Hano app screen`} width={PHONE.width} height={PHONE.height} sizes="60vw" className={styles.phone} />
            </div>
            <div className={styles.cardCopy}>
              <span className={styles.num}>{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
