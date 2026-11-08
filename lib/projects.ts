export type Project = {
  slug: string
  name: string
  kind: string
  status: "Open source" | "Live" | "In development"
  /** One or two sentences for the home page card. */
  summary: string
  /** Opening paragraph on the project page. */
  intro: string
  highlights: string[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "fizzlabai",
    name: "fizzlabai",
    kind: "Deep research agent",
    status: "In development",
    summary:
      "A research agent that runs a fixed 8-phase pipeline over the open web and returns a cited Markdown answer with a full trace.",
    intro:
      "You ask a question and fizzlabai plans, searches, reads, drafts, checks and rewrites until the answer holds up. Every LLM call, tool call and source URL it touches shows up in a live trace, so you can see why it said what it said.",
    highlights: [
      "Eight phases: plan, search, read, synth, verify, re-plan, polish, close",
      "The verify step scores grounding, answer fidelity and depth gaps separately, and re-plans only when one of them falls short",
      "Ships the best-scoring pass, not the latest one",
      "Tracing through OpenTelemetry into Tempo, Loki, Prometheus and Grafana",
      "Runs on k3s on a single VPS, deployed with ArgoCD",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Gemini", "Postgres", "pgvector", "BM25", "OpenTelemetry", "Next.js"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/fizzlabai" }],
  },
  {
    slug: "engram",
    name: "Engram",
    kind: "Persistent memory for AI agents",
    status: "Open source",
    summary:
      "A memory library on PostgreSQL and pgvector. 90.8% on LongMemEval-S, 94.1% on LoCoMo-10 and 79.7% on BEAM 1M, with no LLM calls at ingest.",
    intro:
      "Agents that run for weeks need to remember what happened last Tuesday without re-reading every conversation. Engram stores raw turns as they come in, then finds the right evidence at question time with hybrid search, graph traversal and durable task ledgers.",
    highlights: [
      "90.8% on LongMemEval-S (500 questions), 94.1% on LoCoMo-10 (1,540) and 79.7% on BEAM 1M (700)",
      "Retrieval finds the gold session for all 470 answerable LongMemEval questions",
      "No LLM calls at ingest: embeddings run on-device with all-MiniLM-L6-v2",
      "On BEAM's 1M-token conversations it sends 17× less context than the full history",
      "Hybrid search with BM25, vectors and reciprocal rank fusion",
    ],
    stack: ["Python", "PostgreSQL", "pgvector", "BM25", "RRF", "Graph traversal"],
    links: [
      { label: "GitHub", href: "https://github.com/ahammadnafiz/engram" },
      { label: "Docs", href: "https://ahammadnafiz.github.io/engram/" },
    ],
  },
  {
    slug: "personal-knowledge-assistant",
    name: "Personal Knowledge Assistant",
    kind: "Multi-agent RAG system",
    status: "Open source",
    summary:
      "Ask questions across your own books and notes. Low-confidence answers fall back to web search automatically.",
    intro:
      "A chat interface over your personal library. It decides how sure it is about each answer and routes accordingly: confident answers come straight from your documents, shaky ones go out to the web first.",
    highlights: [
      "Confidence-based routing between your documents and the web",
      "Knowledge-strip decomposition to keep only the relevant parts of each retrieved chunk",
      "Ingests PDF, TXT, Markdown, DOCX and PPTX",
      "FAISS vector store for fast retrieval",
    ],
    stack: ["Python", "FastAPI", "FAISS", "Gemini", "Next.js"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/Personal-Knowledge-Assistant" }],
  },
  {
    slug: "analyzia",
    name: "Analyzia",
    kind: "Talk to your CSV data",
    status: "Live",
    summary:
      "Ask a question about a CSV in plain English and get the pandas analysis and a Plotly chart back.",
    intro:
      "Upload a CSV and talk to it. A LangChain agent turns each question into pandas code, runs it, and answers with a chart and a short explanation. It remembers the conversation, so follow-up questions work.",
    highlights: [
      "Plain-English questions become pandas analysis and Plotly charts",
      "Answers come with a confidence score",
      "Conversation memory for follow-up questions",
      "Live on Streamlit, 22 stars on GitHub",
    ],
    stack: ["Python", "LangChain", "Gemini", "pandas", "Plotly", "Streamlit"],
    links: [
      { label: "Live app", href: "https://analyzia.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/ahammadnafiz/Analyzia" },
    ],
  },
  {
    slug: "smartprice-intelligence",
    name: "SmartPrice Intelligence",
    kind: "Smartphone market analytics",
    status: "Open source",
    summary:
      "10,000+ phones from 37 brands scraped from GSMArena, then CatBoost and XGBoost models that predict price from specs.",
    intro:
      "How much should a phone cost, given what's inside it? I scraped GSMArena end to end, cleaned more than 50 spec fields per phone, and trained models to predict price and price segment.",
    highlights: [
      "10,000+ phones across 37 brands, scraped with adaptive rate limiting",
      "50+ engineered features from raw spec sheets",
      "R² of 0.772 on price, 74.4% accuracy on price segment",
    ],
    stack: ["Python", "CatBoost", "XGBoost", "pandas", "Scraping"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/SmartPrice-Intelligence" }],
  },
  {
    slug: "fiztorch",
    name: "FizTorch",
    kind: "Deep learning framework from scratch",
    status: "Open source",
    summary: "A small PyTorch-style framework in NumPy: autograd, core layers and an Adam optimizer.",
    intro:
      "I wanted to know what happens inside loss.backward(), so I wrote it. FizTorch is a tensor library with automatic differentiation, a handful of layers and an optimizer, small enough to read in an afternoon.",
    highlights: [
      "Autograd engine on top of NumPy",
      "Linear, ReLU and Sigmoid layers with a Sequential container",
      "Adam optimizer",
      "Checked on MNIST and California Housing",
    ],
    stack: ["Python", "NumPy", "Autograd"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/FizTorch" }],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** Previous and next project for the links at the foot of a project page, wrapping at both ends. */
export function getNeighbours(slug: string): { prev?: Project; next?: Project } {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  const n = projects.length
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] }
}
