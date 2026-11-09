import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { projects } from "@/lib/projects"
import { getPosts, langOf } from "@/lib/writing"

// Checks the static export in out/. Run with `pnpm test:build` after `pnpm build`.
const OUT = path.resolve(__dirname, "../out")

const textFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) return textFiles(full)
    return /\.(html|txt|xml|json|webmanifest|js|css)$/.test(name) ? [full] : []
  })

describe("static build", () => {
  it("exists", () => {
    expect(existsSync(path.join(OUT, "index.html"))).toBe(true)
  })

  it("has a page and a screenshot for every project", () => {
    for (const p of projects) {
      expect(existsSync(path.join(OUT, "work", p.slug, "index.html")), p.slug).toBe(true)
      expect(existsSync(path.join(OUT, "projects", `${p.slug}.webp`)), p.slug).toBe(true)
    }
  })

  it("sends visitors to GitHub for more projects, with no /work/ list page", () => {
    expect(existsSync(path.join(OUT, "work", "index.html"))).toBe(false)
    expect(readFileSync(path.join(OUT, "sitemap.xml"), "utf8")).not.toContain("https://ahammadnafiz.com/work/</loc>")
    expect(readFileSync(path.join(OUT, "index.html"), "utf8")).toMatch(/href="https:\/\/github.com\/ahammadnafiz"[^>]*>More on GitHub/)
  })

  it("gives every page a share preview image for Facebook, LinkedIn and X", () => {
    const pages = textFiles(OUT).filter((f) => f.endsWith(".html") && !f.endsWith("404.html"))
    const bangla = new Set(getPosts().filter((p) => langOf(p) === "bn").map((p) => p.slug))
    const missing = pages.filter((f) => {
      const html = readFileSync(f, "utf8")
      // Posts and projects get their own image (except Bangla posts); other pages share the site image.
      const match = path.relative(OUT, f).match(/^(writing|work)\/([^/]+)\/index\.html$/)
      const own = match && !bangla.has(match[2]) ? match : null
      const image = own ? `https://ahammadnafiz.com/og/${own[1]}/${own[2]}.png` : "https://ahammadnafiz.com/og-image.png"
      if (own && !existsSync(path.join(OUT, "og", own[1], `${own[2]}.png`))) return true
      return !html.includes(`property="og:image" content="${image}"`) || !html.includes(`name="twitter:image" content="${image}"`)
    })
    expect(missing.map((f) => path.relative(OUT, f))).toEqual([])
  })

  it("draws each post's and project's share image as a 1200x630 PNG", () => {
    const posts = getPosts().filter((p) => langOf(p) === "en")
    const files = [...posts.map((p) => `writing/${p.slug}`), ...projects.map((p) => `work/${p.slug}`)]
    for (const f of files) {
      const png = readFileSync(path.join(OUT, "og", `${f}.png`))
      expect(png.subarray(1, 4).toString(), f).toBe("PNG")
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], f).toEqual([1200, 630])
    }
  })

  it("offers a site icon Google Search can use (a multiple of 48px)", () => {
    const html = readFileSync(path.join(OUT, "index.html"), "utf8")
    expect(html).toContain('<link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48"/>')
    expect(existsSync(path.join(OUT, "favicon-48x48.png"))).toBe(true)
  })

  it("no longer points at the old GitHub Pages portfolio", () => {
    const offenders = textFiles(OUT).filter((f) => {
      const text = readFileSync(f, "utf8")
      return text.includes("ahammadnafiz.github.io/portfolio") || text.includes('"/portfolio/')
    })
    expect(offenders).toEqual([])
  })

  it("uses the new domain for canonical links and the sitemap", () => {
    expect(readFileSync(path.join(OUT, "index.html"), "utf8")).toContain('rel="canonical" href="https://ahammadnafiz.com/"')
    expect(readFileSync(path.join(OUT, "sitemap.xml"), "utf8")).toContain("https://ahammadnafiz.com/work/engram/")
  })

  it("serves an llms.txt that names him and links every project page", () => {
    const file = path.join(OUT, "llms.txt")
    expect(existsSync(file)).toBe(true)
    const text = readFileSync(file, "utf8")
    expect(text.startsWith("# Ahammad Nafiz")).toBe(true)
    for (const p of projects) expect(text, p.slug).toContain(`https://ahammadnafiz.com/work/${p.slug}/`)
  })

  it("titles project pages with name and kind, keeping acronyms intact", () => {
    const title = (slug: string) => readFileSync(path.join(OUT, "work", slug, "index.html"), "utf8").match(/<title>(.*?)<\/title>/)?.[1]
    expect(title("buyziz")).toBe("Buyziz, AI commerce platform | Ahammad Nafiz")
    expect(title("engram")).toBe("Engram, persistent memory for AI agents | Ahammad Nafiz")
  })

  it("gives each project page structured data credited to him", () => {
    for (const p of projects) {
      const html = readFileSync(path.join(OUT, "work", p.slug, "index.html"), "utf8")
      expect(html, p.slug).toMatch(/"@type":"Software(SourceCode|Application)"/)
      expect(html, p.slug).toContain('"author":{"@id":"https://ahammadnafiz.com/#person"}')
    }
  })

  it("publishes every post with a page, in the sitemap and in llms.txt", () => {
    const sitemap = readFileSync(path.join(OUT, "sitemap.xml"), "utf8")
    const llms = readFileSync(path.join(OUT, "llms.txt"), "utf8")
    expect(existsSync(path.join(OUT, "writing", "index.html"))).toBe(true)
    for (const p of getPosts()) {
      const url = `https://ahammadnafiz.com/writing/${p.slug}/`
      const html = readFileSync(path.join(OUT, "writing", p.slug, "index.html"), "utf8")
      expect(html, p.slug).toContain('"@type":"BlogPosting"')
      expect(sitemap, p.slug).toContain(url)
      expect(llms, p.slug).toContain(url)
    }
  })

  it("loads no Mermaid or other diagram script on posts", () => {
    const html = readFileSync(path.join(OUT, "writing", "backprop-by-hand-a-deep-dive-into-neural-networks-nn", "index.html"), "utf8")
    expect(html).not.toContain("mermaid.esm")
    expect(html).toContain("/writing/images/backprop-by-hand-a-deep-dive-into-neural-networks-nn-diagram-1.svg")
  })

  it("renders all math in posts, with no errors or leftover $$", () => {
    for (const p of getPosts()) {
      const html = readFileSync(path.join(OUT, "writing", p.slug, "index.html"), "utf8")
      const body = html.slice(html.indexOf('<div class="post'), html.indexOf("</article>"))
      const text = body.replace(/<(pre|code|math)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ")
      expect(body, p.slug).not.toContain("katex-error")
      expect(text, p.slug).not.toContain("$$")
    }
  })
})
