import { describe, expect, it } from "vitest"
import { getProject, projects } from "@/lib/projects"

describe("project lookup", () => {
  it("finds a project by its URL slug", () => {
    expect(getProject("engram")?.name).toBe("Engram")
  })

  it("returns nothing for an unknown slug", () => {
    expect(getProject("not-a-project")).toBeUndefined()
  })

  it("gives every project a unique slug", () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

})
