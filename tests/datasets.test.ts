import { describe, expect, it } from "vitest"
import { makeDataset, PUZZLES } from "@/lib/learn/datasets"

describe("puzzle datasets", () => {
  it.each(PUZZLES)("%s gives the same number of points to each of the three classes", (kind) => {
    const points = makeDataset(kind, 40)
    expect(points).toHaveLength(120)
    for (const label of [0, 1, 2]) {
      expect(points.filter((p) => p.label === label)).toHaveLength(40)
    }
  })

  it.each(PUZZLES)("%s keeps every point inside the banner's -1..1 square", (kind) => {
    for (const p of makeDataset(kind, 40)) {
      expect(Math.abs(p.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(p.y)).toBeLessThanOrEqual(1)
    }
  })

  it("draws the same layout every time, so every visitor sees the same puzzle", () => {
    expect(makeDataset("spiral", 30)).toEqual(makeDataset("spiral", 30))
  })
})
