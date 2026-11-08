import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Instrument_Serif, Noto_Sans_Bengali } from "next/font/google"
import { Analytics } from "@/components/analytics"
import { SCROLL_RESET_SCRIPT } from "@/components/scroll-reset"
import { THEME_SCRIPT } from "@/components/theme-toggle"
import { SITE_URL, site } from "@/lib/site"
import "./globals.css"

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif", display: "swap" })
// Bangla text (one post so far). Not preloaded: its unicode-range means it only downloads where Bangla appears.
const bengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-bengali", display: "swap", preload: false })

const TITLE = "Ahammad Nafiz, AI and machine learning engineer in Dhaka"
const OG_IMAGE = `${SITE_URL}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Ahammad Nafiz" },
  description: site.description,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: TITLE,
    description: site.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ahammadnafi_z",
    creator: "@ahammadnafi_z",
    title: TITLE,
    description: site.description,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  other: { me: ["mailto:ahammadnafiz86@gmail.com", "https://github.com/ahammadnafiz"] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E8E6E1" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E0E" },
  ],
}

// One Person entity for the whole site, cross-referenced from ProfilePage by @id.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: TITLE,
      description: site.description,
      inLanguage: "en",
      // Static export: this evaluates once at build, so it tracks deploys.
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntity: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Ahammad Nafiz"
      }
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ahammad Nafiz",
      givenName: "Ahammad",
      familyName: "Nafiz",
      alternateName: "ahammadnafiz",
      disambiguatingDescription:
        "Machine learning and AI engineer based in Dhaka, Bangladesh, working on retrieval-augmented generation, LLM agents, and agent memory infrastructure.",
      description:
        "AI and machine learning engineer working on RAG systems, LLM agents, agent memory and LLM evaluation, moving toward mechanistic interpretability research. Data Science student at United International University.",
      url: `${SITE_URL}/`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
      image: OG_IMAGE,
      email: "mailto:ahammadnafiz86@gmail.com",
      jobTitle: "Associate Product Engineer, DeepDive",
      nationality: { "@type": "Country", name: "Bangladesh" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD"
      },
      worksFor: {
        "@type": "Organization",
        name: "Markopolo AI",
        url: "https://markopolo.ai/",
        description: "AI social listening and narrative intelligence (DeepDive)"
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "United International University",
        url: "https://www.uiu.ac.bd/",
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" }
      },
      knowsAbout: [
        "Retrieval-Augmented Generation",
        "LLM Agents",
        "Agent Memory",
        "LLM Evaluation",
        "Hybrid Search",
        "Reciprocal Rank Fusion",
        "Vector Search",
        "pgvector",
        "LangGraph",
        "Mechanistic Interpretability",
        "Multi-Agent Systems",
        "Machine Learning Engineering",
        "Python",
        "PyTorch",
        "FastAPI"
      ],
      sameAs: [
        "https://github.com/ahammadnafiz",
        "https://www.linkedin.com/in/ahammad-nafiz/",
        "https://x.com/ahammadnafi_z",
        "https://huggingface.co/ahammadnafiz",
        "https://ieeexplore.ieee.org/author/154406885670879",
        "https://medium.com/@ahammadnafizz"
      ],
      award: [
        "Champion, IC6 University Innovation Hub Program, UIU cohort (Oct 2025), BDT 60,000 pre-seed",
        "Best Prototype Award, Blockchain Olympiad, UIU CSE Fest (Jan 2025), BDT 20,000",
        "Champion, CSE Project Show 2024 (Spring), for Predicta (Jun 2024)",
        "1st Runner-Up, Data Innovators Challenge 2024, sales analytics track"
      ]
    }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${bengali.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: SCROLL_RESET_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
