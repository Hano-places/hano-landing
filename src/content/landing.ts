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
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      location: "Kiyovu, Kigali",
      date: "Open daily",
      tag: "Trending",
      tagDescription: "Popular spot for burgers and vibes",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
      location: "Kimihurura, Kigali",
      date: "Brunch weekends",
      tag: "Local favorite",
      tagDescription: "Social dining and local classics",
    },
    {
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      location: "Kiyovu, Kigali",
      date: "Reservations available",
      tag: "Fine dining",
      tagDescription: "Beautiful views and memorable meals",
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
      image: "/restaurants-dishes-images/Joyful Restaurant Scene.png",
      metrics: [
        {
          tag: "Trending",
          name: "Boho",
          detail: "Kiyovu · 4.9",
          image: "/restaurants-dishes-images/Gourmet Burger Close-Up.png",
        },
        {
          tag: "Trending",
          name: "Pili Pili",
          detail: "Kimihurura · 4.8",
          image: "/restaurants-dishes-images/Sophisticated Dining Setup.png",
        },
      ],
    },
    {
      title: "Search By Preference",
      description: "Match cuisine, budget, atmosphere, or the occasion.",
      image: "/places-images/Modern Elegance Café Interior.png",
      metrics: [
        {
          tag: "For you",
          name: "Brunch spots",
          detail: "12 places nearby",
          image: "/restaurants-dishes-images/Creamy Beverage with Nut Garnish.png",
        },
        {
          tag: "For you",
          name: "Fine dining",
          detail: "Special occasions",
          image: "/restaurants-dishes-images/Elegant Table Setting.png",
        },
      ],
    },
    {
      title: "Trusted Recommendations",
      description: "See where locals and food lovers actually go.",
      image: "/places-images/Outdoor Dining Scene.png",
      metrics: [
        {
          tag: "Top rated",
          name: "Heaven Restaurant",
          detail: "Kiyovu · 4.8",
          image: "/restaurants-dishes-images/Cozy Vintage Feast.png",
        },
        {
          tag: "Top rated",
          name: "Community pick",
          detail: "Highly recommended",
          image: "/restaurants-dishes-images/Appetizing Cheeseburgers on Board.png",
        },
      ],
    },
    {
      title: "Explore Categories",
      description: "Browse cafés, bars, bakeries, and hidden gems.",
      image: "/places-images/Inviting Pizza Restaurant Interior.png",
      metrics: [
        {
          tag: "Trending",
          name: "Burgers",
          detail: "24 places",
          image: "/restaurants-dishes-images/Appetizing Cheeseburgers on Board.png",
        },
        {
          tag: "Trending",
          name: "Cocktails",
          detail: "Night out",
          image: "/restaurants-dishes-images/Tropical Refreshments.png",
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
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    },
    {
      name: "Pili Pili",
      category: "Restaurant & Lounge",
      location: "Kimihurura",
      rating: 4.8,
      priceRange: "$$$",
      description:
        "A Kigali favorite for social dining and local classics.",
      image:
        "https://images.unsplash.com/photo-1550966871-3ed3c47c2f62?w=600&q=80",
    },
    {
      name: "Heaven Restaurant",
      category: "Restaurant",
      location: "Kiyovu",
      rating: 4.8,
      priceRange: "$$$",
      description:
        "Beautiful views, local flavors, and memorable dining experiences.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
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
    {
      label: "Restaurants",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80",
    },
    {
      label: "Cafés",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80",
    },
    {
      label: "Bakeries",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
    },
    {
      label: "Brunch Spots",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&q=80",
    },
    {
      label: "Bars",
      image:
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=200&q=80",
    },
    {
      label: "Lounges",
      image:
        "https://images.unsplash.com/photo-1566417713940-7f63e822257d?w=200&q=80",
    },
    {
      label: "Fast Food",
      image:
        "https://images.unsplash.com/photo-1561758033-d876a9aade81?w=200&q=80",
    },
    {
      label: "Local Favorites",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80",
    },
    {
      label: "Fine Dining",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80",
    },
    {
      label: "Hidden Gems",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&q=80",
    },
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
  steps: [
    {
      title: "Discover",
      description: "Browse restaurants, categories, and recommendations.",
      bg: "gray" as const,
    },
    {
      title: "Explore",
      description: "View restaurant details, locations, and useful information.",
      bg: "lavender" as const,
    },
    {
      title: "Save",
      description: "Keep track of places you want to visit.",
      bg: "mint" as const,
    },
    {
      title: "Share",
      description: "Recommend great places and help others discover them.",
      bg: "gray" as const,
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
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80",
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
