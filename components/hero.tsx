"use client"

import { useEffect, useState } from "react"

const NAME = "AHAMMADNAFIZ"

const MARQUEE_ITEMS = [
  "OPEN TO ML / AI ENGINEERING ROLES",
  "RESEARCH ASSISTANT @ UIU",
  "RAG · LLM AGENTS · MECHANISTIC INTERPRETABILITY",
  "AIMING FOR A PHD IN EUROPE",
]

const MENU = [
  { n: "01", label: "About", href: "#about" },
  { n: "02", label: "Skills", href: "#skills" },
  { n: "03", label: "Work", href: "#projects" },
  { n: "04", label: "Contact", href: "#contact" },
]

const SPECS: { label: string; value: React.ReactNode }[] = [
  { label: "Now", value: "Research Assistant, UIU" },
  { label: "Before", value: "Jr. Software Engineer, AskTuring.ai" },
  { label: "Focus", value: "RAG · LLM Agents · Interpretability" },
  { label: "Goal", value: "PhD in Europe, then a frontier lab" },
]

function useDhakaClock() {
  const [time, setTime] = useState<string>("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Dhaka",
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000 * 15)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const time = useDhakaClock()

  useEffect(() => setMounted(true), [])

  return (
    <section
      id="home"
      className="relative min-h-screen-dynamic min-h-screen flex flex-col"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Ahammad Nafiz" />
      <meta itemProp="jobTitle" content="Machine Learning & AI Engineer" />
      <meta itemProp="url" content="https://ahammadnafiz.github.io/portfolio" />
      <meta itemProp="email" content="ahammadnafiz86@gmail.com" />
      <meta itemProp="address" content="Dhaka, Bangladesh" />

      {/* Availability marquee */}
      <div className="marquee-mask w-full bg-foreground text-background select-none">
        <div className="marquee-track animate-marquee py-2.5">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase px-5">
                    {item}
                  </span>
                  <span className="opacity-60">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Full-viewport composition, three bands distributed top → center → bottom */}
      <div className="flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
        {/* Top meta bar */}
        <div className="flex items-start justify-between gap-6">
          <p className="label label-ink">Machine Learning &amp; AI Engineer</p>
          <p className="label text-right leading-relaxed">
            Dhaka, Bangladesh
            <br className="hidden sm:block" />
            <span className="tabular-nums"> {time || "--:--"} local</span>
          </p>
        </div>

        {/* Center anchor: name + one-line thesis */}
        <div className="py-6">
          <h1
            className="font-display font-medium leading-[0.86] tracking-[-0.025em] text-foreground whitespace-nowrap text-[clamp(2rem,10.3vw,11rem)]"
            itemProp="name"
            aria-label="Ahammad Nafiz"
          >
            {NAME.split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block"
                style={mounted ? { animation: `ink-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both` } : { opacity: 0 }}
              >
                {ch}
              </span>
            ))}
          </h1>
          <p className="mt-6 sm:mt-7 font-display text-[clamp(1.35rem,3.2vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-foreground/90 max-w-3xl">
            I build retrieval systems and LLM agents that hold up outside a notebook.
          </p>
        </div>

        {/* Bottom band: intro + spec index, aligned to a grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-[15px] sm:text-base leading-relaxed text-foreground/90" itemProp="description">
              Right now I&apos;m a research assistant at UIU, working on autonomous agents
              and reading a lot about mechanistic interpretability. Before that I was a
              junior engineer at AskTuring.ai, building the evaluation and retrieval behind
              a production RAG system.
            </p>
            <p className="mt-5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-muted-foreground flex items-center">
              <span className="inline-block w-2 h-2 bg-foreground mr-2.5" aria-hidden />
              Open to ML / AI roles &amp; research collaborations
            </p>
          </div>

          <dl className="lg:col-span-5 lg:col-start-8 self-end">
            {SPECS.map((s) => (
              <div key={s.label} className="grid grid-cols-4 gap-3 py-2.5 border-t border-border items-baseline">
                <dt className="col-span-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="col-span-3 font-mono text-xs sm:text-[0.8125rem] text-foreground/90">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Footer nav row */}
      <div className="px-5 sm:px-8 lg:px-12 py-4 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-3 justify-between">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Section navigation">
          {MENU.map((m) => (
            <a key={m.n} href={m.href} className="group flex items-center gap-2">
              <span className="font-mono text-[0.625rem] text-muted-foreground">{m.n}</span>
              <span className="link-editorial font-mono text-xs tracking-wide text-foreground">{m.label}</span>
            </a>
          ))}
        </nav>
        <a href="#about" className="group flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          Scroll
          <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
      </div>
    </section>
  )
}
