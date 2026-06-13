"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { hero } from "@/content/landing";
import { publicImageSrc } from "@/lib/public-image";
import { Icon } from "@/components/ui/icon";
import styles from "./hero-section.module.css";

import "swiper/css";

type HeroCarouselProps = {
  onActiveIndexChange?: (index: number) => void;
};

export function HeroCarousel({ onActiveIndexChange }: HeroCarouselProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [cardSwiper, setCardSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = hero.carouselSlides[activeIndex] ?? hero.carouselSlides[0];

  useEffect(() => {
    if (!mainSwiper || !cardSwiper) return;

    mainSwiper.update();
    cardSwiper.update();

    const timer = window.setTimeout(() => {
      mainSwiper.update();
      cardSwiper.update();
    }, 150);

    return () => window.clearTimeout(timer);
  }, [mainSwiper, cardSwiper]);

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.sliderCol}>
      <div className={styles.sliderBlock}>
        <div className={styles.sliderGrid}>
          <div className={styles.mainSwiperWrap}>
            <Swiper
              className={styles.mainSwiper}
              modules={[Controller, Autoplay]}
              controller={{ control: cardSwiper }}
              slidesPerView={1}
              spaceBetween={24}
              speed={600}
              grabCursor
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              observer
              observeParents
              resizeObserver
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
              aria-label="Hero app previews"
            >
              {hero.carouselSlides.map((slide, index) => (
                <SwiperSlide
                  key={`${slide.main}-${index}`}
                  className={styles.mainSlide}
                >
                  <div className={styles.mainSlideBlock}>
                    <Image
                      src={publicImageSrc(slide.main)}
                      alt=""
                      width={slide.mainType === "photo" ? 800 : 640}
                      height={slide.mainType === "photo" ? 1000 : 860}
                      sizes="(max-width: 900px) 95vw, 32rem"
                      className={
                        slide.mainType === "photo"
                          ? styles.mainSlidePhoto
                          : styles.mainSlideImage
                      }
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.secondSwiperWrap}>
            <Swiper
              className={styles.secondSwiper}
              modules={[Controller]}
              controller={{ control: mainSwiper }}
              direction="vertical"
              slidesPerView={1}
              speed={600}
              grabCursor
              loop
              observer
              observeParents
              resizeObserver
              onSwiper={setCardSwiper}
              onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
              aria-label="Hero feature cards"
            >
              {hero.carouselSlides.map((slide, index) => (
                <SwiperSlide
                  key={`${slide.card}-${index}`}
                  className={styles.secondSlide}
                >
                  <div className={styles.secondSlideBlock}>
                    <Image
                      src={publicImageSrc(slide.card)}
                      alt=""
                      width={640}
                      height={320}
                      sizes="(max-width: 900px) 55vw, 22rem"
                      className={`${styles.secondSlideImage}${
                        "cardSize" in slide && slide.cardSize === "phone"
                          ? ` ${styles.secondSlideImagePhone}`
                          : ""
                      }`}
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={styles.glassTop}>
          <div className={styles.glassRow}>
            <Icon name="location" size={16} />
            <span>{activeSlide.location}</span>
          </div>
          <div className={styles.glassRow}>
            <Icon name="calendar" size={16} />
            <span>{activeSlide.date}</span>
          </div>
        </div>

        <div className={styles.glassBottom}>
          <div className={styles.glassTitle}>{activeSlide.tag}</div>
          <div className={styles.glassDesc}>{activeSlide.tagDescription}</div>
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Hero slides">
        {hero.carouselSlides.map((slide, i) => (
          <button
            key={`${slide.main}-${i}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Slide ${i + 1}`}
            className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ""}`}
            onClick={() => {
              mainSwiper?.slideToLoop(i);
              cardSwiper?.slideToLoop(i);
              setActiveIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroCarouselFallback() {
  const slide = hero.carouselSlides[0];

  return (
    <div className={styles.sliderCol}>
      <div className={styles.sliderBlock}>
        <div className={styles.sliderGrid}>
          <div className={styles.mainSwiperWrap}>
            <div className={styles.mainSlideBlock}>
              <Image
                src={publicImageSrc(slide.main)}
                alt=""
                width={640}
                height={860}
                className={styles.mainSlideImage}
                priority
              />
            </div>
          </div>
          <div className={styles.secondSwiperWrap}>
            <div className={styles.secondSlideBlock}>
              <Image
                src={publicImageSrc(slide.card)}
                alt=""
                width={560}
                height={260}
                className={styles.secondSlideImage}
                priority
              />
            </div>
          </div>
        </div>

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

      <div className={styles.dots} aria-hidden>
        {hero.carouselSlides.map((s, i) => (
          <span key={`${s.main}-${i}`} className={styles.dot} />
        ))}
      </div>
    </div>
  );
}
