import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { FadeInSection } from "@/components/fade-in-section"
import { BackToTop } from "@/components/back-to-top"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Ahammad Nafiz - ML & AI Engineer. Building RAG systems, LLM agents, and mechanistic interpretability. Head of R&D at UIU Data Science Club.",
  openGraph: {
    title: "Ahammad Nafiz | ML & AI Engineer",
    description: "ML & AI Engineer building RAG systems, LLM agents, and mechanistic interpretability.",
    url: "https://ahammadnafiz.github.io/portfolio",
    type: "website"
  }
}

export default function Home() {
  return (
    <>
      <ScrollIndicator />
      {/* Enhanced structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Ahammad Nafiz - ML & AI Engineer",
            description: "Portfolio showcasing machine learning research, Python development projects, and AI innovations",
            url: "https://ahammadnafiz.github.io/portfolio",
            about: {
              "@type": "Person",
              name: "Ahammad Nafiz",
              jobTitle: "ML & AI Engineer",
              description: "Building RAG systems, LLM agents, and mechanistic interpretability"
            },
            mainEntity: {
              "@type": "Portfolio",
              name: "Ahammad Nafiz Portfolio",
              description: "Comprehensive portfolio showcasing machine learning projects, research work, and technical skills"
            }
          })
        }}
      />
      
      <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden" role="main">
        <Hero />

        <FadeInSection><About /></FadeInSection>
        <FadeInSection><Skills /></FadeInSection>
        <FadeInSection><Projects /></FadeInSection>
        <FadeInSection><Contact /></FadeInSection>

        {/* Graph-paper grid — subtle engineering texture under everything */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:22px_22px] lg:bg-[size:28px_28px]" aria-hidden="true"></div>
      </main>
      
      <BackToTop />
    </>
  )
}
