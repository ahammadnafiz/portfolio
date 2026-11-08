import { describe, expect, it } from "vitest"
import { makeDataset, PUZZLES } from "@/lib/learn/datasets"
import { TinyNet } from "@/lib/learn/tiny-net"

describe("TinyNet", () => {
  it("learns the three-arm spiral to over 90% accuracy", () => {
    const data = makeDataset("spiral", 40)
    const net = new TinyNet(1)
    const before = net.step(data)
    let after = before
    for (let i = 0; i < 1500; i++) after = net.step(data)
    expect(after).toBeLessThan(before / 3)
    expect(net.accuracy(data)).toBeGreaterThan(0.9)
  })

  it.each(PUZZLES)("can learn the %s puzzle the banner cycles to", (kind) => {
    const data = makeDataset(kind, 40)
    const net = new TinyNet(1)
    for (let i = 0; i < 1500; i++) net.step(data)
    expect(net.accuracy(data)).toBeGreaterThan(0.9)
  })

  it("starts out guessing: three roughly equal probabilities that sum to 1", () => {
    const p = new TinyNet(1).predict(0.3, -0.2)
    expect(p).toHaveLength(3)
    expect(p[0] + p[1] + p[2]).toBeCloseTo(1, 6)
    for (const v of p) expect(v).toBeGreaterThan(0.15)
  })
})
