import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { profile } from "@/data/profile";
import { IntroScreen } from "@/components/intro-screen";
import { MotionProvider } from "@/components/motion-provider";

import "./globals.css";

// Sole typeface, Neue Montreal stand-in: weight 400 carries everything,
// 700 is reserved for emphasis words.
const neue = Manrope({
  variable: "--font-neue",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.tagline}`,
  description: profile.blurb,
  metadataBase: new URL("https://m-esh.github.io"),
  openGraph: {
    title: `${profile.name} · ${profile.tagline}`,
    description: profile.blurb,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neue.variable} dark h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <MotionProvider>
          {/* EXPERIMENTAL: revert by deleting this div + .noise-overlay in globals.css */}
          <div aria-hidden className="noise-overlay" />
          <IntroScreen />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
