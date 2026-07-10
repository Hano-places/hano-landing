import Image from "next/image";
import type { PlaceMenuSection } from "@/content/places";
import { publicImageSrc } from "@/lib/public-image";
import styles from "./place-menu.module.css";

type PlaceMenuProps = {
  sections: readonly PlaceMenuSection[];
  menuUrl?: string;
  placeName: string;
};

export function PlaceMenu({ sections, menuUrl, placeName }: PlaceMenuProps) {
  if (sections.length === 0 && !menuUrl) return null;

  return (
    <section className={styles.section} aria-labelledby="place-menu-heading">
      <div className={styles.header}>
        <h2 id="place-menu-heading" className={styles.heading}>
          Menu highlights
        </h2>
        {menuUrl ? (
          <a
            href={menuUrl}
            className={styles.fullMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full menu
          </a>
        ) : null}
      </div>

      {sections.map((section) => (
        <div key={section.name} className={styles.menuSection}>
          <h3>{section.name}</h3>
          <ul className={styles.list}>
            {section.items.map((item) => (
              <li key={item.name} className={styles.item}>
                {item.image ? (
                  <div className={styles.itemImageWrap}>
                    <Image
                      src={publicImageSrc(item.image)}
                      alt={`${item.name} at ${placeName}`}
                      fill
                      className={styles.itemImage}
                      sizes="96px"
                    />
                  </div>
                ) : null}
                <div className={styles.itemBody}>
                  <div className={styles.itemTitleRow}>
                    <strong>{item.name}</strong>
                    {item.price ? <span className={styles.price}>{item.price}</span> : null}
                  </div>
                  {item.description ? (
                    <p className={styles.description}>{item.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
