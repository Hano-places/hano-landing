"use client";

import Link from "next/link";
import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import { motion } from "motion/react";
import type { Place } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import { withHanoReferral } from "@/lib/place-links";
import { getOpenStatus } from "@/lib/place-hours";
import { Icon } from "@/components/ui/icon";
import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  CutoutCorner,
  useCutoutContentStaggerVariants,
} from "@/components/ui/cutout-card";
import styles from "@/components/ui/cutout-card.module.css";

type PlaceCutoutCardProps = {
  place: Place;
  href?: string;
  onOpenDetails?: (place: Place, rect: DOMRect | null) => void;
};

export function PlaceCutoutCard({
  place,
  href,
  onOpenDetails,
}: PlaceCutoutCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const stagger = useCutoutContentStaggerVariants();
  const { isOpen, todayHours } = getOpenStatus(place.hours);
  const popoverMode = Boolean(onOpenDetails) && !href;

  const handleCardClick = () => {
    if (!onOpenDetails) {
      return;
    }
    const rect = cardRef.current?.getBoundingClientRect() ?? null;
    onOpenDetails(place, rect);
  };

  const handleActionClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleCardKeyDown = (event: KeyboardEvent) => {
    if (!popoverMode) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  const card = (
    <CutoutCard
      onClick={popoverMode ? handleCardClick : undefined}
      onKeyDown={popoverMode ? handleCardKeyDown : undefined}
      role={popoverMode ? "button" : undefined}
      tabIndex={popoverMode ? 0 : undefined}
      aria-label={popoverMode ? `View details for ${place.name}` : undefined}
    >
      <CutoutCardMedia>
        <CutoutCardImage
          alt={place.name}
          sizes="(max-width: 639px) 78vw, (max-width: 899px) 45vw, (max-width: 1099px) 30vw, 22vw"
          src={publicImageSrc(place.image)}
        />
        <CutoutCardOverlay />

        <CutoutCardInsetLabel className={styles.insetLabelRating}>
          <span className={styles.insetEyebrow}>Rating</span>
          <span className={styles.insetValue}>
            {place.rating}
            <Icon name="star" size={16} />
          </span>
          <CutoutCorner className={styles.insetCornerRight} />
          <CutoutCorner className={styles.insetCornerTop} />
        </CutoutCardInsetLabel>

        <CutoutCardPin className={isOpen ? styles.pinOpen : styles.pinClosed}>
          {isOpen ? "Open now" : "Closed"}
          <CutoutCorner
            className={isOpen ? styles.pinCornerLeftOpen : styles.pinCornerLeftClosed}
            size={28}
          />
          <CutoutCorner
            className={isOpen ? styles.pinCornerBottomOpen : styles.pinCornerBottomClosed}
            size={28}
          />
        </CutoutCardPin>
      </CutoutCardMedia>

      <CutoutCardContent
        className={place.website ? styles.contentWithAction : undefined}
      >
        <motion.div
          animate="show"
          initial="hidden"
          style={{ display: "contents" }}
          variants={stagger.container}
        >
          <motion.div className={styles.metaRow} variants={stagger.item}>
            <span className={styles.metaRowText} title={place.category}>
              {place.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className={styles.price}>{place.priceRange}</span>
          </motion.div>

          <motion.h2
            className={styles.title}
            title={place.name}
            variants={stagger.item}
          >
            {place.name}
          </motion.h2>

          <motion.p
            className={styles.description}
            title={place.description}
            variants={stagger.item}
          >
            {place.description}
          </motion.p>

          <motion.div variants={stagger.item}>
            <CutoutCardFooter className={styles.footerBorder}>
              <div className={styles.footerMeta}>
                <Icon name="location" size={14} />
                <span className={styles.footerMetaText}>{place.location}</span>
              </div>
              <span className={styles.footerHours} title={`Today · ${todayHours}`}>
                {todayHours}
              </span>
            </CutoutCardFooter>
          </motion.div>
        </motion.div>
      </CutoutCardContent>

      {place.website ? (
        <CutoutCardAction className={styles.actionPos}>
          <a
            className={styles.actionButton}
            href={withHanoReferral(place.website)}
            rel="noopener noreferrer"
            target="_blank"
            onClick={handleActionClick}
          >
            Visit
          </a>
        </CutoutCardAction>
      ) : null}
    </CutoutCard>
  );

  return (
    <div
      ref={cardRef}
      className={popoverMode ? styles.cardInteractive : undefined}
    >
      {href ? (
        <Link href={href} className={styles.cardLink}>
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  );
}
