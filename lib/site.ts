export const SITE_URL = "https://ahammadnafiz.com"

/** The picture shown when a link to any page is shared (Facebook, LinkedIn, X, WhatsApp, Slack). */
export const SHARE_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Ahammad Nafiz, AI and machine learning engineer in Dhaka",
}

export const OG_SIZE = { width: 1200, height: 630 }

/** A post's or project's own share image, drawn at build time by app/og/. */
export const ogFor = (kind: "writing" | "work", slug: string, alt: string) => ({
  url: `${SITE_URL}/og/${kind}/${slug}.png`,
  ...OG_SIZE,
  alt,
})

export const site = {
  name: "Ahammad Nafiz",
  title: "Associate Product Engineer, DeepDive at Markopolo AI",
  location: "Dhaka, Bangladesh",
  email: "hello@ahammadnafiz.com",
  cv: "/Ahammad-Nafiz-CV.pdf",
  description:
    "Ahammad Nafiz is an AI and machine learning engineer in Dhaka, Bangladesh. Associate Product Engineer at Markopolo AI, building RAG systems, LLM agents and agent memory.",
  socials: [
    { label: "GitHub", href: "https://github.com/ahammadnafiz" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahammad-nafiz/" },
    { label: "X", href: "https://x.com/ahammadnafi_z" },
  ],
}

/** Companies linked from the intro and Experience, with self-hosted logos. */
export const brands = {
  markopolo: { name: "Markopolo AI", href: "https://markopolo.ai/", logo: "/logos/markopolo.png" },
  deepdive: { name: "DeepDive", href: "https://www.deepdiveplatform.com/", logo: "/logos/deepdive.png" },
  askturing: { name: "AskTuring.ai", href: "https://www.askturing.ai/", logo: "/logos/askturing.png" },
  // Transparent emblem: shown without the tile border.
  uiu: { name: "United International University", href: "https://www.uiu.ac.bd/", logo: "/logos/uiu-emblem.png", bare: true },
} satisfies Record<string, { name: string; href: string; logo: string; bare?: boolean }>

export const experience = [
  {
    org: "Markopolo AI",
    brand: "markopolo" as const,
    role: "Associate Product Engineer, DeepDive",
    date: "Aug 2026 – Present",
    current: true,
    note: "Working on DeepDive, an AI social listening platform, plus an AEO (answer engine optimization) visibility tool and an AI data analysis agent, across a TypeScript and Python LLM stack.",
  },
  {
    org: "AskTuring.ai",
    brand: "askturing" as const,
    role: "Jr. Software Engineer",
    date: "Sep 2025 – May 2026",
    current: false,
    note: "Owned the LLM evaluation service, benchmarking RAG on HotpotQA, MuSiQue, FinQA and CUAD, and built Deepen Answer, a production RAG pipeline with hybrid BM25 and vector retrieval.",
  },
  {
    org: "United International University",
    brand: "uiu" as const,
    role: "Research Assistant",
    date: "Dec 2025 – Feb 2026",
    current: false,
    note: "Researched autonomous AI agents and multi-agent systems, and contributed to papers on LLM applications, retrieval and agentic workflow design.",
  },
]

export const recognition = [
  { title: "Champion, IC6 University Innovation Hub", note: "BDT 60,000 pre-seed after a 15-week program", date: "Oct 2025" },
  { title: "Best Prototype, Blockchain Olympiad", note: "Team Auctra, UIU CSE Fest. BDT 20,000 prize", date: "Jan 2025" },
  { title: "Champion, CSE Project Show", note: "Predicta, an end-to-end data analysis and ML platform", date: "Jun 2024" },
  { title: "1st Runner-Up, Data Innovators Challenge", note: "Sales analytics track", date: "2024" },
]
