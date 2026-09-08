import type { MetadataRoute } from "next"

// Generated rather than static so icon paths follow basePath. The old
// public/manifest.json hardcoded them and 404'd in whichever environment it
// was not written for.
const prefix = process.env.NODE_ENV === "production" ? "/portfolio" : ""

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahammad Nafiz — Machine Learning & AI Engineer",
    short_name: "Ahammad Nafiz",
    description:
      "Portfolio of Ahammad Nafiz, an ML engineer in Dhaka working on RAG systems, LLM agents, and agent memory.",
    start_url: `${prefix}/`,
    scope: `${prefix}/`,
    display: "standalone",
    background_color: "#e8e6e1",
    theme_color: "#e8e6e1",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "technology"],
    icons: [
      { src: `${prefix}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { src: `${prefix}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { src: `${prefix}/apple-icon.png`, sizes: "180x180", type: "image/png" },
      { src: `${prefix}/icon.png`, sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  }
}
