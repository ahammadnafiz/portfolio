import type { Element, Root, Text } from "hast"
import { visit } from "unist-util-visit"

/**
 * Browsers' native MathML ignores mathvariant (except "normal"), so \mathbf{w} would show as a
 * plain w and \mathbb{R} as R. Rewrite those letters into Unicode math alphanumerics, which
 * every math font draws, and drop the attribute.
 */

// Letters that live outside the main block (pre-Unicode "letterlike" symbols).
const HOLES: Record<string, Record<string, string>> = {
  script: { B: "ℬ", E: "ℰ", F: "ℱ", H: "ℋ", I: "ℐ", L: "ℒ", M: "ℳ", R: "ℛ", e: "ℯ", g: "ℊ", o: "ℴ" },
  "double-struck": { C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ" },
}

// First code point for A, a and 0 in each style.
const START: Record<string, { upper: number; lower: number; digit?: number }> = {
  bold: { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
  "bold-italic": { upper: 0x1d468, lower: 0x1d482 },
  script: { upper: 0x1d49c, lower: 0x1d4b6 },
  "double-struck": { upper: 0x1d538, lower: 0x1d552, digit: 0x1d7d8 },
}

// Bold Greek: Α..Ω (with the final-sigma gap) and α..ω.
const BOLD_GREEK_UPPER = 0x1d6a8
const BOLD_GREEK_LOWER = 0x1d6c2

export function styleChar(ch: string, variant: string): string {
  const hole = HOLES[variant]?.[ch]
  if (hole) return hole
  const s = START[variant]
  if (!s) return ch
  const c = ch.codePointAt(0)!
  if (c >= 65 && c <= 90) return String.fromCodePoint(s.upper + c - 65)
  if (c >= 97 && c <= 122) return String.fromCodePoint(s.lower + c - 97)
  if (s.digit && c >= 48 && c <= 57) return String.fromCodePoint(s.digit + c - 48)
  if (variant === "bold" && c >= 0x391 && c <= 0x3a9) return String.fromCodePoint(BOLD_GREEK_UPPER + c - 0x391)
  if (variant === "bold" && c >= 0x3b1 && c <= 0x3c9) return String.fromCodePoint(BOLD_GREEK_LOWER + c - 0x3b1)
  return ch
}

export function rehypeMathLetters() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const variant = node.properties?.mathVariant ?? node.properties?.mathvariant
      if (typeof variant !== "string" || !(variant in START)) return
      visit(node, "text", (t: Text) => {
        t.value = Array.from(t.value, (ch) => styleChar(ch, variant)).join("")
      })
      delete node.properties.mathVariant
      delete node.properties.mathvariant
    })
  }
}
