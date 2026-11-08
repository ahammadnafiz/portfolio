import { CLASSES, seededRandom, type Point } from "./datasets"

const HIDDEN = 24
const LR = 0.02

/** A dense layer's weights plus Adam's running moments for them. */
class Layer {
  w: Float64Array
  b: Float64Array
  gw: Float64Array
  gb: Float64Array
  private m: Float64Array
  private v: Float64Array

  constructor(
    readonly inputs: number,
    readonly outputs: number,
    rand: () => number,
    scale: number,
  ) {
    this.w = new Float64Array(inputs * outputs).map(() => (rand() * 2 - 1) * scale * Math.sqrt(6 / (inputs + outputs)))
    this.b = new Float64Array(outputs)
    this.gw = new Float64Array(this.w.length)
    this.gb = new Float64Array(outputs)
    this.m = new Float64Array(this.w.length + outputs)
    this.v = new Float64Array(this.w.length + outputs)
  }

  forward(input: Float64Array, out: Float64Array) {
    for (let o = 0; o < this.outputs; o++) {
      let s = this.b[o]
      for (let i = 0; i < this.inputs; i++) s += input[i] * this.w[o * this.inputs + i]
      out[o] = s
    }
  }

  adam(t: number) {
    const params = [this.w, this.b]
    const grads = [this.gw, this.gb]
    let k = 0
    for (let p = 0; p < 2; p++) {
      for (let i = 0; i < params[p].length; i++, k++) {
        const g = grads[p][i]
        this.m[k] = 0.9 * this.m[k] + 0.1 * g
        this.v[k] = 0.999 * this.v[k] + 0.001 * g * g
        const mh = this.m[k] / (1 - 0.9 ** t)
        const vh = this.v[k] / (1 - 0.999 ** t)
        params[p][i] -= (LR * mh) / (Math.sqrt(vh) + 1e-8)
      }
      grads[p].fill(0)
    }
  }
}

/**
 * Two inputs (x, y), two tanh hidden layers, softmax over three classes.
 * Trained full-batch with Adam. Small enough to train and redraw every frame.
 */
export class TinyNet {
  private l1: Layer
  private l2: Layer
  private l3: Layer
  private t = 0
  // Scratch buffers, reused so a training step allocates nothing.
  private input = new Float64Array(2)
  private h1 = new Float64Array(HIDDEN)
  private h2 = new Float64Array(HIDDEN)
  private out = new Float64Array(CLASSES)
  private d2 = new Float64Array(HIDDEN)
  private d1 = new Float64Array(HIDDEN)

  /** Training steps taken so far. */
  get steps() {
    return this.t
  }

  constructor(seed: number) {
    const rand = seededRandom(seed)
    this.l1 = new Layer(2, HIDDEN, rand, 1)
    this.l2 = new Layer(HIDDEN, HIDDEN, rand, 1)
    // A small last layer so the untrained net starts close to an even guess.
    this.l3 = new Layer(HIDDEN, CLASSES, rand, 0.1)
  }

  private forward(x: number, y: number) {
    this.input[0] = x
    this.input[1] = y
    this.l1.forward(this.input, this.h1)
    for (let i = 0; i < HIDDEN; i++) this.h1[i] = Math.tanh(this.h1[i])
    this.l2.forward(this.h1, this.h2)
    for (let i = 0; i < HIDDEN; i++) this.h2[i] = Math.tanh(this.h2[i])
    this.l3.forward(this.h2, this.out)
    const max = Math.max(...this.out)
    let sum = 0
    for (let c = 0; c < CLASSES; c++) sum += this.out[c] = Math.exp(this.out[c] - max)
    for (let c = 0; c < CLASSES; c++) this.out[c] /= sum
    return this.out
  }

  /** Class probabilities at a point. */
  predict(x: number, y: number): number[] {
    return Array.from(this.forward(x, y))
  }

  /** One full-batch update. Returns the mean cross-entropy loss before the update. */
  step(data: Point[]): number {
    let loss = 0
    const n = data.length
    for (const p of data) {
      const probs = this.forward(p.x, p.y)
      loss -= Math.log(probs[p.label] + 1e-12)
      // Softmax + cross-entropy gradient, then back through each layer.
      for (let c = 0; c < CLASSES; c++) {
        const d = (probs[c] - (c === p.label ? 1 : 0)) / n
        this.l3.gb[c] += d
        for (let i = 0; i < HIDDEN; i++) this.l3.gw[c * HIDDEN + i] += d * this.h2[i]
      }
      for (let i = 0; i < HIDDEN; i++) {
        let s = 0
        for (let c = 0; c < CLASSES; c++) s += ((probs[c] - (c === p.label ? 1 : 0)) / n) * this.l3.w[c * HIDDEN + i]
        this.d2[i] = s * (1 - this.h2[i] ** 2)
        this.l2.gb[i] += this.d2[i]
        for (let j = 0; j < HIDDEN; j++) this.l2.gw[i * HIDDEN + j] += this.d2[i] * this.h1[j]
      }
      for (let j = 0; j < HIDDEN; j++) {
        let s = 0
        for (let i = 0; i < HIDDEN; i++) s += this.d2[i] * this.l2.w[i * HIDDEN + j]
        this.d1[j] = s * (1 - this.h1[j] ** 2)
        this.l1.gb[j] += this.d1[j]
        this.l1.gw[j * 2] += this.d1[j] * p.x
        this.l1.gw[j * 2 + 1] += this.d1[j] * p.y
      }
    }
    this.t++
    this.l1.adam(this.t)
    this.l2.adam(this.t)
    this.l3.adam(this.t)
    return loss / n
  }

  /** Share of points whose most likely class is their label. */
  accuracy(data: Point[]): number {
    let right = 0
    for (const p of data) {
      const probs = this.forward(p.x, p.y)
      let best = 0
      for (let c = 1; c < CLASSES; c++) if (probs[c] > probs[best]) best = c
      if (best === p.label) right++
    }
    return right / data.length
  }
}
