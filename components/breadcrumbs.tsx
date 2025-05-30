"use client"

import { useEffect, useState } from "react"

interface BreadcrumbItem {
  label: string
  href: string
  current: boolean
}

export function Breadcrumbs() {
  const [currentSection, setCurrentSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 50) {
          setCurrentSection(section)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "#home", current: currentSection === "home" },
    { label: "About", href: "#about", current: currentSection === "about" },
    { label: "Skills", href: "#skills", current: currentSection === "skills" },
    { label: "Projects", href: "#projects", current: currentSection === "projects" },
    { label: "Contact", href: "#contact", current: currentSection === "contact" }
  ]

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": `https://ahammadnafiz.github.io/portfolio${item.href}`
            }))
          })
        }}
      />
      
      {/* Visual Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb navigation" 
        className="sr-only lg:not-sr-only fixed left-4 top-1/2 transform -translate-y-1/2 z-40"
      >
        <ol className="flex flex-col space-y-2" role="list">
          {breadcrumbItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`block w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  item.current 
                    ? "bg-accent border-accent scale-125" 
                    : "border-accent/50 hover:border-accent hover:bg-accent/20"
                }`}
                aria-label={`Go to ${item.label} section`}
                aria-current={item.current ? "page" : undefined}
                title={item.label}
              />
              {item.current && (
                <span className="sr-only">Current section: {item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
