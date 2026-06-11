import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
