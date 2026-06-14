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
  title: "Discover The Best Restaurants In Kigali",
  description:
    "Hano helps you discover restaurants, cafés, bakeries, brunch spots, bars, and hidden gems across Kigali. Join the waitlist for early access.",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Discover The Best Restaurants In Kigali | Hano",
    template: "%s | Hano",
  },
  description: homeMetadata.description,
  icons: {
    icon: BRAND.logo,
    apple: BRAND.logo,
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
