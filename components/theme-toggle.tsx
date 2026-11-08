"use client"

import { Moon, Sun } from "lucide-react"

/** Runs before first paint (inlined in <head>) so a saved choice never flashes the wrong theme. */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`

/** A soft two-note chime made in the browser: falling into dark, rising into light. */
function chime(toDark: boolean) {
  try {
    const ctx = new AudioContext()
    const notes = toDark ? [660, 495] : [495, 660]
    notes.forEach((freq, i) => {
      const t = ctx.currentTime + i * 0.09
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.045, t + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.6)
    })
    setTimeout(() => ctx.close(), 900)
  } catch {}
}

/** Flips between light and dark. Until clicked, the site follows the system setting. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
    const next = isDark ? "light" : "dark"
    root.dataset.theme = next
    chime(next === "dark")
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
