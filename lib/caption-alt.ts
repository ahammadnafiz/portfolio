import type { Element, Root } from "hast"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"

/** An image followed by an italic caption with the same words: the caption describes it, so alt="". */
export function rehypeCaptionAlt() {
  return (tree: Root) => {
    visit(tree, "element", (p: Element) => {
      if (p.tagName !== "p") return
      const img = p.children.find((c): c is Element => c.type === "element" && c.tagName === "img")
      const em = p.children.find((c): c is Element => c.type === "element" && c.tagName === "em")
      if (!img || !em) return
      const norm = (s: unknown) => String(s ?? "").trim().toLowerCase()
      if (norm(img.properties.alt) === norm(toString(em))) img.properties.alt = ""
    })
  }
}
