import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, machine learning engineer`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0E0E",
    theme_color: "#0F0E0E",
    lang: "en",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  }
}
