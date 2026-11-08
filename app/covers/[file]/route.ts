import { coverSlugs, coverSvg } from "@/lib/covers"

// Rendered once at build time into out/covers/<slug>.svg.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return coverSlugs.map((slug) => ({ file: `${slug}.svg` }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const svg = coverSvg(file.replace(/\.svg$/, ""))
  if (!svg) return new Response("Not found", { status: 404 })
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } })
}
