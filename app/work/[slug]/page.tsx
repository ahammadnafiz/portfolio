import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, Section } from "@/components/frame"
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
      <main>
        <Container className="pt-4 sm:pt-6">
          <Link
            href="/#work"
            className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <span aria-hidden>←</span> All work
          </Link>

          <div className="mt-4 overflow-hidden rounded-xl bg-card">
            <img
              src={`/covers/${project.slug}.svg`}
              alt=""
              width={800}
              height={500}
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="mt-8">
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
                      ? "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
                      : "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors duration-300 hover:bg-card"
                  }
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
            <p className="mt-8 max-w-[62ch] leading-relaxed sm:text-[17px]">{project.intro}</p>
          </div>

          <Section id="highlights" n="01" title="Highlights">
            <ul className="space-y-2.5 leading-relaxed">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="stack" n="02" title="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="rounded-md border bg-card px-2.5 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <nav aria-label="More projects" className="mt-14 grid grid-cols-2 gap-4">
            {prev && (
              <Link href={`/work/${prev.slug}`} className="group rounded-xl bg-card px-4 py-3.5 transition-colors duration-300 hover:bg-secondary">
                <span className="text-xs text-muted-foreground">← Previous</span>
                <span className="mt-1 block font-medium">{prev.name}</span>
              </Link>
            )}
            {next && (
              <Link href={`/work/${next.slug}`} className="group rounded-xl bg-card px-4 py-3.5 text-right transition-colors duration-300 hover:bg-secondary">
                <span className="text-xs text-muted-foreground">Next →</span>
                <span className="mt-1 block font-medium">{next.name}</span>
              </Link>
            )}
          </nav>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
