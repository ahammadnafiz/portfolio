import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CacheBuster } from "../components/cache-buster"
import { ServiceWorkerRegistration } from "../components/service-worker-registration"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ahammad Nafiz",
  description: "ML Researcher | Python Developer",
  generator: 'Author',
  icons: {
    icon: [
      { url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon.ico`, sizes: '32x32' },
      { url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
      { url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-32x32.png`, type: 'image/png', sizes: '32x32' },
      { url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/icon.png`, type: 'image/png' },
    ],
    apple: [
      { url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/apple-icon.png`, type: 'image/png', sizes: '180x180' },
    ],
  },
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
        {/* Proper cache control headers - no aggressive cache busting for HTML */}
        <meta httpEquiv="Cache-Control" content="no-cache, max-age=0" />
        <meta name="version" content={process.env.NEXT_PUBLIC_BUILD_ID || "dev"} />
        <meta name="build-time" content={process.env.NEXT_PUBLIC_BUILD_TIME || ""} />
        
        {/* Additional favicon meta tags for better browser support */}
        <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-32x32.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/apple-icon.png`} />
        <meta name="msapplication-TileImage" content={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/icon.png`} />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        <CacheBuster />
        {children}
      </body>
    </html>
  )
}
