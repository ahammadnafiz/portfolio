# SEO, GEO and AEO research

Date: 8 Nov 2026. Data from DataForSEO (Google Ads search volume, Google SERP, ChatGPT responses). Total spend about $0.22.

## What people search

Monthly Google searches, English.

| Keyword | Bangladesh | US | Competition |
|---|---|---|---|
| rag system | 90 | 2,400 | low |
| mechanistic interpretability | 40 | 2,400 | low |
| product engineer | 30 | 2,400 | low |
| answer engine optimization | 50 | 2,400 | low |
| agent memory | 20 | 1,600 | medium |
| llm agent | 10 | 1,000 | low |
| llm evaluation | 10 | 1,000 | medium |
| applied ai engineer | 10 | 880 | low |
| llm engineer | 20 | 390 | low |
| ai product engineer | 10 | 210 | low |
| rag evaluation | 10 | 170 | low |
| nafiz | 480 | 110 | low |
| data scientist bangladesh | 70 | 10 | low |
| ai engineer portfolio | 10 | 40 | low |

"ahammad nafiz", "machine learning engineer bangladesh", "ai engineer bangladesh/dhaka" have too little volume for Google to report.

What this means: a personal site will not win "rag system" or "agent memory" against docs and big blogs. What it can win:

1. **Your name.** This is what recruiters, PhD committees and conference people type after meeting you.
2. **Your project names** (Engram, FizTorch, fizzlabai, Atlas, Buyziz).
3. **Long phrases** that combine a topic with you or your place: "AI engineer Dhaka", "RAG engineer Bangladesh", "agent memory pgvector LongMemEval".

## Where you stand on Google

Searching "ahammad nafiz" today (Bangladesh and US): **you are not in the top 20.** Other Nafizes and social profiles take every spot. The old github.io site does not show either. The new domain plus the changes below are aimed at fixing this.

## What AI assistants say (GEO / AEO)

Asked ChatGPT (gpt-4.1-mini with web search): "Who is Ahammad Nafiz, the ML engineer from Bangladesh?"

It answered accurately (Markopolo AI, AskTuring, Deepen Answer, fizzlabai, Engram) and **every citation pointed to `ahammadnafiz.github.io/portfolio`**, plus your GitHub profile.

So the old address is your strongest asset with AI search right now. When GitHub Pages is switched off, the old URL must keep sending people and bots to ahammadnafiz.com, or that credit is lost.

## Done in this round

- `llms.txt` at `https://ahammadnafiz.com/llms.txt`: a plain summary of who you are, every project with its link, experience, recognition and links. Built from the same data as the site, so it never drifts.
- Page title: "Ahammad Nafiz, AI and machine learning engineer in Dhaka".
- Description starts with your name and the role keywords.
- First line of the intro now says "I'm an AI engineer in Dhaka, working as an Associate Product Engineer at Markopolo AI".
- Project pages: titles like "Engram, persistent memory for AI agents | Ahammad Nafiz" and structured data (`SoftwareSourceCode`, or `SoftwareApplication` for Buyziz) credited to your Person entry.
- Person structured data: job title updated, em dashes removed from awards.
- Photo alt text: "Portrait of Ahammad Nafiz".

## Still to do (needs you)

1. **Redirect the old site.** Replace the github.io portfolio with a one-page redirect to ahammadnafiz.com (canonical link plus instant refresh) instead of deleting it. GitHub Pages cannot send real 301s, but Google and AI crawlers follow the canonical.
2. **Google Search Console.** Add ahammadnafiz.com (DNS TXT record in Cloudflare), submit `sitemap.xml`, and request indexing for the home page.
3. **Point your profiles at the new domain.** GitHub profile website, LinkedIn "website", X bio, Hugging Face, Medium. These are the links Google and AI tools use to confirm the site is really you.
4. **Repo READMEs.** Add a link to the matching project page (for example `ahammadnafiz.com/work/engram/`) in each project's README.
5. **Re-check in 4 to 6 weeks.** Run the same name search and the same ChatGPT question to see if the new domain is cited.
