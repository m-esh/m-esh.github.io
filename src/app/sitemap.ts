import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/profile";

// Static export: this is emitted once at build time as /sitemap.xml.
export const dynamic = "force-static";

const routes = ["", "/projects/drone", "/projects/kalimbinator", "/projects/chopstick-ring"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
