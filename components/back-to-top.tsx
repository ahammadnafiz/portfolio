"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

/** Floating button that appears after scrolling down and returns to the top. */
export function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid h-10 w-10 place-items-center border bg-card text-muted-foreground transition-[opacity,transform,color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-secondary hover:text-foreground motion-reduce:transition-opacity ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
