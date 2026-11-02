import { site } from "@/content/landing";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocumentContent = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: readonly LegalSection[];
};

export const cookiePolicy: LegalDocumentContent = {
  eyebrow: "Legal",
  title: "Cookie Policy",
  intro: `This policy describes how ${site.name} uses cookies and similar technologies on our marketing website.`,
  updatedAt: "June 2026",
  sections: [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help sites remember preferences and understand how visitors use pages.",
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookies we use",
      paragraphs: ["Hano may use the following types of cookies:"],
      bullets: [
        "Essential cookies: required for basic site functionality and security.",
        "Analytics cookies: help us understand traffic and improve the experience (e.g. page views, referrers).",
        "Preference cookies: remember choices such as dismissed banners when those features are enabled.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      paragraphs: [
        "We may use third-party analytics or hosting providers that set their own cookies subject to their policies.",
        "We do not use advertising cookies on the marketing site.",
      ],
    },
    {
      id: "managing-cookies",
      title: "Managing cookies",
      paragraphs: [
        "You can control cookies through your browser settings. Blocking essential cookies may affect site functionality.",
        "To opt out of analytics where available, use your browser's privacy controls or contact us.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [`Questions about cookies? Email ${site.email}.`],
    },
  ],
};

export const contactPage: LegalDocumentContent = {
  eyebrow: "Support",
  title: "Contact Hano",
  intro:
    "We'd love to hear from you, whether you're a restaurant owner, a food lover in Kigali, or interested in partnering with Hano.",
  updatedAt: "June 2026",
  sections: [
    {
      id: "general",
      title: "General enquiries",
      paragraphs: [
        `Email us at ${site.email} for product questions, press, or general support.`,
        `Website: ${site.url.replace("https://", "")}`,
      ],
    },
    {
      id: "restaurants",
      title: "Restaurant listings",
      paragraphs: [
        "To suggest a new venue or update an existing listing, include the business name, neighborhood, website, and any corrected hours or contact details.",
        "We review submissions regularly and prioritize accurate, helpful information for diners in Kigali.",
      ],
    },
    {
      id: "partnerships",
      title: "Partnerships",
      paragraphs: [
        "For brand partnerships, events, or community collaborations, reach out with a short description of your proposal and timeline.",
      ],
    },
    {
      id: "response-times",
      title: "Response times",
      paragraphs: [
        "We aim to respond within 2–3 business days. Urgent listing corrections are prioritized when details affect opening hours or location accuracy.",
      ],
    },
  ],
};

export { businessTerms, communityGuidelines, privacyPolicy, termsOfService } from "@/content/app-legal";
