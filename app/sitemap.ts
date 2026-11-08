import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { SITE_URL } from "@/lib/site"
import { getPosts } from "@/lib/writing"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work/`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE_URL}/work/${p.slug}/`, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/writing/`, changeFrequency: "monthly", priority: 0.8 },
    ...getPosts().map((p) => ({ url: `${SITE_URL}/writing/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
  ]
}
