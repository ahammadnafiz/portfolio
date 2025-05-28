import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      {/* Pixel art grid lines - purely decorative, very subtle */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] sm:opacity-[0.03] z-0 bg-[linear-gradient(to_right,hsl(var(--accent))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--accent))_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] lg:bg-[size:24px_24px]"></div>
    </main>
  )
}
