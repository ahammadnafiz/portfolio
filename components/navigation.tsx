"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // If we're near the bottom of the page, set contact as active
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        setActiveSection("contact")
        return
      }

      // Check sections from bottom to top to prioritize lower sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          
          if (scrollPosition >= offsetTop - 50) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Run on mount to set initial state
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b-2 border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg sm:text-xl font-mono font-bold hover:text-accent transition-colors uppercase tracking-wider"
          >
            Nafiz
          </button>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:flex space-x-4 lg:space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-xs sm:text-sm transition-colors uppercase ${
                    activeSection === item.id 
                      ? "text-accent border-b-2 border-accent" 
                      : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => {
                  const menu = document.getElementById('mobile-menu')
                  menu?.classList.toggle('hidden')
                }}
                className="font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                MENU
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden sm:hidden mt-4 pb-4 border-t border-border pt-4">
          <div className="flex flex-col space-y-3">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id)
                  document.getElementById('mobile-menu')?.classList.add('hidden')
                }}
                className={`font-mono text-sm transition-colors uppercase text-left ${
                  activeSection === item.id 
                    ? "text-accent" 
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
