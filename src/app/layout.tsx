import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono, Chakra_Petch } from "next/font/google";

import { profile } from "@/data/profile";
import { IntroScreen } from "@/components/intro-screen";
import { MotionProvider } from "@/components/motion-provider";

import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${schibsted.variable} ${geistMono.variable} ${chakraPetch.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
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
