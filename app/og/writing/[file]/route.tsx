import { ogImage } from "@/lib/og"
import { formatDate, getPost, getPosts, langOf } from "@/lib/writing"

export const dynamic = "force-static"

// Served as /og/writing/<slug>.png: each post's share image. Bangla posts use the site image,
// since the image renderer can't shape Bengali script (conjuncts and vowel signs come out wrong).
export function generateStaticParams() {
  return getPosts().filter((p) => langOf(p) === "en").map((p) => ({ file: `${p.slug}.png` }))
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const post = getPost((await params).file.replace(/\.png$/, ""))
  if (!post) return new Response("Not found", { status: 404 })
  return ogImage({ label: "Writing", title: post.title, subtitle: `${formatDate(post.date)} · ${post.minutes} min read`, tags: post.tags })
}
