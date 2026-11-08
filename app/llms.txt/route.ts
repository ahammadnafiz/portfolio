import { projects } from "@/lib/projects"
import { SITE_URL, experience, recognition, site } from "@/lib/site"

export const dynamic = "force-static"

// A plain summary for AI assistants and answer engines (llmstxt.org).
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is an AI and machine learning engineer in ${site.location}, working as an Associate Product Engineer on DeepDive at Markopolo AI. He works on RAG systems, LLM agents, agent memory and LLM evaluation, and is moving toward mechanistic interpretability research.`,
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.name}](${SITE_URL}/work/${p.slug}/): ${p.kind}. ${p.summary}`),
    "",
    "## Experience",
    "",
    ...experience.map((e) => `- ${e.role}, ${e.org} (${e.date})${e.note ? `: ${e.note}` : ""}`),
    "",
    "## Recognition",
    "",
    ...recognition.map((r) => `- ${r.title} (${r.date}): ${r.note}`),
    "",
    "## Links",
    "",
    `- [Website](${SITE_URL}/)`,
    `- [CV (PDF)](${SITE_URL}${site.cv})`,
    ...site.socials.map((s) => `- [${s.label}](${s.href})`),
    `- Email: ${site.email}`,
    "",
  ]
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
