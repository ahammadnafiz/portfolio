import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"

/**
 * The page title is the only h1. Renumber a post's headings by rank: the highest level used
 * becomes h2, the next one used becomes h3, and so on, and no heading sits more than one level
 * below the one before it.
 */
export function rehypeHeadingLevels() {
  return (tree: Root) => {
    const headings: Element[] = []
    visit(tree, "element", (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName)) headings.push(node)
    })
    const used = [...new Set(headings.map((h) => Number(h.tagName[1])))].sort((a, b) => a - b)
    let prev = 1
    for (const h of headings) {
      // Rank level, but at most one below the previous heading.
      const level = Math.min(6, used.indexOf(Number(h.tagName[1])) + 2, prev + 1)
      h.tagName = `h${level}`
      prev = level
    }
  }
}
