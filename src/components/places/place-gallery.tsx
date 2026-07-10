"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { PlaceGalleryImage } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import styles from "./place-gallery.module.css";

type PlaceGalleryProps = {
  placeName: string;
  images: readonly PlaceGalleryImage[];
};

export function PlaceGallery({ placeName, images }: PlaceGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showNext, showPrev]);

  if (images.length < 2) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section className={styles.section} aria-labelledby="place-gallery-heading">
      <h2 id="place-gallery-heading" className={styles.heading}>
        Gallery
      </h2>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            className={styles.thumb}
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1} of ${placeName}`}
          >
            <Image
              src={publicImageSrc(image.src)}
              alt={image.alt ?? `${placeName} photo ${index + 1}`}
              fill
              className={styles.thumbImage}
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </button>
        ))}
      </div>

      {active && activeIndex !== null ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${placeName} gallery`}
          onClick={close}
        >
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              ×
            </button>
            <button type="button" className={styles.navPrev} onClick={showPrev} aria-label="Previous">
              ‹
            </button>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={publicImageSrc(active.src)}
                alt={active.alt ?? placeName}
                fill
                className={styles.lightboxImage}
                sizes="90vw"
                priority
              />
            </div>
            <button type="button" className={styles.navNext} onClick={showNext} aria-label="Next">
              ›
            </button>
            <div className={styles.meta}>
              <span>
                {activeIndex + 1} / {images.length}
              </span>
              {active.authorAttributions?.[0] ? (
                <span>
                  Photo:{" "}
                  {active.authorAttributions[0].uri ? (
                    <a
                      href={active.authorAttributions[0].uri}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {active.authorAttributions[0].displayName}
                    </a>
                  ) : (
                    active.authorAttributions[0].displayName
                  )}
                </span>
              ) : null}
              {active.googleMapsUri ? (
                <a href={active.googleMapsUri} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
