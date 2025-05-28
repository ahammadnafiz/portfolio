import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ahammad Nafiz - Portfolio",
  description: "Data Scientist & AI Developer - Building intelligent solutions with ML & AI",
  generator: 'v0.dev',
  other: {
    'devicons': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" 
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
