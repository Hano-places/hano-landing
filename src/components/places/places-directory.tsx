"use client";

import { useMemo, useState } from "react";
import {
  placeFilters,
  placesPage,
  type PlaceFilter,
} from "@/content/places";
import { getStaticPlaces } from "@/lib/places-data";
import { filterPlaces } from "@/lib/places-search";
import { placeUrlFromParts } from "@/lib/places-slug";
import { Icon } from "@/components/ui/icon";
import { PlaceCutoutCard } from "./place-cutout-card";
import styles from "./places-directory.module.css";

export function PlacesDirectory() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<PlaceFilter>("all");
  const places = getStaticPlaces();

  const results = useMemo(
    () => filterPlaces(places, query, activeFilter),
    [places, query, activeFilter],
  );

  return (
    <div className={styles.directory}>
      <div className={styles.toolbar}>
        <label className={styles.searchWrap}>
          <Icon name="search" size={20} className={styles.searchIcon} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placesPage.searchPlaceholder}
            className={styles.searchInput}
            aria-label="Search places"
          />
        </label>

        <div className={styles.filters} role="tablist" aria-label="Filter places">
          {placeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`${styles.filterChip} ${activeFilter === filter.id ? styles.filterChipActive : ""}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.resultsMeta}>
        {results.length} {results.length === 1 ? "place" : "places"}
        {query ? ` matching “${query}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className={styles.grid} role="list">
          {results.map((place) => (
            <div key={place.id} className={styles.gridItem} role="listitem">
              <PlaceCutoutCard
                place={place}
                href={placeUrlFromParts(place.type, place.slug)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Icon name="search" size={28} />
          <p>{placesPage.emptyState}</p>
        </div>
      )}
    </div>
  );
}
