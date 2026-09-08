import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Bricolage_Grotesque } from "next/font/google";

import { profile, siteUrl } from "@/data/profile";
import { IntroScreen } from "@/components/intro-screen";
import { MotionProvider } from "@/components/motion-provider";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
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

// A real .png rather than Next's `opengraph-image.tsx` route. That convention
// emits an extensionless file (/opengraph-image), which GitHub Pages serves as
// application/octet-stream — several scrapers reject a preview whose
// Content-Type isn't an image. Regenerate public/og.png if the name, tagline
// or accent colour changes.
const ogImage = "/og.png";
const ogAlt = `${profile.name} · ${profile.tagline}`;

export const metadata: Metadata = {
  // Production origin. Everything relative (OG image, canonicals, sitemap)
  // resolves against this, so it has to be the real domain rather than the
  // old github.io host or previews resolve to URLs that 404.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.tagline}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.blurb,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} · ${profile.tagline}`,
    description: profile.blurb,
    url: "/",
    siteName: profile.name,
    locale: "en_CA",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.tagline}`,
    description: profile.blurb,
    images: [{ url: ogImage, alt: ogAlt }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${bricolage.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
        <MotionProvider>
          <IntroScreen />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
