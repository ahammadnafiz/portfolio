import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Band, Gap } from "@/components/frame"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Status } from "@/components/status"
import { getNeighbours, getProject, projects } from "@/lib/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: { title: project.name, description: project.summary, url: `/work/${project.slug}/` },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  const { prev, next } = getNeighbours(project.slug)

  return (
    <>
      <SiteHeader />
      <main className="enter">
        <Band className="px-5 py-3 sm:px-6">
          <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span aria-hidden>←</span> All work
          </Link>
        </Band>

        <Band className="p-2 sm:p-2.5">
          <img
            src={`/covers/${project.slug}.svg`}
            alt=""
            width={800}
            height={500}
            fetchPriority="high"
            className="aspect-[16/10] w-full rounded-lg object-cover"
          />
        </Band>

        <Band className="px-5 py-6 sm:px-6">
          <Status status={project.status} />
          <h1 className="mt-2 font-serif text-[2.6rem] leading-[1.05] sm:text-[3.25rem]">{project.name}</h1>
          <p className="mt-1 text-muted-foreground">{project.kind}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
                    : "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors hover:bg-card"
                }
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </Band>

        <Band className="px-5 py-6 sm:px-6">
          <p className="max-w-[62ch] leading-relaxed sm:text-[17px]">{project.intro}</p>
        </Band>

        <Band className="px-5 py-3 sm:px-6">
          <h2 className="font-serif text-[1.75rem] leading-none">Highlights</h2>
        </Band>
        <Band>
          <ul className="list-disc space-y-2.5 py-5 pl-10 pr-5 leading-relaxed marker:text-muted-foreground sm:pl-11 sm:pr-6">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Band>

        <Band className="px-5 py-3 sm:px-6">
          <h2 className="font-serif text-[1.75rem] leading-none">Stack</h2>
        </Band>
        <Band className="px-5 py-5 sm:px-6">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-md border bg-card px-2.5 py-1 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Band>

        <Gap />

        <Band className="grid grid-cols-2">
          {prev && (
            <Link href={`/work/${prev.slug}`} className="group border-r border-dashed px-5 py-4 transition-colors hover:bg-card sm:px-6">
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="mt-1 block font-medium">{prev.name}</span>
            </Link>
          )}
          {next && (
            <Link href={`/work/${next.slug}`} className="group px-5 py-4 text-right transition-colors hover:bg-card sm:px-6">
              <span className="text-xs text-muted-foreground">Next →</span>
              <span className="mt-1 block font-medium">{next.name}</span>
            </Link>
          )}
        </Band>

        <Gap />
      </main>
      <SiteFooter />
    </>
  )
}
