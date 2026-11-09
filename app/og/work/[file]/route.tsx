import { ogImage } from "@/lib/og"
import { getProject, projects } from "@/lib/projects"

export const dynamic = "force-static"

// Served as /og/work/<slug>.png: each project's share image.
export function generateStaticParams() {
  return projects.map((p) => ({ file: `${p.slug}.png` }))
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const project = getProject((await params).file.replace(/\.png$/, ""))
  if (!project) return new Response("Not found", { status: 404 })
  return ogImage({ label: "Projects", title: project.name, subtitle: project.kind, tags: [project.status, ...project.stack].slice(0, 4) })
}
