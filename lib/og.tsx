import fs from "node:fs"
import path from "node:path"
import { ImageResponse } from "next/og"
import { OG_SIZE } from "@/lib/site"

// Share images (og:image) for posts and projects, drawn at build time in the style of public/og-image.png.

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "assets/fonts", file))
const fonts = [
  { name: "Serif", data: font("InstrumentSerif-Regular.ttf"), weight: 400 as const },
  { name: "Sans", data: font("Geist-Regular.ttf"), weight: 400 as const },
  { name: "Sans", data: font("Geist-Medium.ttf"), weight: 500 as const },
  { name: "Mono", data: font("GeistMono-Regular.ttf"), weight: 400 as const },
]
const avatar = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public/apple-icon.png")).toString("base64")}`

const BG = "#0F0E0E"
const LINE = "#262422"
const FG = "#F2F0EB"
const MUTED = "#A8A49C"

type Card = { label: string; title: string; subtitle: string; tags: string[] }

export function ogImage({ label, title, subtitle, tags }: Card) {
  // Shrink long titles so they stay within three lines.
  const size = title.length > 70 ? 60 : title.length > 40 ? 72 : 88
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: BG, color: FG, fontFamily: "Sans", position: "relative" }}>
        <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 1, background: LINE }} />
        <div style={{ position: "absolute", right: 72, top: 0, bottom: 0, width: 1, background: LINE }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 1, background: LINE }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 128, height: 1, background: LINE }} />

        <div style={{ display: "flex", alignItems: "center", height: 96, padding: "0 96px", gap: 16 }}>
          <img src={avatar} width={40} height={40} style={{ border: `1px solid ${LINE}` }} />
          <div style={{ fontSize: 24, fontWeight: 500 }}>Ahammad Nafiz</div>
          <div style={{ fontSize: 24, color: MUTED }}>{`/ ${label}`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 96px", gap: 24 }}>
          <div style={{ fontFamily: "Serif", fontSize: size, lineHeight: 1.05, letterSpacing: -1 }}>
            {title}
          </div>
          {subtitle ? <div style={{ fontSize: 28, color: MUTED, lineHeight: 1.4 }}>{subtitle}</div> : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 128, padding: "0 96px" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {tags.slice(0, 3).map((t) => (
              <div key={t} style={{ fontSize: 20, color: "#D6D3CC", border: `1px solid ${LINE}`, padding: "8px 14px" }}>{t}</div>
            ))}
          </div>
          <div style={{ fontFamily: "Mono", fontSize: 24 }}>ahammadnafiz.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  )
}
