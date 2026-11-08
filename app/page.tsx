import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { Band, Gap, Section } from "@/components/frame"
import { XIcon } from "@/components/icons"
import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DhakaClock } from "@/components/dhaka-clock"
import { projects } from "@/lib/projects"
import { experience, recognition, site } from "@/lib/site"

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, X: XIcon }

const LINKS = [
  ...site.socials.map((s) => ({ ...s, Icon: SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS] })),
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "CV", href: site.cv, Icon: FileText },
]

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="enter">
        {/* Banner + profile */}
        <Band className="p-2 sm:p-2.5">
          <img
            src="/covers/banner.svg"
            alt=""
            width={1520}
            height={360}
            fetchPriority="high"
            className="h-28 w-full rounded-lg object-cover sm:h-44"
          />
        </Band>
        <Band className="flex items-center gap-4 px-5 py-5 sm:gap-6 sm:px-6">
          <img
            src="/avatar.jpg"
            alt="Ahammad Nafiz"
            width={320}
            height={320}
            className="h-20 w-20 shrink-0 rounded-xl border-2 object-cover grayscale sm:h-28 sm:w-28"
          />
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--live))]" />
              Open to ML / AI roles and research
            </p>
            <h1 className="mt-1 font-serif text-[2.4rem] leading-[1.05] sm:text-5xl">{site.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              {site.role} · {site.location}
              <span className="sm:hidden">
                {" "}
                · <DhakaClock />
              </span>
            </p>
          </div>
        </Band>

        <Gap />

        <Section id="about" title="About">
          <ul className="list-disc space-y-3 py-5 pl-10 pr-5 leading-relaxed marker:text-muted-foreground sm:pl-11 sm:pr-6 sm:text-[17px]">
            <li>
              I&apos;m an Associate Product Engineer at <span className="hl hl-blue">Markopolo AI</span>, working on DeepDive
              across a TypeScript monorepo and the Python pipeline under it.
            </li>
            <li>
              Before that I owned the eval service at <span className="hl hl-orange">AskTuring.ai</span> and built
              the retrieval and benchmarks for a production <span className="hl hl-violet">RAG system</span>.
            </li>
            <li>
              I learn by rebuilding things: an autograd engine in NumPy, a memory layer for agents, a research agent
              that cites its sources. Lately I keep drifting toward{" "}
              <span className="hl hl-green">mechanistic interpretability</span>.
            </li>
            <li className="text-muted-foreground">Next: a PhD in Europe, then a lab working on the frontier.</li>
          </ul>
        </Section>

        <Band className="grid grid-cols-5">
          {LINKS.map(({ label, href, Icon }) => {
            const external = href.startsWith("http")
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                download={label === "CV" ? "Ahammad-Nafiz-CV.pdf" : undefined}
                className="group flex items-center justify-center gap-2 border-dashed px-2 py-3 text-sm transition-colors hover:bg-card sm:justify-start sm:px-4 [&:not(:last-child)]:border-r"
              >
                <span className="grid h-8 w-8 place-items-center rounded-md border bg-card">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline">{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </a>
            )
          })}
        </Band>

        <Gap />

        <Section id="work" title="Work" aside={<span className="text-xs text-muted-foreground">{projects.length} projects</span>}>
          <ul className="grid sm:grid-cols-2">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                className={`border-dashed ${i > 0 ? "border-t" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 === 0 ? "sm:border-r" : ""}`}
              >
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>

        <Gap />

        <Section id="experience" title="Experience">
          <ul>
            {experience.map((e, i) => (
              <li key={e.role} className={`px-5 py-4 sm:px-6 ${i > 0 ? "border-t border-dashed" : ""}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium">
                    {e.org}
                    {e.current && (
                      <span className="ml-2 rounded px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide hl hl-green">
                        Now
                      </span>
                    )}
                  </h3>
                  <span className="text-xs tabular-nums text-muted-foreground">{e.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{e.role}</p>
                {e.note && <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-foreground/85">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Gap />

        <Section id="recognition" title="Recognition">
          <ul>
            {recognition.map((r, i) => (
              <li
                key={r.title}
                className={`flex items-baseline justify-between gap-4 px-5 py-3 sm:px-6 ${i > 0 ? "border-t border-dashed" : ""}`}
              >
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-sm text-muted-foreground">{r.note}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{r.date}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Gap />

        <Section id="contact" title="Contact">
          <div className="px-5 py-8 sm:px-6 sm:py-10">
            <p className="max-w-[46ch] leading-relaxed text-muted-foreground">
              Hiring for ML or AI work, want to talk research, or have a good problem? My inbox is open.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block break-all font-serif text-[1.7rem] leading-tight underline decoration-border decoration-1 underline-offset-[6px] transition-colors hover:decoration-foreground sm:text-[2.4rem]"
            >
              {site.email}
            </a>
            <div className="mt-6">
              <a
                href={site.cv}
                download="Ahammad-Nafiz-CV.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Download CV <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </Section>

        <Gap />
      </main>
      <SiteFooter />
    </>
  )
}
