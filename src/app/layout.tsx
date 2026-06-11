import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono, Bricolage_Grotesque } from "next/font/google";

import { profile } from "@/data/profile";
import { IntroScreen } from "@/components/intro-screen";
import { MotionProvider } from "@/components/motion-provider";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { ShaderBackground } from "@/components/shader-background";

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

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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
      className={`${schibsted.variable} ${geistMono.variable} ${bricolage.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
        <MotionProvider>
          <IntroScreen />
          <ShaderBackground />
          <CursorSpotlight />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
