"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Place } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import {
  formatWeeklyHours,
  getOpenStatus,
} from "@/lib/place-hours";
import { withHanoReferral } from "@/lib/place-links";
import { Icon } from "@/components/ui/icon";
import {
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  CutoutCorner,
} from "@/components/ui/cutout-card";
import cutoutStyles from "@/components/ui/cutout-card.module.css";
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelDivider,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelRoot,
  useFloatingPanel,
} from "@/components/ui/floating-panel";
import panelStyles from "@/components/ui/floating-panel.module.css";
import styles from "./place-details-popover.module.css";

type PlaceDetailsContextValue = {
  openPlaceDetails: (place: Place, rect: DOMRect | null) => void;
};

const PlaceDetailsContext = createContext<PlaceDetailsContextValue | null>(null);

export function usePlaceDetails() {
  const context = useContext(PlaceDetailsContext);
  if (!context) {
    throw new Error("usePlaceDetails must be used within PlaceDetailsProvider");
  }
  return context;
}

function PlaceDetailsHero({ place }: { place: Place }) {
  const { isOpen } = getOpenStatus(place.hours);

  return (
    <div className={styles.hero}>
      <CutoutCardMedia className={styles.heroMedia} style={{ height: "9.5rem" }}>
        <CutoutCardImage
          alt={place.name}
          sizes="340px"
          src={publicImageSrc(place.image)}
        />
        <CutoutCardOverlay />

        <CutoutCardInsetLabel className={cutoutStyles.insetLabelRating}>
          <span className={cutoutStyles.insetEyebrow}>Rating</span>
          <span className={cutoutStyles.insetValue}>
            {place.rating}
            <Icon name="star" size={16} />
          </span>
          <CutoutCorner className={cutoutStyles.insetCornerRight} />
          <CutoutCorner className={cutoutStyles.insetCornerTop} />
        </CutoutCardInsetLabel>

        <CutoutCardPin className={isOpen ? cutoutStyles.pinOpen : cutoutStyles.pinClosed}>
          {isOpen ? "Open now" : "Closed"}
          <CutoutCorner
            className={isOpen ? cutoutStyles.pinCornerLeftOpen : cutoutStyles.pinCornerLeftClosed}
            size={28}
          />
          <CutoutCorner
            className={isOpen ? cutoutStyles.pinCornerBottomOpen : cutoutStyles.pinCornerBottomClosed}
            size={28}
          />
        </CutoutCardPin>
      </CutoutCardMedia>
    </div>
  );
}

function PlaceDetailsPanel({ place }: { place: Place }) {
  const titleId = useId();
  const { isOpen, todayHours } = getOpenStatus(place.hours);
  const weeklyHours = formatWeeklyHours(place.hours);

  return (
    <FloatingPanelContent
      header={<PlaceDetailsHero place={place} />}
      titleId={titleId}
    >
      <div className={panelStyles.panelScroll}>
        <div className={styles.titleBlock}>
          <h2 className={styles.placeName} id={titleId}>
            {place.name}
          </h2>
        </div>

        <FloatingPanelHeader>Quick actions</FloatingPanelHeader>

        <FloatingPanelBody>
          <div className={styles.summary}>
            <p className={styles.category}>{place.category}</p>
            <div className={styles.summaryMeta}>
              <span className={styles.location}>
                <Icon name="location" size={14} />
                {place.location}
              </span>
              <span className={styles.price}>{place.priceRange}</span>
            </div>
            <p className={styles.description}>{place.description}</p>
          </div>

          <div className={styles.hoursSection}>
            <div className={styles.hoursHeading}>
              <Icon name="clock" size={15} />
              <span>Opening hours</span>
              <span
                className={`${styles.statusPill} ${isOpen ? styles.statusOpen : styles.statusClosed}`}
              >
                {isOpen ? "Open now" : "Closed"}
              </span>
            </div>
            <p className={styles.todayHours}>
              Today · <strong>{todayHours}</strong>
            </p>
            <ul className={styles.hoursList}>
              {weeklyHours.map((entry) => (
                <li key={entry.day}>
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            {place.website ? (
              <FloatingPanelButton href={withHanoReferral(place.website)}>
                <Icon name="restaurant" size={16} />
                Visit website
              </FloatingPanelButton>
            ) : null}
            <FloatingPanelButton
              onClick={() => {
                const query = encodeURIComponent(`${place.name} ${place.location} Kigali`);
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${query}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <Icon name="location" size={16} />
              Get directions
            </FloatingPanelButton>
            <FloatingPanelButton
              onClick={() => {
                void navigator.clipboard?.writeText(place.name);
              }}
            >
              <Icon name="sparkles" size={16} />
              Copy place name
            </FloatingPanelButton>
          </div>
        </FloatingPanelBody>

        <FloatingPanelDivider />

        <FloatingPanelFooter>
          <div className={styles.rating}>
            {place.rating}
            <Icon name="star" size={14} />
          </div>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </div>
    </FloatingPanelContent>
  );
}

function PlaceDetailsInner({ children }: { children: ReactNode }) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { openFloatingPanel, isOpen } = useFloatingPanel();

  const openPlaceDetails = useCallback(
    (place: Place, rect: DOMRect | null) => {
      setSelectedPlace(place);
      openFloatingPanel(rect, place.name, "bottom-center");
    },
    [openFloatingPanel],
  );

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => setSelectedPlace(null), 320);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const value = useMemo(() => ({ openPlaceDetails }), [openPlaceDetails]);

  return (
    <PlaceDetailsContext.Provider value={value}>
      {children}
      {selectedPlace ? <PlaceDetailsPanel place={selectedPlace} /> : null}
    </PlaceDetailsContext.Provider>
  );
}

export function PlaceDetailsProvider({ children }: { children: ReactNode }) {
  return (
    <FloatingPanelRoot>
      <PlaceDetailsInner>{children}</PlaceDetailsInner>
    </FloatingPanelRoot>
  );
}
