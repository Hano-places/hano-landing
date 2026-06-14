export type Guide = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  updatedAt: string;
  intro: string;
  sections: readonly {
    heading: string;
    body: string;
    placeIds?: readonly string[];
  }[];
};

export const guides: readonly Guide[] = [
  {
    slug: "ultimate-kigali-food-guide",
    title: "Ultimate Kigali Food Guide",
    description:
      "A comprehensive guide to the best restaurants, cafés, and food experiences in Kigali, Rwanda.",
    datePublished: "2026-01-15",
    updatedAt: "2026-06-01T00:00:00.000Z",
    intro:
      "Kigali's food scene blends Rwandan tradition with global influences — from rooftop Afro-fusion to specialty coffee, fine dining, and neighborhood grills. This guide covers the essential places to eat across the city.",
    sections: [
      {
        heading: "Fine dining and special occasions",
        body: "For date nights and celebrations, Kigali offers standout fine dining rooms with tasting menus, art-forward spaces, and polished service.",
        placeIds: ["choose-kigali", "nyurah", "lilly", "le-youkounkoun"],
      },
      {
        heading: "Cafés and coffee culture",
        body: "Specialty coffee is thriving in Kigali. Look for farm-to-cup roasters, rooftop cafés, and garden settings perfect for remote work or slow mornings.",
        placeIds: ["question-coffee", "inzora", "casa-verde", "peacock-cafe"],
      },
      {
        heading: "Casual favorites and local flavors",
        body: "From Ethiopian injera platters to Pan-African kitchens and Lebanese mezze, these spots deliver flavor without the formality.",
        placeIds: ["habesha", "pan-afrikan", "fayrouz", "meze-fresh"],
      },
    ],
  },
  {
    slug: "best-date-night-restaurants-kigali",
    title: "Best Date Night Restaurants in Kigali",
    description:
      "Romantic restaurants in Kigali for date night — rooftop views, fine dining, and intimate settings.",
    datePublished: "2026-02-01",
    updatedAt: "2026-06-01T00:00:00.000Z",
    intro:
      "Planning a date in Kigali? These restaurants combine atmosphere, quality food, and memorable settings — from skyline views to intimate fine dining rooms.",
    sections: [
      {
        heading: "Rooftop and skyline views",
        body: "Nothing sets the mood like a rooftop sunset over Kigali. These spots pair views with craft cocktails and thoughtful menus.",
        placeIds: ["boho", "heaven", "pili-pili"],
      },
      {
        heading: "Intimate fine dining",
        body: "For a slower, more refined evening, reserve at one of Kigali's top fine dining destinations.",
        placeIds: ["choose-kigali", "lilly", "nyurah"],
      },
    ],
  },
  {
    slug: "hidden-gems-kigali",
    title: "Hidden Gems in Kigali",
    description:
      "Discover under-the-radar restaurants and cafés in Kigali that locals love.",
    datePublished: "2026-03-01",
    updatedAt: "2026-06-01T00:00:00.000Z",
    intro:
      "Beyond the well-known names, Kigali hides neighborhood favorites, quirky cafés, and spots that reward curious explorers.",
    sections: [
      {
        heading: "Neighborhood favorites",
        body: "These places may not always top the tourist lists, but they're beloved by locals for consistency, character, and value.",
        placeIds: ["chess-cafe", "chomad", "meze-fresh", "yt-burger"],
      },
      {
        heading: "Quiet corners worth finding",
        body: "Bookstore rooftops, garden cafés, and bistros off the main drag — perfect when you want something different.",
        placeIds: ["inzora", "poivre-noir", "peacock-cafe"],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
