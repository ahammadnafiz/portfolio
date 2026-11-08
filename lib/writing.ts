import fs from "node:fs"
import path from "node:path"
import rehypeShiki from "@shikijs/rehype"
import matter from "gray-matter"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { rehypeCaptionAlt } from "./caption-alt"
import { rehypeHeadingLevels } from "./heading-levels"
import { rehypeMathLetters } from "./math-letters"

export type Post = {
  slug: string
  title: string
  /** YYYY-MM-DD, exactly as written in the post. */
  date: string
  description: string
  tags: string[]
  minutes: number
  body: string
}

const DIR = path.join(process.cwd(), "content/writing")

function load(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"))
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    // gray-matter keeps quoted YAML dates as strings; guard against a parsed Date anyway.
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    description: String(data.description ?? ""),
    tags: data.tags ?? [],
    minutes: Math.max(1, Math.round(words / 220)),
    body: content,
  }
}

let cache: Post[] | undefined

/** All posts, newest first. */
export function getPosts(): Post[] {
  cache ??= fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .sort((a, b) => b.date.localeCompare(a.date))
  return cache
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

/** Markdown to HTML at build time: MathML math, highlighted code and heading anchors, no client JS. */
export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHeadingLevels)
    .use(rehypeCaptionAlt)
    .use(rehypeSlug)
    // Native MathML: far lighter than KaTeX's HTML (no stylesheet, fonts or deep span trees).
    .use(rehypeKatex, { output: "mathml" })
    .use(rehypeMathLetters)
    .use(rehypeShiki, {
      themes: { light: "github-light-default", dark: "github-dark-default" },
      langs: ["python", "cpp", "bash"],
      defaultLanguage: "text",
      fallbackLanguage: "text",
    })
    .use(rehypeStringify)
    .process(md)
  return String(file)
}

/** "2026-04-28" -> "28 Apr 2026" (no time zone involved). */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number)
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]
  return `${d} ${month} ${y}`
}

/** Posts written in Bangla get lang="bn" so browsers and search engines read them right. */
export function langOf(post: Post): "bn" | "en" {
  return /[ঀ-৿]/.test(post.title) ? "bn" : "en"
}
