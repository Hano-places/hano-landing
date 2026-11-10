/** Copy for the /business landing page. Only what the Hano app really does today. */
import { SCREEN } from "./landing-v2";

export const bizHero = {
  eyebrow: "For restaurants, cafés, bars & hotels in Kigali",
  title: { before: "Turn Kigali’s explorers into your", emphasis: "regulars", after: "." },
  sub: "People open Hano to decide where to go tonight. Claim your place for free, show them your menu, photos and offers, and see who keeps coming back.",
  trust: ["Free to claim", "Verified badge", "No pay-to-rank"],
  address: "yourplace.hano.now",
} as const;

export const bizValues = [
  {
    title: "Get found",
    body: "Show up when people search by dish, area or kind of place, on the map and in Trending.",
  },
  {
    title: "Win the visit",
    body: "Your menu with prices, real photos, hours and directions: everything people check before they come.",
  },
  {
    title: "Bring them back",
    body: "Post offers that reach everyone who saved your place, and see your regulars ranked by their visits.",
  },
] as const;

export const bizFeatures = [
  {
    kicker: "Your page",
    title: "A verified page that sells for you",
    body: "Your logo, description, photos and videos, opening hours, location and contacts, with a verified badge and your own address.",
    points: ["Your own link: yourplace.hano.now", "Photos and videos of your place", "Call, directions and website in one tap"],
    screen: SCREEN.placeJp,
  },
  {
    kicker: "Real reviews",
    title: "Let your guests do the talking",
    body: "Every photo and review on Hano comes from someone who checked in. They all show on your page, so new people see what it’s really like.",
    points: ["Photos from real visits", "Ratings people trust", "A board of your visitors’ posts"],
    screen: SCREEN.post,
  },
  {
    kicker: "Menu",
    title: "Your menu, ready before they arrive",
    body: "Add dishes with prices and photos. People browse it, compare prices and plan their order with friends before they walk in.",
    points: ["Dishes with prices and photos", "Shown in dish searches across Kigali", "Menu plans people share with friends"],
    screen: SCREEN.place,
  },
] as const;

export const bizOffers = {
  kicker: "Offers",
  title: "Fill quiet nights with an offer",
  body: "Run a discount, a new dish, a happy hour, an event or a special, for a day or up to three months. Everyone who saved your place gets told the moment it goes live.",
  kinds: ["Discount", "New item", "Happy hour", "Event", "Special"],
  lengths: ["1 day", "1 week", "2 weeks", "1 month", "3 months"],
} as const;

export const bizInsights = {
  kicker: "Insights",
  title: "Know who comes, and who comes back",
  body: "See how many people view your page, check in, rate and save you. Your loyal customers are ranked by their points, so you know your regulars by name.",
  stats: ["Page views", "Check-ins", "Ratings", "Saves"],
  share: "Share your page as a ready-made card for Instagram and WhatsApp.",
} as const;

export const bizSteps = [
  { title: "Get the Hano app", body: "Download it free and sign in with your email." },
  { title: "Find your place and claim it", body: "Search for your business and tap Claim. Not on Hano yet? Register it in a minute." },
  { title: "We verify, you’re live", body: "Our team checks that you run it, then you manage your page, menu and offers from your phone." },
] as const;

export const bizPromise = {
  title: "Fair for everyone",
  points: [
    { title: "No pay-to-rank", body: "Places rank on real visits and ratings. Money can’t buy a better spot." },
    { title: "Honest reviews stay", body: "Businesses can’t remove fair reviews. You can report anything abusive." },
    { title: "Clearly labelled offers", body: "Anything promoted is shown as an offer, never dressed up as a review." },
  ],
} as const;

export const bizFaqs = [
  { question: "How much does it cost?", answer: "Claiming your place and managing your page, menu and offers on Hano is free." },
  { question: "How do I prove the place is mine?", answer: "When you claim, you add details and a document that shows you run the business. Our team reviews it and lets you know in the app." },
  { question: "My place isn’t on Hano yet. Can I add it?", answer: "Yes. In the app, choose to register a new business and add its details, location and photos." },
  { question: "Can I pay for a higher ranking?", answer: "No. Rankings come from real visits and ratings. Anything promoted is clearly labelled as an offer." },
  { question: "Can I remove a bad review?", answer: "No, honest reviews stay. If a review breaks the community guidelines, report it and our team will look at it." },
  { question: "Can more than one person manage the page?", answer: "Write to us at hello@hano.now and we’ll help set it up for your team." },
] as const;

export const bizFinal = {
  title: { before: "Your next regulars are", emphasis: "already looking", after: "." },
  sub: "Claim your place in the Hano app. It’s free and takes a few minutes.",
} as const;
