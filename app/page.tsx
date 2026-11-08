import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { BrandLink } from "@/components/brand-link"
import { Container, Section } from "@/components/frame"
import { XIcon } from "@/components/icons"
import Link from "next/link"
import { PostList } from "@/components/post-list"
import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DhakaClock } from "@/components/dhaka-clock"
import { projects } from "@/lib/projects"
import { experience, recognition, site } from "@/lib/site"
import { getPosts } from "@/lib/writing"

/** Each icon tile gets its own colour; the text stays plain. */
const LINK_ICONS: Record<string, { Icon: typeof Github; tint: string }> = {
  GitHub: { Icon: Github, tint: "var(--hl-violet)" },
  LinkedIn: { Icon: Linkedin, tint: "var(--hl-blue)" },
  X: { Icon: XIcon as typeof Github, tint: "var(--foreground)" },
  Email: { Icon: Mail, tint: "var(--hl-orange)" },
  CV: { Icon: FileText, tint: "var(--hl-green)" },
}

const LINKS = [
  ...site.socials,
  { label: "Email", href: `mailto:${site.email}` },
  { label: "CV", href: site.cv },
]

export default function Home() {
  const posts = getPosts()
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pt-2 sm:pt-4">
          <div className="mt-8 flex items-center gap-5 sm:mt-12 sm:gap-7">
            <img
              src="/avatar.webp"
              alt="Portrait of Ahammad Nafiz"
              width={224}
              height={224}
              className="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-border sm:h-28 sm:w-28"
            />
            <div className="min-w-0">
              <h1 className="font-serif text-[2.5rem] leading-[1.02] sm:text-[3.25rem]">{site.name}</h1>
              <p className="shimmer-text mt-1.5 text-sm text-muted-foreground sm:text-base">{site.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {site.location} <span aria-hidden>·</span>{" "}
                <span className="font-mono text-xs" title="Local time in Dhaka">
                  <DhakaClock /> local time
                </span>
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 leading-relaxed sm:text-[17px]">
            <li>
              I&apos;m an AI engineer in Dhaka, working as an Associate Product Engineer at{" "}
              <BrandLink brand="markopolo" />. I work on <BrandLink brand="deepdive" />, an AI social listening
              platform, plus an AEO visibility tool and an AI data analysis agent.
            </li>
            <li>
              Before that I owned the eval service at <BrandLink brand="askturing" /> and built the
              retrieval and benchmarks for a production <span className="hl hl-violet">RAG system</span>.
            </li>
            <li>
              I learn by rebuilding things: an autograd engine in NumPy, a memory layer for agents, a research agent
              that cites its sources. Lately I keep drifting toward{" "}
              <span className="hl hl-green">mechanistic interpretability</span>.
            </li>
            <li className="text-muted-foreground">Next: a PhD in Europe, then a lab working on the frontier.</li>
          </ul>

          <nav aria-label="Links" className="mt-8 grid grid-cols-5 divide-x border-y">
            {LINKS.map(({ label, href }) => {
              const { Icon, tint } = LINK_ICONS[label]
              const external = href.startsWith("http")
              return (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  download={label === "CV" ? "Ahammad-Nafiz-CV.pdf" : undefined}
                  className="group flex flex-col items-center justify-center gap-1.5 whitespace-nowrap py-3 text-[13px] sm:flex-row sm:gap-2 sm:py-4 sm:text-sm"
                >
                  <span
                    style={{ color: `hsl(${tint})`, backgroundColor: `hsl(${tint} / 0.14)` }}
                    className="grid h-[22px] w-[22px] place-items-center rounded-md sm:h-7 sm:w-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                  {label}
                  <span
                    aria-hidden
                    className="hidden text-muted-foreground transition-[transform,color] sm:inline duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-foreground"
                  >
                    {label === "CV" ? "↓" : "↗"}
                  </span>
                </a>
              )
            })}
          </nav>

          <Section
            id="work"
            n="01"
            title="Work"
            aside={<span className="text-xs text-muted-foreground">{projects.length} projects</span>}
          >
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="writing"
            n="02"
            title="Writing"
            aside={
              <Link
                href="/writing/"
                className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                All {posts.length} posts →
              </Link>
            }
          >
            <PostList posts={posts.slice(0, 4)} />
          </Section>

          <Section id="experience" n="03" title="Experience">
            <ul className="divide-y">
              {experience.map((e) => (
                <li key={e.role} className="py-4 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium">
                      <BrandLink brand={e.brand} chip={false} />
                      {e.current && (
                        <span className="hl hl-green ml-2 align-middle text-[10px] font-medium uppercase tracking-wide">
                          Now
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{e.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.role}</p>
                  {e.note && <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-foreground/85">{e.note}</p>}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="recognition" n="04" title="Recognition">
            <ul className="divide-y">
              {recognition.map((r) => (
                <li key={r.title} className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-sm text-muted-foreground">{r.note}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{r.date}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contact" n="05" title="Contact">
            <p className="max-w-[46ch] leading-relaxed text-muted-foreground">
              Hiring an AI or machine learning engineer, want to talk research, or have a good problem? My inbox is open.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block break-all font-serif text-[1.8rem] leading-tight underline decoration-border decoration-1 underline-offset-[6px] transition-colors duration-500 hover:decoration-foreground sm:text-[2.5rem]"
            >
              {site.email}
            </a>
            <div className="mt-6">
              <a
                href={site.cv}
                download="Ahammad-Nafiz-CV.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
              >
                Download CV <span aria-hidden>↓</span>
              </a>
            </div>
          </Section>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
