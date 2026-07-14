const EXPERIENCE = [
  {
    org: "United International University",
    role: "Research Assistant",
    date: "Dec 2025 — Present",
    note: "Researching autonomous agents and multi-agent systems, and helping with papers on LLM applications, retrieval, and agentic workflow design.",
  },
  {
    org: "AskTuring.ai",
    role: "Jr. Software Engineer (former)",
    date: "Sep 2025 — May 2026",
    note: "Owned the eval service and admin dashboard, automating RAG benchmarks over HotpotQA, MuSiQue, FinQA, and CUAD. Built Deepen Answer: extended-thinking LLMs, an agent that fills its own knowledge gaps, and hybrid BM25 + vector retrieval with RRF.",
  },
]

const ACHIEVEMENTS = [
  { title: "Champion — IC6 University Innovation Hub", date: "Oct 2025", note: "BDT 60,000 pre-seed after a 15-week program." },
  { title: "Best Prototype — Blockchain Olympiad", date: "Jan 2025", note: "Team Auctra, UIU CSE Fest. BDT 20,000 prize." },
  { title: "Champion — CSE Project Show (Predicta)", date: "Jun 2024", note: "End-to-end data analysis & ML platform." },
  { title: "1st Runner-Up — Data Innovators Challenge", date: "2024", note: "Sales analytics track." },
]

export function About() {
  return (
    <section
      id="about"
      className="relative w-full border-t border-border px-5 sm:px-8 lg:px-12 py-14 sm:py-16"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="flex items-baseline gap-4 mb-8 sm:mb-10">
        <span className="label">( 01 )</span>
        <h2 className="font-display font-medium text-[clamp(2rem,6vw,4rem)] leading-none tracking-[-0.02em]">
          About
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10">
        {/* Bio */}
        <div className="lg:col-span-5">
          <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-foreground/90 max-w-xl">
            <p>
              I&apos;m a data science student at UIU and an ML engineer. My last role was
              junior engineer at AskTuring.ai, where I owned the evaluation service and
              built Deepen Answer, a RAG pipeline that pairs extended-thinking models with
              an agent that fills its own knowledge gaps.
            </p>
            <p>
              I tend to learn things by rebuilding them. An autograd engine in NumPy. A
              memory layer for agents that cut context cost by 22× without dropping
              accuracy. A research agent that plans, searches, and cites its sources.
              Lately I keep drifting toward interpretability, trying to work out what these
              models are actually doing inside.
            </p>
            <p className="text-muted-foreground">
              Next I want a PhD in Europe, and after that a lab working on the frontier.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`${process.env.NODE_ENV === "production" ? "/portfolio" : ""}/Ahammad_Nafiz_CV.pdf`}
              download="Ahammad_Nafiz_CV.pdf"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase"
            >
              <span className="border-b border-foreground pb-0.5 group-hover:border-transparent transition-colors">
                Download CV
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="mailto:ahammadnafiz86@gmail.com"
              className="link-editorial font-mono text-xs tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground"
            >
              ahammadnafiz86@gmail.com
            </a>
          </div>
        </div>

        {/* Experience ledger */}
        <div className="lg:col-span-7">
          <p className="label mb-4">[ Experience ]</p>
          <ul>
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="py-4 border-t border-border">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg sm:text-xl tracking-[-0.01em]">{e.org}</h3>
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-muted-foreground">
                    {e.date}
                  </span>
                </div>
                <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-foreground/80 mt-1">
                  {e.role}
                </p>
                <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed mt-2 max-w-2xl">
                  {e.note}
                </p>
              </li>
            ))}
          </ul>
          <div className="py-4 border-t border-border flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-lg sm:text-xl">B.Sc. in Data Science — UIU</h3>
            <span className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-muted-foreground">
              2023 — Present
            </span>
          </div>
        </div>
      </div>

      {/* Achievements strip */}
      <div className="mt-10 pt-8 border-t border-border">
        <p className="label mb-5">[ Recognition ]</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="border-t border-foreground pt-3">
              <p className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-muted-foreground mb-1.5">
                {a.date}
              </p>
              <h4 className="text-sm font-medium leading-snug">{a.title}</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
