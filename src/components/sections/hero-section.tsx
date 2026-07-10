"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/landing";
import { IMG } from "@/content/images";
import { publicImageSrc } from "@/lib/public-image";
import { EmailCaptureForm } from "@/components/forms/waitlist-form";
import { HeroAppBadge } from "@/components/ui/hero-app-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import { HeroCarouselFallback } from "./hero-carousel";
import styles from "./hero-section.module.css";

const HeroCarousel = dynamic(
  () => import("./hero-carousel").then((mod) => mod.HeroCarousel),
  {
    ssr: false,
    loading: () => <HeroCarouselFallback />,
  },
);

const avatarUrls = [IMG.serene, IMG.portrait, IMG.aerial, IMG.joyfulScene];

export function HeroSection() {
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
            <p className={styles.subheadline}>
              <Link href="/restaurants">Explore restaurants</Link>
              {" · "}
              <Link href="/download">{hero.secondaryCta}</Link>
              {" · "}
              <Link href="/business">List your business</Link>
            </p>
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

          <HeroCarousel />
        </div>
      </Container>
    </Section>
  );
}
