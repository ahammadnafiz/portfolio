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
      "Atlas is source control for coding agents. It runs Claude Code, Codex and other agents side by side, records every session, and links each commit to the prompt and session that produced it, so a team can trace any line back to what the agent was told. I'm a core contributor: 146 commits and 12 merged pull requests, fourth of 52 contributors.",
    highlights: [
      "9.4k+ stars and 362 forks on GitHub, Apache 2.0",
      "Built Checkpoints and offline capture: each agent session is linked to the commits it produced, and the links survive rebases and amends",
      "Built the shared agent memory (revisions, reconciler, evidence and handoff), so a correction given to one agent reaches the others",
      "Built code search for agents: a SQLite code index, a code graph and hybrid semantic search",
      "Built the Security Agent with a local checkpoint scanner, plus Team Timeline and the Org Agent",
      "Added the frontend test suite and extended CI to the whole repo",
    ],
    stack: ["Rust", "Tauri", "TypeScript", "React", "SQLite", "HNSW", "ACP", "Claude Code", "Codex"],
    links: [{ label: "GitHub", href: "https://github.com/tryatlas/atlas" }],
  },
  {
    slug: "buyziz",
    name: "Buyziz",
    kind: "AI commerce platform",
    status: "Live",
    summary:
      "A free online store builder for Bangladeshi sellers, with an AI sales agent that sells in Bangla and English. I built the agent and the store builder, and led product engineering.",
    intro:
      "Buyziz lets a shop owner in Bangladesh open a free online store, take bKash, Nagad and cash on delivery, ship with Pathao, Steadfast or RedX, and run every order in one place. In front of the store sits an AI sales agent that chats with customers in Bangla or English, understands the product photos they send, and uses tool calling to find products and take orders.",
    highlights: [
      "AI sales agent: multimodal, Bangla and English, with tool calling for product search and orders",
      "Built the store builder for the multi-tenant SaaS",
      "Payments through bKash, Nagad and cash on delivery",
      "Delivery through Pathao, Steadfast and RedX, with every order managed in one place",
      "Led product engineering",
    ],
    stack: ["LLM agents", "Tool calling", "Multimodal", "Multi-tenant SaaS", "bKash", "Nagad"],
    links: [{ label: "Website", href: "https://buyziz.com" }],
  },
  {
    slug: "fizzlabai",
    name: "fizzlabai",
    kind: "Deep research agent",
    status: "In development",
    summary:
      "A deep research agent on LangGraph and Gemini 3 Flash. It runs an 8-phase pipeline over the open web and returns a cited Markdown answer with a live trace.",
    intro:
      "fizzlabai is an AI research agent I'm building solo. You ask a question and it plans, searches the web, reads, drafts, checks and rewrites until the answer holds up. Every LLM call, tool call and source URL it touches shows up in a live trace, so you can see why it said what it said. It's tuned for questions like \"what's the current evidence on X?\": primary sources first, recency-aware.",
    highlights: [
      "Eight phases (plan, search, read, synth, verify, re-plan, polish, close) with per-phase routing between Gemini 3 Flash and Flash-Lite",
      "The verifier scores grounding, answer fidelity and depth gaps separately; re-planning targets primary sources, a dropped constraint or missing depth",
      "Ships the best-scoring pass, not the latest one",
      "Memory and retrieval: pgvector embeddings plus Tantivy BM25, fused with reciprocal rank fusion; a JSONL event log is the source of truth",
      "Tracing through OpenTelemetry into Tempo, Loki, Prometheus and Grafana, with optional MLflow",
      "Runs on k3s on a single VPS, deployed with ArgoCD; async-only Python under mypy strict",
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Gemini 3 Flash",
      "Tavily",
      "Postgres",
      "pgvector",
      "BM25",
      "OpenTelemetry",
      "Next.js",
      "k3s",
    ],
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
      "Engram is an open-source memory layer for LLM agents. Agents that run for weeks need to remember what happened last Tuesday without re-reading every conversation. Engram stores raw turns as they come in, then finds the right evidence at question time with hybrid search (BM25 plus vector search), cross-encoder reranking, graph traversal and durable task ledgers.",
    highlights: [
      "90.8% on LongMemEval-S (500 questions), 94.1% on LoCoMo-10 (1,540) and 79.7% on BEAM 1M (700)",
      "Retrieval finds the gold session for all 470 answerable LongMemEval questions, with 99.7% mean recall",
      "Up to 14.9× cheaper than sending the whole conversation: 94.1% context compression on BEAM's 1M-token histories",
      "No LLM calls at ingest: embeddings run on-device with all-MiniLM-L6-v2",
      "Hybrid search over vectors, BM25, time decay and importance, fused with reciprocal rank fusion",
      "Multi-hop graph traversal with recursive CTEs, plus task ledgers and checkpoints for long-running agents",
    ],
    stack: ["Python", "PostgreSQL", "pgvector", "BM25", "RRF", "Cross-encoder rerank", "Sentence Transformers"],
    links: [
      { label: "GitHub", href: "https://github.com/ahammadnafiz/engram" },
      { label: "Docs", href: "https://ahammadnafiz.github.io/engram/" },
    ],
  },
  {
    slug: "personal-knowledge-assistant",
    name: "Personal Knowledge Assistant",
    kind: "RAG system for your own library",
    status: "Open source",
    summary:
      "A RAG system over your own books and notes with confidence-based routing: answers it isn't sure about fall back to web search automatically.",
    intro:
      "A RAG chatbot over your personal library. It rewrites your question, retrieves from your documents, then scores how relevant and reliable each result is. Confident answers come straight from your documents, uncertain ones blend in the web, and weak ones go to web search first.",
    highlights: [
      "Confidence routing: above 0.7 it answers from your documents, between 0.3 and 0.7 it blends in the web, below 0.3 it falls back to DuckDuckGo search",
      "Query rewriting and contextual compression before the answer is written",
      "Knowledge-strip decomposition keeps only the relevant parts of each retrieved chunk",
      "Ingests PDF, TXT, Markdown, DOCX and PPTX into a FAISS vector store",
      "Answers with Gemini 2.0 Flash, with chat memory and math rendering in the UI",
    ],
    stack: ["Python", "FastAPI", "LangChain", "FAISS", "Hugging Face embeddings", "Gemini 2.0 Flash", "Next.js"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/Personal-Knowledge-Assistant" }],
  },
  {
    slug: "fiztorch",
    name: "FizTorch",
    kind: "Deep learning framework from scratch",
    status: "Open source",
    summary:
      "A PyTorch-style deep learning framework built from scratch in NumPy: an autograd engine, core layers, a Sequential API and an Adam optimizer.",
    intro:
      "I wanted to know what happens inside loss.backward(), so I wrote it. FizTorch is a tensor library in Python and NumPy with automatic differentiation (backpropagation), a handful of neural network layers and an optimizer, small enough to read in an afternoon.",
    highlights: [
      "Tensor class with automatic differentiation on top of NumPy",
      "Linear, ReLU and Sigmoid layers, a Sequential container and a functional API with binary cross-entropy",
      "Adam optimizer with PyTorch-style zero_grad() and step()",
      "Trained on MNIST digits, California Housing regression and breast cancer classification",
    ],
    stack: ["Python", "NumPy", "Autograd", "Backpropagation"],
    links: [{ label: "GitHub", href: "https://github.com/ahammadnafiz/FizTorch" }],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
