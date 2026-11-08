import { describe, expect, it } from "vitest"
import { getNeighbours, getProject, projects } from "@/lib/projects"

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

  it("links the first project back to the last, and forward to the second", () => {
    const { prev, next } = getNeighbours("fizzlabai")
    expect(prev?.slug).toBe("fiztorch")
    expect(next?.slug).toBe("engram")
  })

  it("links the last project forward to the first", () => {
    expect(getNeighbours("fiztorch").next?.slug).toBe("fizzlabai")
  })
})
