import { describe, expect, it } from "vitest"
import { getPost, getPosts, renderMarkdown } from "@/lib/writing"

describe("writing", () => {
  it("lists every imported post, newest first, with what a listing needs", () => {
    const posts = getPosts()
    expect(posts).toHaveLength(14)
    expect(posts[0].slug).toBe("how-hermes-agent-actually-remembers")
    expect(posts.at(-1)?.slug).toBe("ultimate-guide-to-comprehension")
    for (const p of posts) {
      expect(p.title, p.slug).toBeTruthy()
      expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(p.description.length, p.slug).toBeGreaterThan(40)
    }
  })

  it("keeps the date exactly as written in the post", () => {
    expect(getPost("how-to-read-research-paper")?.date).toBe("2025-07-15")
  })

  it("returns nothing for an unknown slug", () => {
    expect(getPost("no-such-post")).toBeUndefined()
  })

  it("estimates reading time in whole minutes", () => {
    expect(getPost("understanding-attention-mechanisms")?.minutes).toBeGreaterThan(5)
  })

  it("renders math, highlighted code and heading anchors to plain HTML", async () => {
    const html = await renderMarkdown("## Loss\n\nInline $$a^2$$ here.\n\n```python\nprint(1)\n```\n")
    expect(html).toContain('<h2 id="loss">')
    expect(html).toContain('class="katex"')
    expect(html).toContain("shiki")
    expect(html).not.toContain("```")
  })

  it("renders math as native MathML that keeps bold, script and double-struck letters", async () => {
    const html = await renderMarkdown("$\\mathbb{R}^d$, $\\mathbf{w}$, $\\mathcal{L}$ and $\\boldsymbol{x}$")
    expect(html).toContain("<math")
    expect(html).not.toContain("katex-html")
    expect(html).not.toMatch(/mathvariant="(bold|script|double-struck|bold-italic)"/)
    for (const ch of ["ℝ", "𝐰", "ℒ", "𝒙"]) expect(html).toContain(ch)
  })

  it("shifts a post's headings so they start at h2 under the page title", async () => {
    const html = await renderMarkdown("#### Setup\n\ntext\n\n##### Detail\n")
    expect(html).toContain('<h2 id="setup">')
    expect(html).toContain('<h3 id="detail">')
    expect(await renderMarkdown("# Big\n\n## Small\n")).toMatch(/<h2 id="big">[\s\S]*<h3 id="small">/)
  })

  it("closes gaps between heading levels", async () => {
    const html = await renderMarkdown("### A\n\n###### B\n\n##### C\n")
    expect(html).toMatch(/<h2 id="a">[\s\S]*<h3 id="b">[\s\S]*<h3 id="c">/)
  })

  it("does not repeat a caption as the image's alt text", async () => {
    const html = await renderMarkdown("![Comprehensions in Python](/x.webp)\n_Comprehensions in Python_\n")
    expect(html).toContain('alt=""')
    expect(html).toContain("<em>Comprehensions in Python</em>")
  })

  it("never steps down more than one heading level at a time", async () => {
    const html = await renderMarkdown("## A\n\n#### B\n\n### C\n\n#### D\n")
    expect(html).toMatch(/<h2 id="a">[\s\S]*<h3 id="b">[\s\S]*<h3 id="c">[\s\S]*<h4 id="d">/)
  })
})
