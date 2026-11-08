// Converts images in content/writing/images/ to WebP in public/writing/images/ (max 1400px wide).
// Runs before every build; only new or changed images are converted.
// Keep the naming rule in sync with webpName() in lib/post-images.ts.
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const SRC = "content/writing/images"
const OUT = "public/writing/images"
const webpName = (file) =>
  `${file.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}.webp`

fs.mkdirSync(OUT, { recursive: true })
let converted = 0
for (const file of fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))) {
  const src = path.join(SRC, file)
  const out = path.join(OUT, webpName(file))
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue
  await sharp(src, { animated: true }).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out)
  console.log(`post image: ${file} -> ${out}`)
  converted++
}
if (converted) console.log(`${converted} image(s) converted`)
