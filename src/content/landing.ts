import { IMG, MOCK } from "./images";

export const site = {
  name: "Hano",
  tagline: "Discover Restaurants Around You",
  email: "hello@hano.rw",
  appStoreUrl: "https://apps.apple.com/",
  playStoreUrl: "https://play.google.com/store",
  whatsappUrl: "https://wa.me/",
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    x: "https://x.com/",
  },
} as const;

export const navLinks = [
  { label: "Discover", href: "#hero" },
  { label: "Restaurants", href: "#restaurants" },
  { label: "Categories", href: "#categories" },
  { label: "Community", href: "#community" },
  { label: "About", href: "#early-access" },
] as const;

export const hero = {
  badge: "Now on iOS & Android",
  headline: {
    before: "Discover. Explore. Eat.",
    emphasis: "Finally",
    after: "all in one place.",
  },
  subheadline:
    "Instantly find restaurants, cafés, bakeries, and hidden gems across Kigali — curated recommendations from people you trust.",
  cta: "Join Early Access",
  secondaryCta: "Explore Restaurants",
  socialProof: "500+ food lovers already signed up for early access",
  metrics: [
    { value: "500+", label: "Early Members" },
    { value: "100+", label: "Restaurants Listed" },
    { value: "1,000+", label: "Recommendations" },
    { value: "50+", label: "Neighborhood Favorites" },
  ],
  carouselSlides: [
    {
      main: MOCK.iphone,
      mainType: "mockup" as const,
      card: MOCK.homeRecent,
      location: "Nyarutarama, Kigali",
      date: "Open daily",
      tag: "Discover",
      tagDescription: "Browse places and what's trending nearby",
    },
    {
      main: IMG.joyfulScene,
      mainType: "photo" as const,
      cardType: "notifications" as const,
      notifications: [
        {
          size: "large" as const,
          app: "Hano",
          time: "now",
          title: "New review",
          body: 'Sarah rated Meza — "Great brunch spot."',
        },
        {
          size: "small" as const,
          app: "Hano",
          time: "2m ago",
          title: "Saved your pick",
          body: "Marie added Kigali Heights Café.",
        },
      ],
      location: "Kimihurura, Kigali",
      date: "Weekend brunch",
      tag: "Social dining",
      tagDescription: "Find spots perfect for friends and celebrations",
    },
    {
      main: MOCK.previewMenu,
      mainType: "mockup" as const,
      card: MOCK.notification,
      cardSize: "phone" as const,
      location: "Kiyovu, Kigali",
      date: "Menus & orders",
      tag: "Preview",
      tagDescription: "Check dishes and prices before you arrive",
    },
    {
      main: IMG.outdoorDining,
      mainType: "photo" as const,
      card: MOCK.kpi,
      cardVariant: "kpi" as const,
      location: "Nyarutarama, Kigali",
      date: "Sunset hours",
      tag: "Outdoor vibes",
      tagDescription: "Terrace spots and open-air dining around the city",
    },
    {
      main: IMG.gourmetBurger,
      mainType: "photo" as const,
      card: MOCK.listedOrders,
      location: "Kacyiru, Kigali",
      date: "Lunch & dinner",
      tag: "Crave-worthy",
      tagDescription: "See what's popular before you head out",
    },
    {
      main: IMG.modernCafe,
      mainType: "photo" as const,
      card: MOCK.notification,
      cardSize: "phone" as const,
      location: "Kigali Heights",
      date: "Morning to late",
      tag: "Café culture",
      tagDescription: "Discover coffee spots and casual bites nearby",
    },
    {
      main: MOCK.previewMenu,
      mainType: "mockup" as const,
      card: MOCK.homeRecent,
      location: "Kacyiru, Kigali",
      date: "Share feedback",
      tag: "Review",
      tagDescription: "Recommend gems and help friends decide faster",
    },
  ],
} as const;

export const problem = {
  id: "problem",
  headline: {
    before: "Finding a great restaurant shouldn't be",
    emphasis: "this",
    after: "hard",
  },
  supporting:
    "Every day people ask where to eat, what's nearby, and what places are actually worth visiting. Despite Kigali's growing food scene, discovering the right place remains difficult.",
  painPoints: [
    {
      icon: "search" as const,
      title: "Too Many Choices",
      description:
        "New restaurants are constantly opening, making it difficult to know where to start.",
    },
    {
      icon: "message" as const,
      title: "Recommendations Are Scattered",
      description:
        "Useful recommendations are spread across WhatsApp groups, Instagram, TikTok, and conversations with friends.",
    },
    {
      icon: "location" as const,
      title: "Limited Local Discovery",
      description:
        "Many great restaurants remain undiscovered because there is no central place to find them.",
    },
    {
      icon: "clock" as const,
      title: "Outdated Information",
      description:
        "Menus, locations, and restaurant experiences change frequently.",
    },
    {
      icon: "star" as const,
      title: "Generic Reviews",
      description:
        "Ratings alone rarely explain whether a place is actually worth visiting.",
    },
  ],
} as const;

export const solution = {
  id: "solution",
  headline: "Meet Hano",
  supporting:
    "Restaurant discovery in one simple platform — curated picks, community insights, and the details that matter.",
  features: [
    {
      title: "Discover Restaurants",
      description: "Explore top spots across Kigali by neighborhood and popularity.",
      image: IMG.joyfulScene,
      metrics: [
        {
          tag: "Open now",
          name: "Garden brunch",
          detail: "Nyamirambo · 4.7",
          image: IMG.tropical,
          placement: { bottom: "16%", right: "6%" },
        },
        {
          tag: "Friends pick",
          name: "Rooftop bites",
          detail: "8 min away",
          image: IMG.gourmetBurger,
          placement: { top: "48%", left: "50%" },
        },
      ],
    },
    {
      title: "Search By Preference",
      description: "Match cuisine, budget, atmosphere, or the occasion.",
      image: IMG.modernCafe,
      metrics: [
        {
          tag: "For you",
          name: "Quiet cafés",
          detail: "5 nearby",
          image: IMG.creamyDrink,
          placement: { bottom: "20%", left: "8%" },
        },
        {
          tag: "Mood match",
          name: "Date night",
          detail: "Soft jazz · $$$",
          image: IMG.elegantTable,
          placement: { top: "34%", right: "7%" },
        },
      ],
    },
    {
      title: "Trusted Recommendations",
      description: "See where locals and food lovers actually go.",
      image: IMG.outdoorDining,
      metrics: [
        {
          tag: "Local love",
          name: "Weekly favorite",
          detail: "42 saves this week",
          image: IMG.cozy,
          placement: { top: "26%", right: "5%" },
        },
        {
          tag: "Chef's pick",
          name: "Seasonal menu",
          detail: "New this month",
          image: IMG.sophisticated,
          placement: { bottom: "14%", left: "9%" },
        },
      ],
    },
    {
      title: "Explore Categories",
      description: "Browse cafés, bars, bakeries, and hidden gems.",
      image: IMG.pizzaInterior,
      metrics: [
        {
          tag: "Hidden gem",
          name: "Street food lane",
          detail: "Try tonight",
          image: IMG.burgers,
          placement: { bottom: "18%", right: "10%" },
        },
        {
          tag: "After work",
          name: "Cocktail hour",
          detail: "Trending near you",
          image: IMG.beachDrink,
          placement: { top: "40%", left: "6%" },
        },
      ],
    },
  ],
} as const;

export const featuredRestaurants = {
  id: "restaurants",
  headline: "Popular Restaurants In Kigali",
  supporting:
    "Explore some of the restaurants people are talking about right now.",
  items: [
    {
      name: "Boho",
      category: "Restaurant",
      location: "Kiyovu",
      rating: 4.9,
      priceRange: "$$",
      description:
        "Known for great burgers, vibrant atmosphere, and consistent dining experiences.",
      image: IMG.gourmetBurger,
    },
    {
      name: "Pili Pili",
      category: "Restaurant & Lounge",
      location: "Kimihurura",
      rating: 4.8,
      priceRange: "$$$",
      description:
        "A Kigali favorite for social dining and local classics.",
      image: IMG.sophisticated,
    },
    {
      name: "Heaven Restaurant",
      category: "Restaurant",
      location: "Kiyovu",
      rating: 4.8,
      priceRange: "$$$",
      description:
        "Beautiful views, local flavors, and memorable dining experiences.",
      image: IMG.elegantTable,
    },
  ],
} as const;

export const categories = {
  id: "categories",
  headline: {
    before: "For everyone who",
    emphasis: "loves food",
  },
  supporting:
    "Whether you're planning a date night, brunch with friends, a quick lunch, or a special celebration, Hano helps you find the right place.",
  items: [
    { label: "Restaurants", image: IMG.joyfulScene },
    { label: "Cafés", image: IMG.modernCafe },
    { label: "Bakeries", image: IMG.cozy },
    { label: "Brunch Spots", image: IMG.creamyDrink },
    { label: "Bars", image: IMG.tropical },
    { label: "Lounges", image: IMG.sophisticated },
    { label: "Fast Food", image: IMG.burgers },
    { label: "Local Favorites", image: IMG.outdoorDining },
    { label: "Fine Dining", image: IMG.elegantTable },
    { label: "Hidden Gems", image: IMG.portrait },
  ],
} as const;

export const testimonials = {
  id: "community",
  headline: "Recommendations From Real People",
  supporting:
    "The best restaurant recommendations often come from people you trust. Hano combines local knowledge and community insights to help you discover places worth visiting.",
  items: [
    {
      name: "Sarah M.",
      quote:
        "I've discovered more restaurants through Hano than I did in months of searching online.",
      role: "Food enthusiast",
    },
    {
      name: "Kevin T.",
      quote: "Finally a platform focused on Kigali restaurants.",
      role: "Local professional",
    },
    {
      name: "Diane N.",
      quote:
        "I always know where to eat when friends ask for recommendations.",
      role: "Brunch lover",
    },
  ],
} as const;


export const howItWorks = {
  id: "how-it-works",
  headline: {
    before: "We've mapped the",
    emphasis: "hard part",
    after: ", now it's your turn to",
    emphasis2: "explore",
  },
  supporting:
    "Whether you're looking for your next meal or planning a special night out, everything is designed to flow effortlessly.",
  cards: [
    {
      title: "Discover",
      description: "Browse places, categories, and what's trending nearby.",
      variant: "gray" as const,
      size: "large" as const,
      layers: [
        {
          src: MOCK.iphone,
          role: "main",
          align: "bottom-right-phone",
          alt: "Hano home screen",
        },
      ],
    },
    {
      title: "Explore",
      description: "See details, ratings, and distance at a glance.",
      variant: "violet" as const,
      size: "small" as const,
      layers: [
        {
          src: MOCK.homeRecent,
          role: "main",
          align: "bottom-right",
          alt: "Top places list",
        },
      ],
    },
    {
      title: "Save",
      description: "Keep spots you love on your personal shortlist.",
      variant: "green" as const,
      size: "small" as const,
      layers: [
        {
          src: MOCK.previewMenu,
          role: "main",
          align: "bottom-right-phone",
          alt: "Menu preview",
        },
      ],
    },
    {
      title: "Share",
      description: "Recommend gems and help friends decide faster.",
      variant: "gray" as const,
      size: "large" as const,
      layers: [
        {
          src: MOCK.reviewFlat,
          role: "main",
          align: "top-right-half-clip",
          alt: "Leave a review",
        },
        {
          src: MOCK.kpiFlat,
          role: "chip",
          align: "below-text-left",
          alt: "",
        },
      ],
    },
  ],
} as const;

export const community = {
  id: "join-community",
  headline: "Join The Hano Community",
  description:
    "Help build Kigali's most useful restaurant discovery platform. Share recommendations, discover new places, and connect with people who enjoy exploring the city's food scene.",
  benefits: [
    "Early access to new features",
    "Exclusive recommendations",
    "Restaurant updates",
    "Hidden gem discoveries",
    "Community discussions",
    "Product feedback opportunities",
    "Giveaways and special events",
  ],
  cta: "Join The WhatsApp Community",
} as const;

export const comingSoon = {
  id: "coming-soon",
  headline: "Coming Soon",
  supporting: "We're building tools that make restaurant discovery even better.",
  features: [
    {
      title: "Personalized Recommendations",
      description: "Get suggestions based on your preferences and interests.",
      bg: "gray" as const,
    },
    {
      title: "Smart Search",
      description: "Find restaurants faster using advanced filters.",
      bg: "lavender" as const,
    },
    {
      title: "Maps & Nearby Discovery",
      description: "Explore restaurants around your location.",
      bg: "mint" as const,
    },
    {
      title: "Reservations",
      description: "Reserve tables directly through the platform.",
      bg: "gray" as const,
    },
    {
      title: "Restaurant Collections",
      description: "Discover curated lists for every occasion.",
      bg: "lavender" as const,
    },
    {
      title: "Mobile App",
      description: "Take Hano with you wherever you go.",
      bg: "mint" as const,
    },
  ],
} as const;

export const earlyAccess = {
  id: "early-access",
  headline: {
    before: "Be among the",
    emphasis: "first",
    after: "to join Hano",
  },
  description:
    "We're building a better way to discover restaurants in Kigali. Join the waitlist today and get early access when we launch.",
  benefits: [
    "Priority access before launch",
    "Product updates",
    "Community invitations",
    "Early testing opportunities",
    "Exclusive announcements",
  ],
  formTitle: "Join the Hano Early Access Waitlist",
  trustMessage:
    "No spam. Only updates related to Hano and upcoming launches.",
  cta: "Join Early Access",
} as const;

export const faq = {
  id: "faq",
  headline: {
    before: "Questions before you",
    emphasis: "join",
  },
  items: [
    {
      question: "What is Hano?",
      answer:
        "Hano is a restaurant discovery platform that helps people find restaurants, cafés, bakeries, bars, lounges, and food experiences across Kigali.",
    },
    {
      question: "Why was Hano created?",
      answer:
        "Many people struggle to find reliable restaurant recommendations and spend too much time deciding where to eat. Hano was created to make restaurant discovery easier and more useful.",
    },
    {
      question: "Is Hano free to use?",
      answer: "Yes. Core discovery features will be free for users.",
    },
    {
      question: "When will Hano launch?",
      answer:
        "We are currently building the platform and growing the community. Early access members will receive updates first.",
    },
    {
      question: "Will there be a mobile app?",
      answer:
        "Yes. A mobile application is part of the Hano roadmap and will be available after launch.",
    },
    {
      question: "Can I contribute recommendations?",
      answer:
        "Absolutely. Community recommendations will play an important role in helping people discover great restaurants.",
    },
    {
      question: "Can restaurants join Hano?",
      answer:
        "Yes. Restaurants will be able to create profiles, showcase information, and connect with potential customers.",
    },
    {
      question: "How are restaurants selected?",
      answer:
        "Restaurants are added based on relevance, quality, community recommendations, and platform curation.",
    },
    {
      question: "Can restaurants pay for higher rankings?",
      answer:
        "No. Trust and transparency are important principles for Hano. Any sponsored content will always be clearly labeled.",
    },
    {
      question: "Is Hano only for restaurants?",
      answer:
        "No. Hano also helps users discover cafés, bakeries, brunch spots, bars, lounges, and other food-related experiences.",
    },
    {
      question: "Can tourists use Hano?",
      answer:
        "Absolutely. Hano is designed to help both locals and visitors discover great places around Kigali.",
    },
    {
      question: "How can I stay updated?",
      answer:
        "You can join the waitlist, join the WhatsApp community, follow our social channels, or subscribe to updates.",
    },
    {
      question: "How can I support Hano?",
      answer:
        "You can support us by joining the waitlist, sharing Hano with friends, following our social channels, providing feedback, and recommending restaurants.",
    },
    {
      question: "How will my information be used?",
      answer:
        "Your information will only be used for product updates, launch announcements, community invitations, and early access opportunities. We respect user privacy and will never sell personal information.",
    },
  ],
} as const;

export const finalCta = {
  id: "join-waitlist",
  headline: {
    parts: [
      { text: "Ready to ", emphasis: false },
      { text: "join", emphasis: true },
      { text: " the ", emphasis: false },
      { text: "next", emphasis: true },
      { text: " era of ", emphasis: false },
      { text: "food", emphasis: true },
      { text: " ", emphasis: false },
      { text: "discovery", emphasis: true },
      { text: "?", emphasis: false },
    ],
  },
  supporting:
    "Join the early waitlist and get notified the moment we go live.",
  cta: "Join Early Access",
  socialProof: "500+ food lovers already signed up for early access",
  floatingImages: [
    IMG.gourmetBurger,
    IMG.elegantTable,
    IMG.outdoorDining,
    IMG.joyfulScene,
    IMG.burgers,
    IMG.creamyDrink,
  ],
} as const;

export const footer = {
  tagline: "From the team building Hano — made by people who love discovering great food.",
  sitemap: [
    { label: "Discover", href: "#hero" },
    { label: "Restaurants", href: "#restaurants" },
    { label: "Categories", href: "#categories" },
    { label: "Community", href: "#community" },
  ],
  copyright: "© 2026 Hano. Made with love in Kigali.",
} as const;
