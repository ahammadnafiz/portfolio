"use client"

const PROJECTS = [
  {
    n: "01",
    name: "fizzlabai",
    kind: "Deep Research Agent",
    desc: "A solo deep-research agent running a deterministic 8-phase pipeline (plan, search, read, synth, verify, re-plan, polish, close) over the open web, producing cited Markdown with a full execution trace.",
    tags: ["LangGraph", "FastAPI", "pgvector", "OTel"],
    href: "https://github.com/ahammadnafiz/fizzlabai",
  },
  {
    n: "02",
    name: "Engram",
    kind: "Persistent Memory for AI Agents",
    desc: "A memory library on PostgreSQL + pgvector combining hybrid search (BM25 + vector + RRF), graph traversal, and durable task ledgers. 90.8% on LongMemEval-S, 94.1% on LoCoMo-10, 79.7% on BEAM 1M — with 17× less context on BEAM and no LLM calls at ingest.",
    tags: ["pgvector", "Hybrid Search", "Agent Memory"],
    href: "https://github.com/ahammadnafiz/engram",
  },
  {
    n: "03",
    name: "Personal Knowledge Assistant",
    kind: "Multi-Agent RAG System",
    desc: "A multi-agent RAG system with confidence-based routing, knowledge-strip decomposition, and automatic web-search fallback for low-confidence queries.",
    tags: ["Multi-Agent", "RAG", "Routing"],
    href: "https://github.com/ahammadnafiz/Personal-Knowledge-Assistant",
  },
  {
    n: "04",
    name: "Analyzia",
    kind: "AI-Powered CSV Analysis",
    desc: "A LangChain agent that turns plain-English questions over CSV data into pandas analysis and Plotly visualizations, with confidence-scored answers and conversation memory.",
    tags: ["LangChain", "Agents", "Plotly"],
    href: "https://github.com/ahammadnafiz/Analyzia",
  },
  {
    n: "05",
    name: "SmartPrice Intelligence",
    kind: "Smartphone Market Analytics",
    desc: "Scraped 10,000+ listings across 37 brands from GSMArena under adaptive rate limiting, then trained CatBoost / XGBoost on 50+ engineered spec features (R² = 0.772, 74.4% price-segment accuracy).",
    tags: ["CatBoost", "XGBoost", "Scraping"],
    href: "https://github.com/ahammadnafiz/SmartPrice-Intelligence",
  },
  {
    n: "06",
    name: "FizTorch",
    kind: "Deep Learning Framework",
    desc: "A NumPy-based deep-learning framework from scratch: autograd engine, core layers, and an Adam optimizer, validated on MNIST and California Housing.",
    tags: ["NumPy", "Autograd", "From Scratch"],
    href: "https://github.com/ahammadnafiz/FizTorch",
  },
]

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full border-t border-border px-5 sm:px-8 lg:px-12 py-14 sm:py-16"
    >
      <div className="flex items-baseline justify-between gap-4 mb-8 sm:mb-10">
        <div className="flex items-baseline gap-4">
          <span className="label">( 03 )</span>
          <h2 className="font-display font-medium text-[clamp(2rem,6vw,4rem)] leading-none tracking-[-0.02em]">
            Work
          </h2>
        </div>
        <span className="hidden sm:block label">Selected · 2024 — 2026</span>
      </div>

      <ul>
        {PROJECTS.map((p) => (
          <li key={p.n} className="border-t border-border last:border-b">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-5 sm:py-6 transition-colors duration-200 hover:bg-foreground hover:text-background"
            >
              <div className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline px-1 sm:px-3">
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-muted-foreground group-hover:text-background/60">
                  {p.n}
                </span>

                <div className="col-span-10 sm:col-span-5">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl leading-[1.05] tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  <p className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted-foreground group-hover:text-background/60 mt-1.5">
                    {p.kind}
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-5">
                  <p className="text-[13px] sm:text-sm leading-relaxed text-muted-foreground group-hover:text-background/80 max-w-md">
                    {p.desc}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-foreground/50 group-hover:text-background/70"
                      >
                        {t}
                      </span>
                    ))}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="hidden sm:block col-span-1 justify-self-end text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
