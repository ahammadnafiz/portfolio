import { FileText } from "lucide-react"
import { BrandLink } from "@/components/brand-link"
import { Container, Rule, Section } from "@/components/frame"
import { GitHubLogo, GmailLogo, LinkedInLogo, XLogo } from "@/components/icons"
import Link from "next/link"
import { PostList } from "@/components/post-list"
import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DhakaClock } from "@/components/dhaka-clock"
import { projects } from "@/lib/projects"
import { experience, recognition, site } from "@/lib/site"
import { getPosts } from "@/lib/writing"

/** Each platform's own logo. The CV is a file, not a platform, so it gets a plain document icon. */
const LINK_ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  GitHub: GitHubLogo,
  LinkedIn: LinkedInLogo,
  X: XLogo,
  Gmail: GmailLogo,
  CV: (p) => <FileText {...p} strokeWidth={1.75} />,
}

const LINKS = [
  ...site.socials,
  { label: "Gmail", href: `mailto:${site.email}` },
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
              className="h-20 w-20 shrink-0 border bg-card object-cover p-1 sm:h-28 sm:w-28"
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
          </ul>

          <Rule className="mt-8" />
          <nav aria-label="Links" className="grid grid-cols-5 divide-x">
            {LINKS.map(({ label, href }) => {
              const Icon = LINK_ICONS[label]
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
                  <Icon className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
                  {/* The X logo is the name, so the word is only for screen readers. */}
                  {label === "X" ? <span className="sr-only">X</span> : label}
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
          <Rule />

          <Section
            id="work"
            n="01"
            title="Work"
            aside={
              <Link
                href="/work/"
                className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                All {projects.length} projects →
              </Link>
            }
          >
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
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
                className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
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
