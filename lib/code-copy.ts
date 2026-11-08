import type { Element, Root } from "hast"
import { visit } from "unist-util-visit"

/** Wrap each code block with a "Copy" button (the click handler is components/code-copy.tsx). */
export function rehypeCodeCopy() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return
      const button: Element = {
        type: "element",
        tagName: "button",
        properties: { type: "button", className: ["copy-code"], ariaLabel: "Copy code" },
        children: [{ type: "text", value: "Copy" }],
      }
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"] },
        children: [button, node],
      }
      return index + 1
    })
  }
}
