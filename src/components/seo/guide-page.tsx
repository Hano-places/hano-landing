import Link from "next/link";
import type { Guide } from "@/content/guides";
import { placeUrlFromParts } from "@/lib/places-slug";
import { getStaticPlaces } from "@/lib/places-data";
import styles from "./guide-page.module.css";

type GuidePageContentProps = {
  guide: Guide;
};

export function GuidePageContent({ guide }: GuidePageContentProps) {
  const placesById = new Map(getStaticPlaces().map((place) => [place.id, place]));

  return (
    <article className={styles.article}>
      <p className={styles.eyebrow}>Guide</p>
      <h1 className={styles.title}>{guide.title}</h1>
      <p className={styles.intro}>{guide.intro}</p>

      {guide.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
          {section.placeIds?.length ? (
            <ul className={styles.placeList}>
              {section.placeIds.map((placeId) => {
                const place = placesById.get(placeId);
                if (!place) return null;
                return (
                  <li key={placeId}>
                    <Link href={placeUrlFromParts(place.type, place.slug)}>
                      <strong>{place.name}</strong>
                      <span>
                        {place.location} · {place.rating}★
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
