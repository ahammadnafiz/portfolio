# Publishing a blog post

Posts live in `content/writing/` as Markdown files. The site turns them into pages at build time, so a post is just a file.

## 1. Start a post

```bash
pnpm new-post "How I built X"
```

This creates `content/writing/how-i-built-x.md`, dated today (Dhaka time) and marked `draft: true`. The file name becomes the URL: `ahammadnafiz.com/writing/how-i-built-x/`.

## 2. Write it

Fill in the top of the file:

```yaml
title: "How I built X"
date: '2026-11-08'
description: >-
  One plain sentence on what the post covers. Under 160 characters: Google shows it under the title.
tags: [llm, agents]
draft: true
```

Then write normal Markdown underneath:

- **Headings:** start at `##`. The title is already the page heading.
- **Images:** put the file in `content/writing/images/` and write `![What it shows](images/plot.png)`. PNG, JPG and GIF are all fine: the build converts them to small WebP files and fixes the link. An italic line right under an image (`_like this_`) becomes its caption.
- **Math:** `$x^2$` inline, or a block on its own lines between `$$` and `$$`.
- **Code:** fenced blocks (` ```python `) get colours for light and dark mode and a Copy button. Python, C++ and Bash are loaded; add a language to `langs` in `lib/writing.ts` if you need another.
- **Diagrams:** export them as an image (PNG or SVG) and add them like any other image.
- **Bangla:** write it as normal; the page switches to Noto Sans Bengali by itself.

## 3. Preview

```bash
pnpm dev
```

Open `http://localhost:3000/writing/how-i-built-x/`. Drafts show here but not on the live site.

## 4. Check

```bash
pnpm test
```

This fails if a post is missing a title, has a description over 160 characters, or links an image that doesn't exist.

## 5. Publish

Set `draft: false`, commit, then:

```bash
./deploy/deploy.sh
```

The new post appears on the home page (latest four), on `/writing/`, in the sitemap and in `llms.txt`.
