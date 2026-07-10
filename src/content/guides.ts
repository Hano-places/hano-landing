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
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Kigali's food scene blends Rwandan tradition with global influences — from rooftop Afro-fusion to specialty coffee, fine dining, and neighborhood grills. Whether you are a local looking for your next favorite spot or a visitor planning meals around the city, this guide covers the essential places to eat across Kigali and how they fit into Rwanda's wider hospitality landscape. Use it alongside Hano's restaurant and café listings to compare ratings, hours, and neighborhoods before you go.",
    sections: [
      {
        heading: "Fine dining and special occasions",
        body: "For date nights and celebrations, Kigali offers standout fine dining rooms with tasting menus, art-forward spaces, and polished service. These restaurants are among the most searched hospitality experiences in Rwanda for special occasions.",
        placeIds: ["choose-kigali", "nyurah", "lilly", "le-youkounkoun"],
      },
      {
        heading: "Cafés and coffee culture",
        body: "Specialty coffee is thriving in Kigali. Look for farm-to-cup roasters, rooftop cafés, and garden settings perfect for remote work or slow mornings — a core part of how people discover places to visit in Rwanda's capital.",
        placeIds: ["question-coffee", "inzora", "casa-verde", "peacock-cafe"],
      },
      {
        heading: "Casual favorites and local flavors",
        body: "From Ethiopian injera platters to Pan-African kitchens and Lebanese mezze, these spots deliver flavor without the formality. They are reliable answers when someone asks where to eat in Kigali.",
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
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Planning a date in Kigali? These restaurants combine atmosphere, quality food, and memorable settings — from skyline views to intimate fine dining rooms. Romantic dining is one of the most common hospitality searches in Rwanda's capital, and Hano highlights places with strong ratings, clear hours, and neighborhood context so you can book with confidence.",
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
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Beyond the well-known names, Kigali hides neighborhood favorites, quirky cafés, and spots that reward curious explorers. Hidden gems matter for organic discovery — they are the places locals recommend when tourists ask for authentic food experiences in Rwanda.",
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
  {
    slug: "weekend-guide-kigali",
    title: "Weekend Guide to Kigali Food",
    description:
      "A weekend food itinerary for Kigali — brunch, lunch, dinner, and nightlife across Rwanda's capital.",
    datePublished: "2026-04-01",
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Weekends in Kigali are made for long brunches, late lunches, and rooftop evenings. This guide maps a simple food itinerary across neighborhoods so you can plan Saturday and Sunday without guesswork — and jump into Hano listings for hours and ratings.",
    sections: [
      {
        heading: "Saturday brunch and coffee",
        body: "Start slow with specialty coffee and garden cafés before the city fills up.",
        placeIds: ["question-coffee", "casa-verde", "brioche"],
      },
      {
        heading: "Saturday night out",
        body: "Rooftops, lounges, and lively dinners for when you want atmosphere.",
        placeIds: ["boho", "pili-pili", "repub-lounge"],
      },
      {
        heading: "Sunday reset",
        body: "Relaxed meals and neighborhood favorites to close the weekend.",
        placeIds: ["heaven", "sole-luna", "peacock-cafe"],
      },
    ],
  },
  {
    slug: "best-coffee-shops-kigali",
    title: "Best Coffee Shops in Kigali",
    description:
      "The best cafés and specialty coffee shops in Kigali, Rwanda — for work, brunch, and slow mornings.",
    datePublished: "2026-05-01",
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Rwanda is famous for coffee, and Kigali's café culture keeps growing. From farm-to-cup specialty shops to leafy garden cafés, these are the best places for coffee, light meals, and remote work — ranked and linked on Hano for easy discovery.",
    sections: [
      {
        heading: "Specialty and farm-to-cup",
        body: "Cafés that celebrate Rwandan coffee with careful roasting and barista craft.",
        placeIds: ["question-coffee", "inzora"],
      },
      {
        heading: "Garden and all-day cafés",
        body: "Relaxed settings for brunch, meetings, and long afternoons.",
        placeIds: ["casa-verde", "peacock-cafe", "chess-cafe"],
      },
    ],
  },
  {
    slug: "best-breakfast-places-kigali",
    title: "Best Breakfast Places in Kigali",
    description:
      "Where to eat breakfast and brunch in Kigali — bakeries, cafés, and hotel restaurants.",
    datePublished: "2026-06-01",
    updatedAt: "2026-07-01T00:00:00.000Z",
    intro:
      "Breakfast searches are high-intent in Kigali: people want open hours, reliable spots, and good coffee. This guide covers bakeries, cafés, and restaurants that start the day well — with links to full Hano profiles.",
    sections: [
      {
        heading: "Bakeries and pastries",
        body: "Fresh bread, pastries, and espresso for an easy morning start.",
        placeIds: ["brioche"],
      },
      {
        heading: "Cafés and hotel breakfasts",
        body: "All-day cafés and restaurants with strong morning menus and views.",
        placeIds: ["heaven", "casa-verde", "peacock-cafe", "question-coffee"],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
