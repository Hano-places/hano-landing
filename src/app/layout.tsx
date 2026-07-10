import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/landing";
import { BRAND } from "@/content/images";
import { AnalyticsScripts } from "@/components/seo/analytics";
import { buildPageMetadata } from "@/lib/seo";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const homeMetadata = buildPageMetadata({
  path: "/",
  title: "Hano — Discover the Best Restaurants & Places in Rwanda",
  description:
    "Hano helps you discover restaurants, cafés, bars, hotels, and hidden gems across Rwanda. Explore Kigali and top-rated places to visit.",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "Hano — Discover the Best Restaurants & Places in Rwanda",
    template: "%s | Hano",
  },
  description: homeMetadata.description,
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/brand-logo/small.png", sizes: "32x32", type: "image/png" },
        { url: BRAND.logo, type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        { url: "/brand-logo/large.png", sizes: "180x180", type: "image/png" },
      ],
    },
  alternates: homeMetadata.alternates,
  openGraph: homeMetadata.openGraph,
  twitter: homeMetadata.twitter,
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${GeistMono.variable}`}
    >
      <body className={instrumentSans.className}>
        {children}
        <Analytics />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
