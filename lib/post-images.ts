import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"

/**
 * Authors drop images in content/writing/images/ and write ![alt](images/plot.png).
 * scripts/post-images.mjs turns them into public/writing/images/<name>.webp before each build;
 * this points the rendered <img> at that copy. Keep the naming rule in sync with the script.
 */
export function webpName(file: string): string {
  const base = file.replace(/\.[^.]+$/, "")
  return `${base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}.webp`
}

const LOCAL = /^(?:\.\/)?images\/([^/]+\.(?:png|jpe?g|gif|webp))$/i

export function rehypePostImages() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return
      const m = String(node.properties.src ?? "").match(LOCAL)
      if (m) node.properties.src = `/writing/images/${webpName(decodeURIComponent(m[1]))}`
      node.properties.loading ??= "lazy"
      node.properties.decoding ??= "async"
    })
  }
}
