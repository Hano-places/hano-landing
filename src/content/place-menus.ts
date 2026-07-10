import type { PlaceMenuSection } from "./place-types";

/**
 * Curated menu highlights from official venues / public menus.
 * Dish images are filled when available under public/places/{id}/menu/.
 */
export const curatedMenusById: Record<
  string,
  { menuUrl?: string; menu: readonly PlaceMenuSection[] }
> = {
  boho: {
    menuUrl: "https://www.boho.rw/",
    menu: [
      {
        name: "Signature",
        items: [
          {
            name: "Afro-fusion tasting plates",
            description: "Seasonal shared plates with Rwandan and continental flavors.",
            price: "From RWF 18,000",
          },
          {
            name: "Craft cocktails",
            description: "House cocktails with local botanicals and rooftop views.",
            price: "From RWF 8,000",
          },
        ],
      },
    ],
  },
  "pili-pili": {
    menuUrl: "https://www.pilipilirwanda.rw/",
    menu: [
      {
        name: "Wood-fired & poolside",
        items: [
          {
            name: "Wood-fired pizza",
            description: "Classic and seasonal pizzas from the wood oven.",
            price: "From RWF 12,000",
          },
          {
            name: "Poolside sharing plates",
            description: "Light bites for sunset sessions overlooking the hills.",
          },
        ],
      },
    ],
  },
  heaven: {
    menuUrl: "https://heavenrwanda.com/",
    menu: [
      {
        name: "Dining",
        items: [
          {
            name: "Modern African mains",
            description: "Local produce with panoramic Kiyovu views.",
          },
          {
            name: "Breakfast & brunch",
            description: "Hotel breakfast and weekend brunch favorites.",
          },
        ],
      },
    ],
  },
  "casa-verde": {
    menuUrl: "https://casaverde.rw/",
    menu: [
      {
        name: "All day",
        items: [
          {
            name: "Garden café classics",
            description: "Coffee, brunch plates, and all-day dining in the garden.",
          },
          {
            name: "Bar bites",
            description: "Evening small plates and drinks.",
          },
        ],
      },
    ],
  },
  "question-coffee": {
    menuUrl: "https://www.questioncoffee.com/",
    menu: [
      {
        name: "Coffee",
        items: [
          {
            name: "Farm-to-cup espresso",
            description: "Specialty coffee from women-led Rwandan cooperatives.",
          },
          {
            name: "Filter & pour-over",
            description: "Single-origin pour-overs and seasonal filter options.",
          },
        ],
      },
    ],
  },
  "choose-kigali": {
    menuUrl: "https://www.choosekigali.com/",
    menu: [
      {
        name: "Tasting",
        items: [
          {
            name: "Omakase tasting menu",
            description: "Guest chef residencies and art-gallery dining.",
          },
          {
            name: "Wine pairings",
            description: "Curated wines matched to the tasting experience.",
          },
        ],
      },
    ],
  },
  "peacock-cafe": {
    menuUrl: "https://peacockgarden.net/",
    menu: [
      {
        name: "Garden café",
        items: [
          {
            name: "Garden lunch plates",
            description: "Refined plates in a calm Kiyovu garden setting.",
          },
          {
            name: "Specialty coffee",
            description: "Coffee shop favorites alongside the restaurant menu.",
          },
        ],
      },
    ],
  },
  nyurah: {
    menuUrl: "https://www.nyurah.com/",
    menu: [
      {
        name: "Contemporary African",
        items: [
          {
            name: "Seasonal tasting menu",
            description: "Contemporary African cuisine — reservations recommended.",
          },
          {
            name: "Vegan tasting options",
            description: "Plant-forward courses available on request.",
          },
        ],
      },
    ],
  },
  lilly: {
    menuUrl: "https://lilly-rwanda.com/",
    menu: [
      {
        name: "Fine dining",
        items: [
          {
            name: "Seasonal tasting menu",
            description: "Intimate contemporary fine dining in Kimihurura.",
          },
        ],
      },
    ],
  },
  "yt-burger": {
    menuUrl: "https://www.ytburger.com/",
    menu: [
      {
        name: "Burgers & wine",
        items: [
          {
            name: "Gourmet burgers",
            description: "Signature burgers with a lively Gishushu bistro vibe.",
          },
          {
            name: "Natural wines",
            description: "Curated wine list to pair with burgers and sides.",
          },
        ],
      },
    ],
  },
  "repub-lounge": {
    menuUrl: "https://republounge.com/",
    menu: [
      {
        name: "East African",
        items: [
          {
            name: "East African classics",
            description: "Upscale regional cuisine across two floors.",
          },
        ],
      },
    ],
  },
  brioche: {
    menuUrl: "https://www.briocherwanda.com/",
    menu: [
      {
        name: "Bakery",
        items: [
          {
            name: "French pastries",
            description: "Croissants, breads, and espresso across Kigali locations.",
          },
          {
            name: "Breakfast plates",
            description: "Café bistro breakfast and brunch favorites.",
          },
        ],
      },
    ],
  },
  fayrouz: {
    menuUrl: "https://fayrouz-africa.com/",
    menu: [
      {
        name: "Lebanese",
        items: [
          {
            name: "Mezze platters",
            description: "Shared Lebanese mezze and grills.",
          },
        ],
      },
    ],
  },
  "poivre-noir": {
    menuUrl: "https://poivrenoirbistro.com/",
    menu: [
      {
        name: "Bistro",
        items: [
          {
            name: "Contemporary bistro plates",
            description: "Wine pairings and private dining in Kimihurura.",
          },
        ],
      },
    ],
  },
  "le-youkounkoun": {
    menuUrl: "https://www.leyoukounkoun.rw/menu",
    menu: [
      {
        name: "Tasting",
        items: [
          {
            name: "5-course tasting menu",
            description: "Seasonal tasting menu at Simba Center.",
            price: "RWF 90,000",
          },
          {
            name: "7-course tasting menu",
            description: "Extended tasting experience.",
            price: "RWF 120,000",
          },
        ],
      },
    ],
  },
  "sole-luna": {
    menuUrl: "https://www.soleluna.company/",
    menu: [
      {
        name: "Italian",
        items: [
          {
            name: "Wood-fired pizza",
            description: "Classic Italian pizzas and pasta in Kiyovu.",
            image: "/places/sole-luna/official-1.jpg",
          },
          {
            name: "Pasta & wine",
            description: "House pastas with an Italian wine list.",
          },
        ],
      },
    ],
  },
  "pan-afrikan": {
    menuUrl: "https://panafrikancuisine.com/four-seasons-menu",
    menu: [
      {
        name: "Pan-African",
        items: [
          {
            name: "Four seasons menu",
            description: "Rotating plates from across the continent.",
            image: "/places/pan-afrikan/official-1.jpeg",
          },
          {
            name: "Plant-based living",
            description: "Vegan and vegetarian African dishes.",
          },
        ],
      },
    ],
  },
  "meze-fresh": {
    menu: [
      {
        name: "Cali-Mex",
        items: [
          {
            name: "Burritos & bowls",
            description: "Build-your-own burritos, tacos, and bowls.",
            image: "/places/meze-fresh/official-1.jpg",
          },
        ],
      },
    ],
  },
  inzora: {
    menu: [
      {
        name: "Café",
        items: [
          {
            name: "Rooftop café plates",
            description: "Light bites, coffee, and hill views above Ikirezi.",
            image: "/places/inzora/official-1.jpg",
          },
        ],
      },
    ],
  },
  habesha: {
    menu: [
      {
        name: "Ethiopian",
        items: [
          {
            name: "Injera platters",
            description: "Shared wat stews on injera with coffee ceremony.",
            image: "/places/habesha/official-3.jpg",
          },
        ],
      },
    ],
  },
  chomad: {
    menu: [
      {
        name: "Grill & bar",
        items: [
          {
            name: "Nyama choma & cocktails",
            description: "Grilled meats and signature cocktails.",
            image: "/places/chomad/official-3.jpg",
          },
        ],
      },
    ],
  },
  "chess-cafe": {
    menu: [
      {
        name: "Café",
        items: [
          {
            name: "Soups, sandwiches & coffee",
            description: "Homemade bread, soups, and board games downtown.",
            image: "/places/chess-cafe/official-2.jpg",
          },
        ],
      },
    ],
  },
};
