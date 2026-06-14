import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/landing";
import { BRAND } from "@/content/images";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Hano — Discover The Best Restaurants In Kigali",
  description:
    "Hano helps you discover restaurants, cafés, bakeries, brunch spots, bars, and hidden gems across Kigali. Join the waitlist for early access.",
  icons: {
    icon: BRAND.logo,
    apple: BRAND.logo,
  },
  openGraph: {
    title: "Hano — Discover The Best Restaurants In Kigali",
    description:
      "Join the waitlist and be among the first to experience a better way to discover restaurants in Kigali.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/thumbnail/thumbnail.png",
        width: 1200,
        height: 631,
        alt: "Hano — Discover the best restaurants in Kigali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hano — Discover The Best Restaurants In Kigali",
    description:
      "Join the waitlist and be among the first to experience a better way to discover restaurants in Kigali.",
    images: ["/thumbnail/thumbnail.png"],
  },
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
      </body>
    </html>
  );
}
