"use client";

import { useState } from "react";
import Image from "next/image";
import { hero } from "@/content/landing";
import { IMG } from "@/content/images";
import { publicImageSrc } from "@/lib/public-image";
import { EmailCaptureForm } from "@/components/forms/waitlist-form";
import { HeroAppBadge } from "@/components/ui/hero-app-badge";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./hero-section.module.css";

const avatarUrls = [IMG.serene, IMG.portrait, IMG.aerial, IMG.joyfulScene];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = hero.carouselSlides[activeSlide];

  return (
    <Section id="hero" className={styles.hero} ariaLabelledBy="hero-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <HeroAppBadge />
            <h1 id="hero-heading" className={styles.headline}>
              {hero.headline.before}{" "}
              <SerifEmphasis>{hero.headline.emphasis}</SerifEmphasis>,{" "}
              {hero.headline.after}
            </h1>
            <p className={styles.subheadline}>{hero.subheadline}</p>
            <EmailCaptureForm cta={hero.cta} />
            <div className={styles.socialProof}>
              <div className={styles.avatars} aria-hidden>
                {avatarUrls.map((url) => (
                  <Image
                    key={url}
                    src={publicImageSrc(url)}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                ))}
              </div>
              <span>{hero.socialProof}</span>
            </div>
            <div className={styles.metrics}>
              {hero.metrics.map((m) => (
                <div key={m.label}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carousel}>
            <div className={styles.slide}>
              <Image
                src={publicImageSrc(slide.image)}
                alt="Restaurant preview"
                fill
                className={styles.slideImage}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className={styles.glassTop}>
                <div className={styles.glassRow}>
                  <Icon name="location" size={16} />
                  <span>{slide.location}</span>
                </div>
                <div className={styles.glassRow}>
                  <Icon name="calendar" size={16} />
                  <span>{slide.date}</span>
                </div>
              </div>
              <div className={styles.glassBottom}>
                <div className={styles.glassTitle}>{slide.tag}</div>
                <div className={styles.glassDesc}>{slide.tagDescription}</div>
              </div>
            </div>
            <div className={styles.dots} role="tablist" aria-label="Carousel slides">
              {hero.carouselSlides.map((_, i) => (
                <button
                  key={hero.carouselSlides[i].image}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === i}
                  aria-label={`Slide ${i + 1}`}
                  className={`${styles.dot} ${activeSlide === i ? styles.dotActive : ""}`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
