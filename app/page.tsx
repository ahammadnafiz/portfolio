import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Ahammad Nafiz - ML Researcher & Python Developer. Specializing in Natural Language Processing, Deep Learning, and AI research. Head of R&D at UIU Data Science Club.",
  openGraph: {
    title: "Ahammad Nafiz | ML Researcher & Python Developer",
    description: "ML Researcher & Python Developer specializing in Natural Language Processing, Deep Learning, and AI research.",
    url: "https://ahammadnafiz.github.io/portfolio",
    type: "website"
  }
}

export default function Home() {
  return (
    <>
      {/* Enhanced structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Ahammad Nafiz - ML Researcher & Python Developer",
            description: "Portfolio showcasing machine learning research, Python development projects, and AI innovations",
            url: "https://ahammadnafiz.github.io/portfolio",
            about: {
              "@type": "Person",
              name: "Ahammad Nafiz",
              jobTitle: "ML Researcher & Python Developer",
              description: "Specializing in Natural Language Processing, Deep Learning, and AI research"
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
        <Navigation />
        <Breadcrumbs />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        
        {/* Pixel art grid lines - purely decorative, very subtle */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] sm:opacity-[0.03] z-0 bg-[linear-gradient(to_right,hsl(var(--accent))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--accent))_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] lg:bg-[size:24px_24px]" aria-hidden="true"></div>
      </main>
    </>
  )
}
