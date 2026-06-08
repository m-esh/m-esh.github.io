import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch, Bitcount_Single } from "next/font/google";

import { profile } from "@/data/profile";
import { IntroScreen } from "@/components/intro-screen";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

const bitcountSingle = Bitcount_Single({
  variable: "--font-bitcount-single",
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
      className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} ${bitcountSingle.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
        {/* EXPERIMENTAL: revert by deleting this div + .noise-overlay in globals.css */}
        <div aria-hidden className="noise-overlay" />
        <IntroScreen />
        {children}
      </body>
    </html>
  );
}
