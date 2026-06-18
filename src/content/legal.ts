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

export const privacyPolicy: LegalDocumentContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro: `This policy explains how ${site.name} collects, uses, and protects information when you use our website, waitlist, and discovery features.`,
  updatedAt: "June 2026",
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect information you provide directly and limited technical data needed to operate the platform.",
      ],
      bullets: [
        "Waitlist and contact details: name, email, optional phone, and preferences you submit.",
        "Usage data: pages visited, device type, and aggregated analytics to improve the product.",
        "Restaurant discovery activity: saved preferences and interactions when those features are available.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use your information",
      paragraphs: [
        "We use personal information only to deliver and improve Hano.",
      ],
      bullets: [
        "Send product updates, launch announcements, and community invitations.",
        "Respond to support, partnership, and restaurant listing requests.",
        "Improve search, recommendations, and content quality across Kigali.",
        "Maintain security, prevent abuse, and comply with legal obligations.",
      ],
    },
    {
      id: "cookies-analytics",
      title: "Cookies and analytics",
      paragraphs: [
        "We use essential cookies for site functionality and may use privacy-friendly analytics to understand how visitors use Hano.",
        "We do not sell personal information. Third-party tools we use are limited to infrastructure and analytics providers operating on our behalf.",
        "For more detail, see our Cookie Policy.",
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      paragraphs: [
        "We retain waitlist and contact information for as long as needed to operate Hano and communicate with you.",
        "You may request deletion of your data at any time by emailing us.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information.",
        `To exercise these rights, contact us at ${site.email}. We will respond within a reasonable period.`,
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about this policy? Email ${site.email} or visit our contact page.`,
      ],
    },
  ],
};

export const termsOfService: LegalDocumentContent = {
  eyebrow: "Legal",
  title: "Terms of Service",
  intro: `These terms govern your use of ${site.name}, including browsing restaurant listings, joining the waitlist, and using our marketing website.`,
  updatedAt: "June 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      paragraphs: [
        `By accessing or using ${site.name}, you agree to these Terms of Service. If you do not agree, please do not use the platform.`,
      ],
    },
    {
      id: "platform-purpose",
      title: "What Hano provides",
      paragraphs: [
        "Hano helps people discover restaurants, cafés, and other hospitality venues in Kigali.",
        "Listings, hours, ratings, and descriptions are provided for discovery purposes and may change without notice.",
      ],
    },
    {
      id: "listings-disclaimer",
      title: "Listings and third-party venues",
      paragraphs: [
        "Restaurant information is compiled from public sources, partner submissions, and community input.",
        `${site.name} does not guarantee availability, pricing, menu accuracy, or service quality at listed businesses.`,
        "Links to third-party websites are provided for convenience. Their terms and privacy policies apply when you leave Hano.",
      ],
    },
    {
      id: "user-conduct",
      title: "Your responsibilities",
      paragraphs: ["When using Hano, you agree to:"],
      bullets: [
        "Provide accurate information when joining the waitlist or submitting forms.",
        "Use the platform lawfully and respectfully.",
        "Not scrape, reverse engineer, or misuse our services or data.",
        "Not submit false reviews, spam, or misleading restaurant information.",
      ],
    },
    {
      id: "waitlist",
      title: "Waitlist and early access",
      paragraphs: [
        "Joining the waitlist does not guarantee early access or a specific launch date.",
        "We may change waitlist benefits, features, and availability as the product evolves.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      paragraphs: [
        `${site.name} is provided "as is" without warranties of any kind to the fullest extent permitted by law.`,
        "We are not liable for indirect, incidental, or consequential damages arising from your use of the platform or visits to listed venues.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. Continued use of Hano after changes are posted constitutes acceptance of the updated terms.",
        `Material changes will be reflected on this page with an updated date.`,
      ],
    },
  ],
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
    "We'd love to hear from you — whether you're a restaurant owner, a food lover in Kigali, or interested in partnering with Hano.",
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
