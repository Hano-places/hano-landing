import Image from "next/image";
import { categories } from "@/content/landing";
import { publicImageSrc } from "@/lib/public-image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import styles from "./category-marquee.module.css";

type CategoryItem = { label: string; image: string };

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly CategoryItem[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`${styles.row} ${reverse ? styles.rowReverse : ""}`}
      aria-hidden={reverse}
    >
      {doubled.map((item, i) => (
        <div key={`${item.label}-${i}`} className={styles.item}>
          <Image
            src={publicImageSrc(item.image)}
            alt=""
            width={48}
            height={48}
            className={styles.thumb}
          />
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CategoryMarqueeSection() {
  const half = Math.ceil(categories.items.length / 2);
  const row1 = categories.items.slice(0, half);
  const row2 = categories.items.slice(half);

  return (
    <Section
      id={categories.id}
      className={styles.section}
      ariaLabelledBy="categories-heading"
    >
      <Container>
        <div className={styles.header}>
          <div className={styles.glassPanel}>
            <h2 id="categories-heading" className={styles.headline}>
              {categories.headline.before}{" "}
              <SerifEmphasis>{categories.headline.emphasis}</SerifEmphasis>
            </h2>
            <p className={styles.supporting}>{categories.supporting}</p>
          </div>
        </div>
      </Container>
      <div className={styles.marquee}>
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </Section>
  );
}
