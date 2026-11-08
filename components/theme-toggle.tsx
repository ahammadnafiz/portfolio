"use client"

import { Moon, Sun } from "lucide-react"

/** Runs before first paint (inlined in <head>) so a saved choice never flashes the wrong theme. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`

/** Flips between light and dark. Until clicked, the site follows the system setting. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
    const next = isDark ? "light" : "dark"
    root.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark"
      className="grid h-8 w-8 place-items-center text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground"
    >
      {/* Both icons render; CSS shows the right one, so there is no hydration flicker. */}
      <Sun className="theme-icon-sun h-4 w-4" />
      <Moon className="theme-icon-moon h-4 w-4" />
    </button>
  )
}
