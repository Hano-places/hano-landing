import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
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
  title: "Hano — Discover The Best Restaurants In Kigali",
  description:
    "Hano helps you discover restaurants, cafés, bakeries, brunch spots, bars, and hidden gems across Kigali. Join the waitlist for early access.",
  openGraph: {
    title: "Hano — Discover The Best Restaurants In Kigali",
    description:
      "Join the waitlist and be among the first to experience a better way to discover restaurants in Kigali.",
    type: "website",
    locale: "en_US",
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
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <body className={instrumentSans.className}>{children}</body>
    </html>
  );
}
