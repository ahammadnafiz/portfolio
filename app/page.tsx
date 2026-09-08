import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { FadeInSection } from "@/components/fade-in-section"
import { BackToTop } from "@/components/back-to-top"
import type { Metadata } from "next"

// `absolute` is required here: title.template in layout.tsx does not apply to
// metadata declared in the same route segment, so a plain string renders bare.
export const metadata: Metadata = {
  title: {
    absolute: "Ahammad Nafiz — Machine Learning & AI Engineer",
  },
  description:
    "ML engineer in Dhaka working on RAG systems, LLM agents, and agent memory. Currently at Markopolo AI. Previously AskTuring.ai and research at UIU.",
}

export default function Home() {
  return (
    <>
      <ScrollIndicator />

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
