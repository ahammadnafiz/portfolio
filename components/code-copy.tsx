"use client"

import { useEffect } from "react"

/** One click listener for every "Copy" button in a post (buttons are rendered at build time). */
export function CodeCopy() {
  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>(".copy-code")
      const code = button?.parentElement?.querySelector("pre")
      if (!button || !code) return
      try {
        await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""))
        button.textContent = "Copied"
      } catch {
        button.textContent = "Press Ctrl+C"
      }
      button.dataset.state = "done"
      setTimeout(() => {
        button.textContent = "Copy"
        delete button.dataset.state
      }, 1600)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
