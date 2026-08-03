export type WaitlistAudience = "local" | "visitor" | "partner";

export type WaitlistChoice = {
  id: string;
  label: string;
};

export type WaitlistQuestion = {
  id: string;
  prompt: string;
  mode: "single" | "multi";
  options: readonly WaitlistChoice[];
};

export const waitlistOnboarding = {
  title: "Join the waitlist",
  titleApp: "Get the app first",
  steps: {
    email: {
      heading: "Where should we reach you?",
      supporting: "Drop your email first. We'll personalize a couple of quick questions next.",
      headingApp: "Join the waitlist to get the app first",
      supportingApp:
        "Hano isn't on the App Store or Google Play yet. Leave your email and we'll notify you the moment it's ready to download.",
      placeholder: "you@email.com",
      submit: "Continue",
      trust: "No spam. Launch updates only.",
    },
    audience: {
      heading: "Who are you joining as?",
      supporting: "We'll personalize what you see next. Pick the option that fits best.",
    },
    details: {
      supporting: "Tap an option to continue. You can skip anytime.",
      multiHint: "Tap what fits. We'll move on after your picks.",
    },
    submitting: {
      heading: "I'm adding you to the waitlist",
      body: "Hang tight while we save your spot.",
    },
    success: {
      heading: "You're on the list",
      body: "Thanks for joining early. We'll email you when Hano is ready to download.",
      close: "Sounds good",
    },
    alreadyJoined: {
      heading: "You're already on the list",
      body: "We've already got your email. We'll notify you when Hano launches.",
      close: "Sounds good",
    },
  },
  skip: "Skip for now",
  emailCapture: {
    placeholder: "Enter your email",
  },
  audiences: [
    {
      id: "local" as const,
      label: "Local explorer",
      description: "I live in Kigali and love finding great places to eat and hang out.",
    },
    {
      id: "visitor" as const,
      label: "Just visiting",
      description: "I'm traveling through Rwanda and need trustworthy food recommendations.",
    },
    {
      id: "partner" as const,
      label: "Hospitality partner",
      description: "I run a restaurant, café, bar, hotel, or other hospitality spot.",
    },
  ],
  questionsByAudience: {
    local: [
      {
        id: "cravings",
        prompt: "What are you usually hunting for?",
        mode: "multi" as const,
        options: [
          { id: "coffee", label: "Coffee & cafés" },
          { id: "rooftops", label: "Rooftop vibes" },
          { id: "date-night", label: "Date night" },
          { id: "quick-bites", label: "Quick bites" },
          { id: "nightlife", label: "Nightlife & lounges" },
          { id: "family", label: "Family-friendly" },
          { id: "hidden-gems", label: "Hidden gems" },
          { id: "fine-dining", label: "Fine dining" },
        ],
      },
      {
        id: "frequency",
        prompt: "How often do you go out?",
        mode: "single" as const,
        options: [
          { id: "weekly", label: "A few times a week" },
          { id: "weekends", label: "Weekends mostly" },
          { id: "special", label: "Special occasions" },
          { id: "always", label: "Always looking" },
        ],
      },
    ],
    visitor: [
      {
        id: "trip",
        prompt: "How long are you around?",
        mode: "single" as const,
        options: [
          { id: "short", label: "1–3 days" },
          { id: "week", label: "About a week" },
          { id: "longer", label: "Longer stay" },
          { id: "planning", label: "Still planning" },
        ],
      },
      {
        id: "needs",
        prompt: "What do you want help with?",
        mode: "multi" as const,
        options: [
          { id: "best-restaurants", label: "Best restaurants" },
          { id: "coffee", label: "Coffee spots" },
          { id: "nightlife", label: "Nightlife" },
          { id: "local-tips", label: "Local tips" },
          { id: "near-me", label: "Places near me" },
          { id: "safe-picks", label: "Trusted picks" },
        ],
      },
    ],
    partner: [
      {
        id: "venue",
        prompt: "What kind of place do you run?",
        mode: "single" as const,
        options: [
          { id: "restaurant", label: "Restaurant" },
          { id: "cafe", label: "Café or bakery" },
          { id: "bar", label: "Bar or lounge" },
          { id: "hotel", label: "Hotel or hospitality" },
          { id: "other", label: "Other food business" },
        ],
      },
      {
        id: "goals",
        prompt: "What would help you most?",
        mode: "multi" as const,
        options: [
          { id: "locals", label: "Get discovered by locals" },
          { id: "visitors", label: "Reach visitors" },
          { id: "menu-hours", label: "Share menus & hours" },
          { id: "reviews", label: "Collect reviews" },
          { id: "promos", label: "Promote specials" },
        ],
      },
    ],
  } satisfies Record<WaitlistAudience, readonly WaitlistQuestion[]>,
  nav: {
    back: "Back",
    continue: "Continue",
    stepLabel: (step: number, total: number) => `Step ${step} of ${total}`,
  },
} as const;
