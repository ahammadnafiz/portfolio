import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${SITE_URL}/work/${p.slug}/`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ]
}
