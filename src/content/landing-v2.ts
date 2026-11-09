/** Copy and screens for the homepage. Screens are real captures from the Hano app (public/app). */

export const SCREEN = {
  feed: "/app/discover.webp",
  post: "/app/post-livia-kurry-kingdom.webp",
  postSalim: "/app/post-salim-burger-planet.webp",
  place: "/app/place-kurry-kingdom.webp",
  placeJp: "/app/place-jp-signature.webp",
  visitors: "/app/place-kurry-kingdom-visitors.webp",
  map: "/app/map.webp",
  leaderboard: "/app/leaderboard.webp",
  profile: "/app/profile-livia.webp",
  search: "/app/search.webp",
  burgerPlanet: "/app/place-burger-planet.webp",
  slides: [
    "/app/feed-livia-1.webp",
    "/app/feed-livia-2.webp",
    "/app/feed-livia-3.webp",
    "/app/feed-livia-4.webp",
    "/app/feed-livia-5.webp",
    "/app/feed-livia-6.webp",
    "/app/feed-livia-7.webp",
  ],
} as const;

/** Screens in a real iPhone frame (1380×2780 with side buttons); served at 720 wide. */
export const PHONE = { width: 720, height: 1450 } as const;

export const heroV2 = {
  eyebrow: "Free on iPhone & Android",
  title: { before: "Find your next", emphasis: "favourite", after: "place in Kigali." },
  sub: "Real photos and reviews from people you follow. Check in, earn points, and see where your friends go.",
  desktopHint: "On a computer? Open hano.now/get on your phone.",
} as const;

export const stripV2 = {
  title: "Real places. Real people.",
  sub: "Every post on Hano is someone who was actually there. Swipe through their photos, then go see for yourself.",
} as const;

export const featuresV2 = [
  {
    id: "feed",
    kicker: "Your feed",
    title: "See where your friends go",
    body: "Photos and reviews from people you follow. Their ring lights up when there’s something new.",
    points: ["Friends’ check-ins and posts", "Photos from the place itself", "Like, comment and react"],
    screens: [SCREEN.postSalim, SCREEN.burgerPlanet],
  },
  {
    id: "places",
    kicker: "Every place",
    title: "Everything before you go",
    body: "Photos, menu, hours and directions. See who’s been and what they posted.",
    points: ["Menus and opening hours", "Directions, call and website", "A board of visitors’ photos"],
    screens: [SCREEN.place, SCREEN.visitors],
  },
  {
    id: "map",
    kicker: "The map",
    title: "Explore the city around you",
    body: "Restaurants, cafés, nightlife and more, on one map. Switch to My Map to see everywhere you’ve been.",
    points: ["What’s trending near you", "Filters by kind of place", "Your own map of visits"],
    screens: [SCREEN.map, SCREEN.search],
  },
  {
    id: "points",
    kicker: "Points & badges",
    title: "Get rewarded for exploring",
    body: "Check in, review and share to earn Hano points. Climb the Kigali leaderboard and collect badges.",
    points: ["Points for every visit", "Weekly Top Explorers", "Badges as you go"],
    screens: [SCREEN.leaderboard, SCREEN.profile],
  },
] as const;

export const webVsApp = {
  title: "Browse here. Do more in the app.",
  sub: "You can look up places on hano.now. Everything else happens in the app.",
  web: {
    label: "On hano.now",
    items: ["Browse places and menus", "Open links friends share", "See a place’s photos"],
  },
  app: {
    label: "In the Hano app",
    items: [
      "Check in and earn points",
      "Rate places and post photos",
      "Follow friends and see their feed",
      "Save places and make lists",
      "Plan visits together",
      "Climb the leaderboard",
    ],
  },
} as const;

export const businessV2 = {
  title: "Own a place? Claim it.",
  body: "Get a verified page with your own address, like yourplace.hano.now. Add your menu, hours and offers, and see who visits.",
  cta: "List your business",
} as const;

export const finalV2 = {
  title: { before: "Your city is", emphasis: "waiting", after: "." },
  sub: "Download Hano free and find your next favourite place today.",
} as const;
