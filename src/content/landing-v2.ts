/** Copy and screens for the homepage. Screens are real captures from the Hano app (public/app). */

export const SCREEN = {
  feed: "/app/feed-manzi-2.webp",
  post: "/app/post-uwase-kurry-kingdom.webp",
  postSalim: "/app/post-salim-burger-planet.webp",
  place: "/app/place-kurry-kingdom.webp",
  placeJp: "/app/place-jp-signature.webp",
  movenpick: "/app/place-movenpick.webp",
  visitors: "/app/place-kurry-kingdom-visitors.webp",
  map: "/app/map.webp",
  leaderboard: "/app/leaderboard.webp",
  profile: "/app/profile-patrick.webp",
  search: "/app/search.webp",
  burgerPlanet: "/app/place-burger-planet.webp",
  planMenu: "/app/plan-menu-pili-pili.webp",
  plan: "/app/plan-pili-pili.webp",
  /** Manzi's moment at Pili Pili, one screen per photo. */
  slides: [
    "/app/feed-manzi-1.webp",
    "/app/feed-manzi-2.webp",
    "/app/feed-manzi-3.webp",
    "/app/feed-manzi-4.webp",
    "/app/feed-manzi-5.webp",
    "/app/feed-manzi-6.webp",
  ],
} as const;

/** Screens in a real iPhone frame (1380×2780 with side buttons); served at 720 wide. */
export const PHONE = { width: 720, height: 1450 } as const;

export const heroV2 = {
  eyebrow: "Free on iPhone & Android",
  title: { before: "Find your next", emphasis: "favourite", after: "place in Kigali." },
  sub: "Real photos and reviews from people you follow. Check in, earn points, and see where your friends go.",
} as const;

export const storyV2 = {
  title: "How Hano works",
  sub: "Scroll through what you can do. Everything you see here is the real app.",
} as const;

/** One step per screen in the "How Hano works" scroll; steps with several screens play through them. */
export const stepsV2 = [
  {
    id: "real",
    title: "Real places. Real people.",
    body: "Every post on Hano is someone who was actually there. Swipe through their photos, then go see for yourself.",
    points: ["Photos from the visit itself", "Stars and a few honest words", "No ads dressed up as reviews"],
    screens: SCREEN.slides,
  },
  {
    id: "feed",
    title: "See where your friends go",
    body: "Photos and reviews from people you follow. Their ring lights up when there’s something new.",
    points: ["Friends’ check-ins and posts", "Like, comment and react"],
    screens: [SCREEN.postSalim],
  },
  {
    id: "places",
    title: "Everything before you go",
    body: "Photos, menu, hours and directions. See who’s been and what they posted.",
    points: ["Menus with prices", "Directions, call and website"],
    screens: [SCREEN.place],
  },
  {
    id: "plan",
    title: "Plan the night together",
    body: "Pick dishes from the menu and watch the total against your budget. Invite friends and they add theirs. Here’s a night at Pili Pili.",
    points: ["Menus with today’s prices", "A budget that keeps count", "Friends add their own dishes"],
    screens: [SCREEN.planMenu, SCREEN.plan],
    interval: 2600,
  },
  {
    id: "search",
    title: "Find exactly what you’re craving",
    body: "Search places, dishes and people. Browse what’s trending, new places and offers, or explore it all on the map.",
    points: ["Dishes across every menu", "Trending and new this week"],
    screens: [SCREEN.search],
  },
  {
    id: "points",
    title: "Get rewarded for exploring",
    body: "Check in, review and share photos to earn points. Climb the weekly Top Explorers and collect badges.",
    points: ["Points for every visit", "A fresh board every Monday"],
    screens: [SCREEN.leaderboard],
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
