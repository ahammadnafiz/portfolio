# Portfolio redesign: research

Research only. No code was changed. Screenshots are in `docs/redesign-research/`. All sites were checked on 2026-11-08 at 1440, 768 and 375 px wide. Fonts and colors come from computed styles in the live DOM, not guesses from screenshots.

---

## 1. The current portfolio

### Stack and structure

- Next.js 15.2 (App Router), React 19, Tailwind 3.4, shadcn/ui. One route: `app/page.tsx`.
- Page order: **Hero → About (01) → Skills (02) → Work (03) → Contact (04)**, with each section after the hero wrapped in `FadeInSection`.
- Deployment: GitHub Pages static export (`output: 'export'`, `basePath: '/portfolio'`). The `/portfolio` prefix is hardcoded in `app/layout.tsx`, `app/manifest.ts`, `components/hero.tsx`, `components/about.tsx` and `public/sitemap.xml`. `SITE_URL`, the canonical URL, OG tags and JSON-LD all point to `ahammadnafiz.github.io/portfolio`.
- Config clutter: four Next configs (`next.config.js`, `.mjs`, `.dev.mjs`, `.server.mjs`), cache-bust scripts, an unregistered `public/sw.js`, and a CI workflow on Node 18.

### Theme

| Token | Value | Notes |
|---|---|---|
| Background | `#E8E6E1` warm paper | `--background: 40 8% 90%` |
| Ink | `#1C1815` near-black | the only accent is ink |
| Muted text | `hsl(32 5% 38%)` | raised to 4.91:1 for WCAG AA |
| Hairline | `#CBC7BF` | |
| Radius | `0` | sharp editorial corners |
| Texture | SVG fractal grain overlay (`multiply`, z-60) **plus** a 22–28 px graph-paper grid | two textures stacked |

- **Type:** Fraunces (display serif, opsz/SOFT/WONK axes) for the name and headings, Inter for body, JetBrains Mono for uppercase tracked labels. The mono font loads through a CSS `@import`, not `next/font`, so it blocks rendering.
- **Mode:** light only. Tailwind has `darkMode: ["class"]`, but no `.dark` variables exist and there is no toggle.
- **Spacing:** full-bleed sections, `px-5 / sm:px-8 / lg:px-12`, 12-column grids at `lg`. No max width, so line lengths get very long at 1440+.

### Components and interactions

| Component | What it does | Status |
|---|---|---|
| `Hero` | Black availability marquee, meta bar with a live Dhaka clock, huge Fraunces name with per-letter `ink-rise`, one-line thesis, intro, CV + email CTAs, a NOW/BEFORE/FOCUS/GOAL spec table, numbered anchor nav | works |
| `About` | Bio, a second CV CTA, experience ledger, education, 4 recognition cards | works |
| `Skills` | 9 groups of plain words in a 2-column `dl` | works |
| `Projects` | 6 rows (number, name, kind, description, tags, ↗). The whole row inverts to ink on hover | works |
| `Contact` | Large serif mailto, 4 social links, footer | works |
| `FadeInSection` | Toggles a `.visible` class | **does nothing**: `.fade-in-section` has no CSS |
| `ScrollIndicator` | Progress bar | **invisible**: no CSS, so it renders 0 px tall |
| `BackToTop` | Fixed button | **broken**: no positioning CSS, so it renders as a static box at the bottom-left under the footer (visible in `local-1440-full.png`) |
| `Navigation`, `Breadcrumbs`, `OptimizedImage` | | not imported anywhere |
| `components/ui/*` | 50 shadcn components | almost none are used |
| `styles/globals.css` | | duplicate file, not imported |

Leftover CSS from an older design is still in `app/globals.css`: `.pixel-button`, `.modern-card`, the CNN / neural-wave / gradient-descent keyframes, `.card-hover` and similar.

### Responsiveness

- **1440** (`local-1440-hero.png`): the strongest view. The name fills the width and the bottom band lines up on the grid. Body text runs about 100 characters per line in About and Skills.
- **768** (`local-768-hero.png`): there is a big empty gap between the thesis and the intro because of `justify-between` in a full-height flex column. The spec table stacks under the intro.
- **375** (`local-375-hero.png`): the name drops to ~38 px and loses the poster effect. The hero no longer fits one screen, and the spec table falls below the fold. No horizontal overflow at any width.
- After the hero there is **no persistent navigation** at any width.

### What works

- A clear, confident identity: paper and ink, a serif name and mono labels read as "engineer who cares about craft".
- The copy is specific and believable. Engram's numbers (90.8% LongMemEval-S, 17× less context) are the best content on the site.
- The live Dhaka clock, the spec table and the numbered sections are good details.
- The project rows' invert-on-hover is simple and satisfying.
- Accessibility and SEO groundwork is solid (contrast fixes, real text in the split-letter name, a single Person entity in JSON-LD).

### What feels weak or dated

1. **Work is the weakest section, and it is the one that matters most.** It is six identical text rows with no visuals, no diagrams and no depth, and every link goes straight to GitHub. The best evidence (benchmarks, architecture) is buried in body copy.
2. **The marquee ticker** is a 2021–22 trope and repeats what the spec table already says.
3. **The Skills section is a word dump** (60+ terms, with vLLM listed twice). It reads like a CV keyword list, not proof.
4. **Repetition:** two identical "Download CV" blocks (Hero and About), and the bio is said twice (hero intro and About).
5. **Two stacked textures** (grain over the grid) look muddy on low-DPI screens and add a full-screen blend layer.
6. **No dark mode, no persistent nav, three dead components.**
7. **Line length:** full-bleed text at 1440 is tiring to read.

---

## 2. Reference sites

### 2.1 leouiux.dev
Screenshots: `leouiux-1440-hero.png`, `leouiux-vp-900.png`, `leouiux-vp-2600.png`, `leouiux-vp-6900.png`

- **Layout and flow:** a centered ~970 px container. Order: manifesto hero → "The main thing" (one featured project, large) → "The other things" (2×2 cards) → "The path so far" (interactive timeline) → "A few of the 135" (component carousel) → Notes (list) → "Somebody answers this one" (contact). The nav is a pill segmented control (Work / Notes) plus a cat icon and a Contact button.
- **Visual design:** warm off-black `#141413`, cream ink `#F5F4EE`, gray `#C4C2B9`. Project cards use saturated flat fills: violet `#9D86FF`, orange `#FF7240`, blue `#5CB2FF`, plus yellow and green. Fonts: **Cabinet Grotesk** 500/700 for display, an unnamed variable sans for body, a mono, and a **handwritten marker font** for notes. Rounded corners (~12 px).
- **Mood:** warm, witty, personal. It feels like a craftsperson's bench.
- **UI elements:**
  - Hero sentence with a hand-drawn strike-through on "nobody" and a squiggle under "somebody". An app-icon emoji sits inline in the headline.
  - Project covers are **ASCII-art renders** of each logo.
  - Handwritten margin notes ("↳ drag along the ruler, or use the buttons", "↳ keep scrolling, there are seven").
  - A custom arrow cursor with a small label chip.
  - A copy-able `npx shadcn add …` command bar.
- **Motion:**
  - Hover-scramble text on every title ("the titles on this page are Hover Scramble Text").
  - A scroll-pinned horizontal carousel of live components.
  - A draggable timeline ruler.
  - A pull-cord theme toggle (the string and dot at the top right).
  - Headline text scrambles on load.
- **Responsive:** 375 works well, with a centered headline and buttons that stay side by side. At 768 the Contact button sits right against the edge.
- **Worth borrowing:**
  1. **Handwritten margin notes** as a personal voice layer over clean type.
  2. **ASCII or generated covers** for projects with no screenshots. This fits ML repos perfectly.
  3. **One featured project, then the rest**, instead of a flat list.

### 2.2 directoryyy.com ("perfolios")
Screenshots: `directoryyy-1440-hero.png`, `directoryyy-vp-footer.png`

- **Layout and flow:** a single **540 px column** with a sticky left filter rail (All / Minimal / Thoughtful / Playful / Creative / Showcase). Order: a fanned stack of tilted device mockups → "Hey, this is perfolios…" → count + submit → sponsors → search + list/grid toggle → a 274-row list → footer with a live clock and a foliage illustration.
- **Visual design:** `#0C0C0C` background, `#F5F5F5` text, grays `#8A8A8A` and `#5C5C5C`. **Public Sans** 500 for UI and **Geist Mono** for dates. No accent color.
- **Mood:** calm, curated, like a library index.
- **UI elements:** list rows (name in white, description in gray, date in mono on the right), a floating "Surprise me" pill, a `/` keyboard hint in the search field, and a light/dark segmented toggle.
- **Motion:** **progressive blur and fade masks** at the top and bottom of the viewport, so rows blur in and out at the edges. The fanned cards in the hero and the botanical footer give it texture.
- **Responsive:** the same column at all widths. At 375 the filter rail turns into chips. It is very robust.
- **Worth borrowing:**
  1. The **edge blur mask** on a long scrolling list.
  2. **Name · one-liner · mono date rows** as a dense, scannable format (good for papers, notes and awards).
  3. The **fanned stack of cards** as a compact hero visual for several projects.

### 2.3 davemiye.com
Screenshots: `davemiye-vp-800.png`, `davemiye-vp-6600.png`, `davemiye-1440-full.png`

- **Layout and flow:** an intro overlay where the **signature draws itself** under a doodle self-portrait, then the page reveals. Order: intro text + an "Open to work" sticker → a full-bleed horizontal project carousel (Goals, Circa, SideQuest…) → Experience table → client logo grid → testimonials (stacked note cards) → Playground → "Let's have coffee?" → a doodle footer.
- **Visual design:** paper `#F1EEE9`, ink `#141412`, gray `#7A756B`, with spot colors **blue `#1F4FD1`** and **red `#E5391F`** taken from the doodle. Fonts: **system SF Pro** at 14–16 px everywhere (no display size at all) and **Caveat** for handwriting. Very small, quiet type.
- **Mood:** friendly, handmade, confident. The illustration carries the personality and the type stays out of the way.
- **UI elements:**
  - A **"View project" circle cursor** that follows the mouse over images.
  - Nav extras: "Sound on" (UI sounds), a Dark toggle, `GMT+1 — 07:46:19` live clock.
  - A **tick-mark scroll indicator** on the right edge, with the current position in red.
  - The contact block is a **lined notebook page with a chat bubble** and a typing indicator.
  - Contact details sit in a dashed-line key/value table.
- **Motion:** the signature stroke draws on load, project images go from blurred to sharp as they settle, testimonials are stacked cards, and the doodle's eyes blink.
- **Responsive:** the intro centers at all widths and the carousel becomes swipeable.
- **Worth borrowing:**
  1. The **tick-mark scroll indicator** (a better version of the progress bar that is broken today).
  2. **Contact as a key/value table** (Name / Mail / Call / Socials), clean and scannable.
  3. A **signature or hand-drawn mark** as a one-time intro. Keep it short and skippable.

### 2.4 sumitsharma.pro
Screenshots: `sumit-1440-hero.png`, `sumit-1440-full.png`

- **Layout and flow:** a **730 px column framed by vertical hairlines** running the full height, with a sticky top bar inside the frame. Order: avatar + "Hola" (cycles through languages, e.g. नमस्ते) + name + role → a one-paragraph bio with **inline product chips** (icon + name) → 01 Things I've built (list/grid toggle) → 02 Experience → 03 How I work → 04 Writing → 05 On GitHub → "Let's work together." → footer with a visitor count and "Last updated".
- **Visual design:** pure black `#000`, text `#EDEDED`, gray `#AAAAAA`, accent **orange `#FF6F43`** used only for section numbers, the "NOW" badge and the snake. Fonts: a custom variable sans (renamed, 300–900), Manrope, Geist. Body is 15–17 px and the name is 34 px. Nothing is huge.
- **Mood:** a sharp, honest engineer's résumé. Content first, low noise.
- **UI elements:** project rows with status pills ("Live · paid", "Open source", "Early access"), real numbers ("$724 all-time revenue"), Website / GitHub links on the right, and "Show more projects".
- **Motion:** the cycling greeting, and the **GitHub contribution heatmap that turns into a playable snake game** ("Pause snake / Play a round").
- **Responsive:** at 768 the frame lines drop and the layout goes full width. At 375 a hamburger menu appears and the links move under the descriptions.
- **Worth borrowing:**
  1. **Numbered sections with an accent only on the number**: very close to what you already have, but in a readable column.
  2. **Status pills + one hard metric per project** ("90.8% LongMemEval-S" plays the same role as "$724 revenue").
  3. A **GitHub heatmap as live proof of work**.

### 2.5 toobajatoi.com
Screenshots: `tooba-1440-hero.png`, `tooba-1440-full.png`

- **Layout and flow:** a 600 px column with faint dashed side rails. Order: avatar → "Hey, I'm Tooba Jatoi" → bio → links → tool-logo strip → Selected work (large image cards) → Experience as a **"Flight plan" timeline** → Writing → "Thanks for stopping by".
- **Visual design:** `#0E0E0E` with an **animated pixel-art night sky** (stars, a crescent moon, a shooting star, cloud silhouettes) on canvas. Text `#EDEDED` and `#8D8D8D`. Key phrases get **color-coded highlight chips** (blue for the employer, green for domains, orange for the degree). Fonts: **Inter** 400/500 and Geist.
- **Mood:** dreamy and personal, while the content stays professional.
- **UI elements:**
  - A pill nav (Intro / Work / Experience / Writing) that collapses to icons on mobile.
  - A **gamepad button** (game mode).
  - A **floating bottom dock** with a robot mascot and folder / mail / LinkedIn / GitHub / Top buttons.
  - A copy-email icon.
  - A custom cursor with a name chip.
- **Motion:** **Lenis smooth scroll**, the shooting star, reveal-on-scroll, and the plane icon moving along the experience timeline.
- **Responsive:** very good at 375. The dock stays usable and the nav becomes icons.
- **Worth borrowing:**
  1. **Color-coded highlight chips** in the bio to guide a skim reader.
  2. The **bottom dock** as persistent mobile navigation.
  3. **Experience as a journey line** rather than a table.

### 2.6 bidyut.cc
Screenshot: `bidyut-1440-hero.png`

- **Layout and flow:** **one screen**. Two paragraphs, four bullet stats, and Copy Email plus three social links. Nothing else.
- **Visual design:** white, `#000` for key facts, `oklch(0.556 0 0)` gray for everything else. **Geist** at one size (~18 px). "Design engineer" is in italic.
- **Mood:** extremely confident minimalism. The content is the design.
- **UI elements:** two-tone text, where the facts (Bidyut, Kolkata, 4+ years, 200+ components, 250K+, 829 stars) are dark and connecting words are gray. Underlined links, and a Copy Email button.
- **Motion:** none visible. Hover is an underline only.
- **Responsive:** trivially perfect.
- **Worth borrowing:**
  1. **Two-tone text** so a recruiter's 6-second skim catches the facts.
  2. **Stats as a short bullet list** (Engram scores, papers, awards).

### 2.7 samworks.vercel.app
Screenshots: `samworks-1440-hero.png`, `samworks-1440-full.png`

- **Layout and flow:** an ~800 px column inside a **dashed blueprint grid**. Every section is a row, and the dashed lines run edge to edge. Order: pixel-art waterfall banner → avatar + name + **cycling role** (Design Engineer / Frontend Developer / Indie Hacker) + view counter → About (bullets) → Contact (icon buttons) → Projects (2×2 cards with Live badges) → Tech Stack ("hover to play") → GitHub Activity → Highlights (tweet cards marquee) → "Scrolled Too Far" CTA → quote → footer.
- **Visual design:** `#0F0E0E`, white text, gray labels. Fonts: **Instrument Serif** for section titles and the name, **Inter** for body. The only color comes from the project screenshots and the pixel art.
- **Mood:** a scrapbook, playful and student-like.
- **UI elements:** framed avatar, view counter, filterable tech tags, monochrome GitHub heatmap, and a marquee of tweet cards.
- **Motion:** the role text cycles, the tech stack plays on hover, and the tweets scroll in a marquee.
- **Responsive:** fine at 375 and 768. **Bug at 1440:** the page overflows horizontally (`scrollWidth > innerWidth`). The dashed lines extend past the viewport. This is a lesson for us, not a feature.
- **Worth borrowing:**
  1. **Instrument Serif section titles over a clean sans**: a lighter, more modern take on your Fraunces.
  2. **Blueprint row lines** as structure, not texture.
  3. The **"Scrolled too far" end CTA** as a friendly close.

### 2.8 hacktron.ai (product site, not a portfolio)
Screenshots: `hacktron-1440-hero.png`, `hacktron-vp-1700.png`, `hacktron-1440-full.png`

- **Layout and flow:** a full-bleed **technical line drawing** of a robot hand meeting a human hand (a Creation of Adam reference), annotated like an engineering diagram. Then: logos → three product sections (Red / Whitebox / Review), each over a **line-art 3D city map** with red attack traces → customer quotes grid → blog cards → press → pricing → footer.
- **Visual design:** warm off-black **`oklch(0.2 0.006 70)`** (about `#1A1814`), cream ink **`oklch(0.935 0.026 88)`** (about `#F0EAD8`), gray `oklch(0.76 0.02 85)`, and a single **red** for attacks. One font: **Recursive** (variable, mono-ish) at **one size, 16 px**, for everything including H1 and H2. Hierarchy comes only from position and whitespace.
- **Mood:** precise, technical, slightly ominous, and very premium.
- **UI elements:**
  - **Dimension annotations** on the drawing: part labels (`R-07 Palm chassis`, `H-11 Scaphoid`), angle and length values, `x 0715 y 0508` coordinates.
  - **Keyboard shortcuts in brackets** on every control: `Sign in [S]`, `Menu [M]`, `Find [F]`.
  - Crosshair marks in the corners.
  - Underlined text links instead of buttons.
- **Motion:** the drawing slowly drifts, and **the dimension numbers and coordinates update live** (they changed between my screenshots: 57.2 → 55.7 → 59.1). Red traces animate across the maps.
- **Responsive:** at 375 the drawing is cropped and a small scale/segments/yaw readout table appears. The hero text drops below the drawing.
- **Worth borrowing:**
  1. **Annotated technical drawings**: the best fit for an ML engineer. Draw Engram's pipeline or fizzlabai's 8-phase graph as a labeled line diagram with live-updating numbers.
  2. **Bracketed keyboard shortcuts** (`[W] Work`, `[C] Copy email`, `[R] CV`).
  3. **The warm off-black and cream palette.** It is your current paper and ink, inverted.

---

## 3. Patterns across the references

1. **A narrow reading column is the norm.** Six of the eight sit between 540 and 800 px (directoryyy 540, tooba 600, bidyut ~580, sumit 730, samworks 800, leouiux 970). Only hacktron goes full bleed, and it is a product site. Your full-bleed layout is the odd one out.
2. **Dark by default, with a toggle.** Seven of the eight are dark. Five offer a light/dark toggle (leouiux's pull cord, directoryyy, davemiye, sumit, tooba). The dark backgrounds are **warm or neutral off-blacks** (`#0C0C0C` to `#1A1814`), never pure navy.
3. **One accent at most**, usually warm orange or red (sumit `#FF6F43`, leouiux `#FF7240`, hacktron red, davemiye `#E5391F`). It is used on numbers, badges and a single highlight.
4. **Small type, few sizes.** Most body text is 15–17 px, and headings are often the same size as body (hacktron, davemiye, directoryyy). Big display type is only used once, for a manifesto line (leouiux) or not at all.
5. **Sans plus mono, sometimes a serif.** Geist and Inter dominate. Mono is used for dates and metadata. A serif shows up only as an accent (samworks' Instrument Serif).
6. **Personality through one signature device**, not many:
   - leouiux: handwriting and ASCII art
   - davemiye: doodles
   - tooba: pixel sky
   - samworks: pixel banner
   - hacktron: technical drawing
   - sumit: the snake heatmap
7. **Proof over adjectives:** live metrics, status pills, GitHub heatmaps, visitor counters, "last updated" dates.
8. **Live details:** clocks (davemiye, directoryyy, and you), cycling greetings and roles, view counters.
9. **Quiet motion:** text scramble, edge blur, cursor followers, smooth scroll. Nothing bounces. Nobody uses a scroll-jacked full-page section except leouiux's one carousel.
10. **Lists over cards** for secondary items (Notes, Writing, Experience). Cards or images are kept for the 1–5 hero projects.

---

## 4. Recommended direction: "lab notebook"

**Idea:** keep your paper-and-ink, engineer-who-reads identity, and turn it into a **technical lab notebook**. Use a readable column, dark-first, one accent, and one signature device: **annotated system diagrams** of your projects, borrowed in spirit from hacktron. You are an ML engineer aiming at research labs. Diagrams of retrieval pipelines and agent graphs, with real benchmark numbers on them, show competence in a way no designer's portfolio can copy.

### Palette (dark default + light paper mode)

| Role | Dark (default) | Light (your current paper) | Source |
|---|---|---|---|
| Background | `#16140F` warm off-black | `#E8E6E1` | hacktron, leouiux |
| Raised surface | `#1F1D18` | `#ECEAE5` | leouiux cards |
| Ink | `#EFE9DA` cream | `#1C1815` | hacktron |
| Secondary text | `#A39E90` | `#5E5850` | bidyut two-tone |
| Hairline | `#2E2B24` | `#CBC7BF` | sumit, samworks |
| Accent (one) | `#FF6F43` signal orange | `#D9481F` | sumit, leouiux |

The accent is used **only** on section numbers, live/status dots, diagram highlights (the "hot path" through a pipeline) and focus rings. Drop the full-screen grain and the graph grid. Put the grid **inside** the diagrams, where it means something.

### Typography

- **Body/UI:** Geist (or keep Inter), 16 px body, 1.6 line height. Geist is what directoryyy, bidyut and tooba use, and it pairs with Geist Mono.
- **Mono:** Geist Mono or JetBrains Mono for labels, dates, metrics, diagram annotations and keyboard hints. Load it through `next/font` instead of a CSS `@import`.
- **Display:** keep **one** serif moment. Either keep Fraunces for your name and section titles, or switch to **Instrument Serif** (samworks), which is lighter and less "editorial magazine". Use it only for the name and section titles.
- Hierarchy comes from **tone (bidyut's two-tone) and position**, not from many sizes. Aim for about 4 sizes in total.

### Layout

- A **~680–720 px content column** with hairline side rails (sumit), centered. Diagrams and the featured project can **break out** to ~1000 px.
- Proposed order:
  1. **Header:** name, role, Dhaka clock, theme toggle, `[C] copy email`.
  2. **Intro:** 2 short paragraphs in two-tone text, with key facts highlighted (bidyut and tooba chips).
  3. **Featured project (Engram):** an annotated architecture diagram with live benchmark readouts (90.8% / 94.1% / 79.7% / 17×).
  4. **01 Work:** the other 5 projects as rows with status pills ("Open source", "Research") and one metric each. Each row expands or links to a short case-study page with its own diagram.
  5. **02 Experience:** a timeline line (tooba), or keep your ledger in the narrow column.
  6. **03 Research & recognition:** directoryyy-style rows (title · venue · mono date). Papers and awards go here.
  7. **04 Notes:** links to the Medium / blog posts.
  8. **GitHub heatmap** as proof of work (sumit / samworks).
  9. **Contact:** a davemiye-style key/value table (Mail / CV / GitHub / LinkedIn / Scholar).
- **Merge Skills** into the project rows (tags) and one "How I work" sentence (sumit). Drop the 60-term list.
- One **Download CV** action, in the header and in Contact. Not two hero-sized blocks.
- **Persistent navigation:** a compact sticky top bar on desktop and a **bottom dock** on mobile (tooba).

### Key interactions (pick 3–4, not all)

1. **Live system diagrams:** SVG line drawings of Engram / fizzlabai with part labels (`R-01 BM25`, `R-02 pgvector`, `R-03 RRF`) and numbers that tick (hacktron). Hovering a node highlights its path in the accent color. This is the signature device.
2. **Hover scramble on project titles** (leouiux). It is cheap, fits "ML / tokens", and works only on hover, so it respects reduced motion.
3. **Keyboard shortcuts in brackets:** `[W]` work, `[C]` copy email, `[R]` CV, `[T]` theme (hacktron, directoryyy's `/`).
4. **Tick-mark scroll indicator** on the right edge (davemiye). It replaces the broken progress bar.
5. **Edge blur mask** on long lists (directoryyy).
6. Keep the **Dhaka clock** and the **per-letter ink-rise** on the name. Both already work and are on-brand.

Motion rules: transform and opacity only, ease-out 200–400 ms, everything off under `prefers-reduced-motion`, no scroll-jacking, and no smooth-scroll library unless you specifically want the Lenis feel.

### Deployment notes for ahammadnafiz.com (Cloudflare)

- Remove `basePath: '/portfolio'` and `assetPrefix`, and every hardcoded `/portfolio` prefix (layout, manifest, hero, about, sitemap).
- Change `SITE_URL`, `metadataBase`, canonical, OG, JSON-LD `@id`s and `sitemap.xml` to `https://ahammadnafiz.com`.
- Keep `output: 'export'` and serve the static output from Cloudflare (Pages, or Workers static assets). No server runtime is needed.
- Collapse the four Next configs into one, drop the cache-bust scripts and the unused `sw.js`, and move CI off Node 18.
- GitHub Pages cannot send real 301s. The old `ahammadnafiz.github.io/portfolio` needs a small redirect page with `rel=canonical` pointing at the new domain.

---

## 5. Open questions before implementation

1. **Theme:** dark-first with a light toggle (my recommendation), light-first like today, or follow the system setting?
2. **Scope:** keep a single page, or add short **case-study pages** per project (`/work/engram`) and a **/notes** section that replaces or links the Medium blog?
3. **Personality level:** restrained (bidyut / sumit), or one playful signature (leouiux handwriting, tooba sky)? I suggest one signature: the annotated diagrams.
4. **Display font:** keep Fraunces, switch to Instrument Serif, or go all-sans (Geist + Geist Mono)?
5. **Project visuals:** do you have architecture diagrams, screenshots or benchmark charts for Engram and fizzlabai, or should the diagrams be drawn from the READMEs?
6. **Content cuts:** OK to drop the marquee, the full Skills list, and the phone number from the public page?
7. **Hosting:** Cloudflare Pages or Workers static assets? And should the old github.io URL redirect, or stay up as an archive?
