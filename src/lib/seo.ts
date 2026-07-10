import type { Metadata } from "next";
import { site } from "@/content/landing";
import type { Place } from "@/content/places";
import {
  categorySegmentLabel,
  categorySegmentSingular,
  placeCategorySegment,
  placeUrlFromParts,
  type CategorySegment,
} from "@/lib/places-slug";

const DEFAULT_OG_IMAGE = "/thumbnail/thumbnail.png";
const MAX_DESCRIPTION_LENGTH = 160;

export type FAQItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type SitemapEntry = {
  path: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

function truncateDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION_LENGTH) {
    return text;
  }
  return `${text.slice(0, MAX_DESCRIPTION_LENGTH - 3).trimEnd()}...`;
}

export function buildCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "" : normalized}`;
}

export function absoluteUrl(path: string): string {
  return buildCanonical(path);
}

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
};

export function buildPageMetadata({
  path,
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: PageMetadataInput): Metadata {
  const canonical = buildCanonical(path);
  const trimmedDescription = truncateDescription(description);

  return {
    title,
    description: trimmedDescription,
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: trimmedDescription,
      url: canonical,
      siteName: site.name,
      type: ogType,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 631,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: trimmedDescription,
      images: [ogImage],
    },
  };
}

export function buildBusinessMetadata(place: Place): Metadata {
  const segment = placeCategorySegment(place.type);
  const path = placeUrlFromParts(place.type, place.slug);
  const categoryLabel = categorySegmentSingular(segment);
  const title = `${place.name} | ${categoryLabel} in Kigali | ${site.name}`;
  const description = truncateDescription(
    `Discover menus, reviews, ratings, photos, opening hours, and more for ${place.name} on ${site.name}.`,
  );

  return buildPageMetadata({
    path,
    title,
    description,
    ogImage: place.image,
  });
}

export function buildCategoryMetadata(segment: CategorySegment): Metadata {
  const label = categorySegmentLabel(segment);
  const path = `/${segment}`;
  const title = `Best ${label} in Rwanda | ${site.name}`;
  const description = truncateDescription(
    `Explore the best ${label.toLowerCase()} in Rwanda — ratings, hours, neighborhoods, and curated picks in Kigali on ${site.name}.`,
  );

  return buildPageMetadata({ path, title, description });
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    logo: absoluteUrl("/thumbnail/thumbnail.png"),
    sameAs: Object.values(site.social),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description:
      "Discover restaurants, cafés, bars, hotels, and places to visit in Rwanda.",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/places?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export type NavSchemaLink = {
  name: string;
  path: string;
};

export const SITELINK_NAV: readonly NavSchemaLink[] = [
  { name: "Restaurants", path: "/restaurants" },
  { name: "Places", path: "/places" },
  { name: "Rwanda", path: "/rwanda" },
  { name: "Guides", path: "/guides" },
  { name: "Rankings", path: "/rankings" },
  { name: "Download App", path: "/download" },
  { name: "List Your Business", path: "/business" },
  { name: "FAQ", path: "/faq" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
] as const;

export function buildSiteNavigationSchema(
  links: readonly NavSchemaLink[] = SITELINK_NAV,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} site navigation`,
    itemListElement: links.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.name,
      url: absoluteUrl(link.path),
    })),
  };
}

export function buildFAQSchema(faqs: readonly FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function priceRangeToSchema(priceRange: Place["priceRange"]): string {
  switch (priceRange) {
    case "$":
      return "$";
    case "$$":
      return "$$";
    case "$$$":
      return "$$$";
    case "$$$$":
      return "$$$$";
    default:
      return "$$";
  }
}

function schemaTypeForPlace(type: Place["type"]): string {
  switch (type) {
    case "cafe":
    case "bakery":
      return "CafeOrCoffeeShop";
    case "bar":
      return "BarOrPub";
    default:
      return "Restaurant";
  }
}

function buildOpeningHoursSpecification(hours: Place["hours"]) {
  const dayMap: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return Object.entries(hours).map(([day, value]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayMap[day],
    description: value,
  }));
}

export function buildRestaurantSchema(place: Place) {
  const path = placeUrlFromParts(place.type, place.slug);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaTypeForPlace(place.type),
    name: place.name,
    description: place.description,
    url: absoluteUrl(path),
    image: absoluteUrl(place.image),
    priceRange: priceRangeToSchema(place.priceRange),
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address.street,
      addressLocality: place.address.locality,
      addressRegion: place.address.region,
      addressCountry: place.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.geo.lat,
      longitude: place.geo.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: place.rating,
      bestRating: 5,
      ratingCount: place.reviews.length || 1,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(place.hours),
  };

  if (place.phone) {
    schema.telephone = place.phone;
  }

  if (place.website) {
    schema.sameAs = place.sameAs.length > 0 ? place.sameAs : [place.website];
  } else if (place.sameAs.length > 0) {
    schema.sameAs = place.sameAs;
  }

  if (place.reviews.length > 0) {
    schema.review = place.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
    }));
  }

  return schema;
}

export function buildItemListSchema(
  places: readonly Place[],
  listName: string,
  listPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: absoluteUrl(listPath),
    numberOfItems: places.length,
    itemListElement: places.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: place.name,
      url: absoluteUrl(placeUrlFromParts(place.type, place.slug)),
    })),
  };
}

export function buildCollectionPageSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    datePublished: article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/thumbnail/thumbnail.png"),
      },
    },
  };
}

export { DEFAULT_OG_IMAGE, MAX_DESCRIPTION_LENGTH };
