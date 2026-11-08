// pnpm new-post "My post title"  ->  content/writing/my-post-title.md (a draft, dated today in Dhaka)
import fs from "node:fs"
import path from "node:path"

const title = process.argv.slice(2).join(" ").trim()
if (!title) {
  console.error('Usage: pnpm new-post "My post title"')
  process.exit(1)
}

const slug = title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
if (!slug) {
  console.error("Use a title with some Latin letters or numbers so the post gets a readable URL.")
  process.exit(1)
}
const file = path.join("content/writing", `${slug}.md`)
if (fs.existsSync(file)) {
  console.error(`${file} already exists.`)
  process.exit(1)
}

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date()) // YYYY-MM-DD

fs.writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: '${today}'
description: >-
  One plain sentence on what the post covers (under 160 characters). Shown on Google and in the post list.
tags: []
draft: true
---

Start writing here. Headings start at ##.

![What the image shows](images/example.png)
_Optional caption_

Inline math $a^2 + b^2 = c^2$, or a block:

$$
\\text{softmax}(x)_i = \\frac{e^{x_i}}{\\sum_j e^{x_j}}
$$

\`\`\`python
print("code blocks get highlighting and a Copy button")
\`\`\`
`,
)
console.log(`Created ${file}
Preview: pnpm dev, then open /writing/${slug}/
Publish: set draft: false, commit, then ./deploy/deploy.sh`)
