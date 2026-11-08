export type Project = {
  slug: string
  name: string
  kind: string
  status: "Open source" | "Live" | "In development" | "Contributor"
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
    slug: "atlas",
    name: "Atlas",
    kind: "Source control for coding agents",
    status: "Contributor",
    summary:
      "Core contributor to Atlas, an open-source agentic IDE (Rust, Tauri, React, 9.4k+ stars) that links every git commit to the AI coding agent session that wrote it.",
    intro:
      "Atlas is an open-source agentic IDE that puts AI coding agents under version control: every commit is linked to the LLM agent session that produced it. I'm a core contributor, and I built Team Timeline, Org Agent and Atlas Memory, its multi-agent memory layer.",
    highlights: [
      "Open-source agentic IDE with 9.4k+ stars on GitHub",
      "Links every commit to the LLM agent session that wrote it",
      "Built Team Timeline and Org Agent",
      "Built Atlas Memory, a multi-agent memory layer with HNSW vector search",
    ],
    stack: ["Rust", "Tauri", "React", "HNSW", "LLM agents"],
    links: [{ label: "GitHub", href: "https://github.com/tryatlas/atlas" }],
  },
  {
    slug: "buyziz",
    name: "Buyziz",
    kind: "AI commerce platform",
    status: "Live",
    summary:
      "A multi-tenant e-commerce SaaS with an AI sales agent that sells in Bangla and English. I built the agent and the store builder, and led product engineering.",
    intro:
      "Buyziz lets a shop owner launch an online store and put an AI sales agent in front of it. The agent chats with customers in Bangla or English, understands the product photos they send, and uses tool calling to find products and take orders.",
    highlights: [
      "AI sales agent: multimodal, Bangla and English, with tool calling",
      "Built the store builder",
      "Led product engineering for the multi-tenant SaaS",
    ],
    stack: ["LLM agents", "Tool calling", "Multimodal", "Multi-tenant SaaS"],
    links: [{ label: "Website", href: "https://buyziz.com" }],
  },
  {
    slug: "fizzlabai",
    name: "fizzlabai",
    kind: "Deep research agent",
    status: "In development",
    summary:
      "A deep research agent built with LangGraph and Gemini. It runs a fixed 8-phase pipeline over the open web and returns a cited Markdown answer with a full trace.",
    intro:
      "fizzlabai is an AI research agent. You ask a question and it plans, searches the web, reads, drafts, checks and rewrites until the answer holds up. Every LLM call, tool call and source URL it touches shows up in a live trace, so you can see why it said what it said.",
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
      "Long-term memory for AI agents on PostgreSQL and pgvector. 90.8% on LongMemEval-S, 94.1% on LoCoMo-10 and 79.7% on BEAM 1M, with no LLM calls at ingest.",
    intro:
      "Engram is an open-source memory layer for LLM agents. Agents that run for weeks need to remember what happened last Tuesday without re-reading every conversation. Engram stores raw turns as they come in, then finds the right evidence at question time with hybrid search (BM25 plus vector search), graph traversal and durable task ledgers.",
    highlights: [
      "90.8% on LongMemEval-S (500 questions), 94.1% on LoCoMo-10 (1,540) and 79.7% on BEAM 1M (700)",
      "Retrieval finds the gold session for all 470 answerable LongMemEval questions",
      "No LLM calls at ingest: embeddings run on-device with all-MiniLM-L6-v2",
      "Cuts LLM context cost by up to 15× while holding over 90% accuracy on LongMemEval and LoCoMo",
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
      "A multi-agent RAG system for your own books and notes. Low-confidence answers fall back to web search automatically.",
    intro:
      "A RAG chatbot over your personal library. It scores how confident it is in each answer and routes accordingly: confident answers come straight from your documents, uncertain ones go out to web search first.",
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
    slug: "fiztorch",
    name: "FizTorch",
    kind: "Deep learning framework from scratch",
    status: "Open source",
    summary: "A PyTorch-style deep learning framework built from scratch in NumPy: an autograd engine, core layers and an Adam optimizer.",
    intro:
      "I wanted to know what happens inside loss.backward(), so I wrote it. FizTorch is a tensor library in Python and NumPy with automatic differentiation (backpropagation), a handful of neural network layers and an optimizer, small enough to read in an afternoon.",
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
