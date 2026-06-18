"use client";

import type { Place } from "@/content/places";
import { Icon } from "@/components/ui/icon";
import {
  getDirectionsUrl,
  getGoogleMapsApiKey,
  getMapEmbedSearchUrl,
} from "@/lib/maps";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import styles from "./place-map.module.css";

type PlaceMapProps = {
  place: Place;
  className?: string;
};

export function PlaceMap({ place, className }: PlaceMapProps) {
  const apiKey = getGoogleMapsApiKey();
  const directionsUrl = getDirectionsUrl(place);
  const mapSearchUrl = getMapEmbedSearchUrl(place);

  if (!apiKey) {
    return (
      <div className={`${styles.fallback}${className ? ` ${className}` : ""}`}>
        <div className={styles.fallbackInner}>
          <Icon name="location" size={28} />
          <p className={styles.fallbackTitle}>{place.name}</p>
          <p className={styles.fallbackAddress}>
            {place.address.street}, {place.address.locality}
          </p>
          <a
            href={mapSearchUrl}
            className={styles.fallbackLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.mapWrap}${className ? ` ${className}` : ""}`}>
      <APIProvider apiKey={apiKey}>
        <Map
          className={styles.map}
          defaultCenter={{ lat: place.geo.lat, lng: place.geo.lng }}
          defaultZoom={15}
          gestureHandling="cooperative"
          disableDefaultUI
          mapId="hano-place-map"
        >
          <AdvancedMarker position={{ lat: place.geo.lat, lng: place.geo.lng }} />
        </Map>
      </APIProvider>
      <a
        href={directionsUrl}
        className={styles.directionsOverlay}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
