import type React from "react"
import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

const SITE_URL = "https://ahammadnafiz.github.io/portfolio"
const OG_IMAGE = `${SITE_URL}/og-image.png`
const DESCRIPTION =
  "ML engineer in Dhaka working on RAG systems, LLM agents, and agent memory. Currently at Markopolo AI. Previously AskTuring.ai and research at UIU."

export const metadata: Metadata = {
  metadataBase: new URL("https://ahammadnafiz.github.io"),
  title: {
    default: "Ahammad Nafiz — Machine Learning & AI Engineer",
    template: "%s | Ahammad Nafiz"
  },
  description: DESCRIPTION,

  // Author information
  authors: [{ name: "Ahammad Nafiz", url: SITE_URL }],
  creator: "Ahammad Nafiz",
  publisher: "Ahammad Nafiz",

  // Open Graph metadata for social media
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${SITE_URL}/`,
    title: "Ahammad Nafiz — Machine Learning & AI Engineer",
    description: DESCRIPTION,
    siteName: "Ahammad Nafiz",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Ahammad Nafiz — Machine Learning & AI Engineer, Dhaka"
      }
    ]
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Ahammad Nafiz — Machine Learning & AI Engineer",
    description: DESCRIPTION,
    site: "@ahammadnafi_z",
    creator: "@ahammadnafi_z",
    images: [OG_IMAGE]
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Canonical URL
  alternates: {
    canonical: `${SITE_URL}/`
  },

  // Additional metadata
  category: "Technology",
  classification: "Personal Portfolio",

  // Icons
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

  // Verification tokens (add your own when you get them)
  verification: {
    google: process.env.GOOGLE_VERIFICATION_TOKEN,
    yandex: process.env.YANDEX_VERIFICATION_TOKEN,
    yahoo: process.env.YAHOO_VERIFICATION_TOKEN,
    other: {
      me: ["mailto:ahammadnafiz86@gmail.com", "https://github.com/ahammadnafiz"]
    }
  },

  // Additional metadata
  other: {
    'theme-color': '#e8e6e1',
    'msapplication-TileColor': '#1b1815',
    'msapplication-config': `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/browserconfig.xml`
  }
}

// One Person entity for the whole site, cross-referenced from ProfilePage by @id.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Ahammad Nafiz — Machine Learning & AI Engineer",
      description: DESCRIPTION,
      inLanguage: "en",
      // Static export: this evaluates once at build, so it tracks deploys.
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntity: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://ahammadnafiz.github.io/#website",
        url: "https://ahammadnafiz.github.io/",
        name: "Ahammad Nafiz"
      }
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ahammad Nafiz",
      givenName: "Ahammad",
      familyName: "Nafiz",
      alternateName: "ahammadnafiz",
      disambiguatingDescription:
        "Machine learning and AI engineer based in Dhaka, Bangladesh, working on retrieval-augmented generation, LLM agents, and agent memory infrastructure.",
      description:
        "Data Science student and ML engineer working on RAG systems, LLM agents, and mechanistic interpretability. Aiming for graduate research in Europe and a role at a frontier AI lab.",
      url: `${SITE_URL}/`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
      image: OG_IMAGE,
      email: "mailto:ahammadnafiz86@gmail.com",
      jobTitle: "Associate Product Engineer",
      nationality: { "@type": "Country", name: "Bangladesh" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD"
      },
      worksFor: {
        "@type": "Organization",
        name: "Markopolo AI",
        url: "https://markopolo.ai/",
        description: "AI social listening and narrative intelligence (DeepDive)"
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "United International University",
        url: "https://www.uiu.ac.bd/",
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" }
      },
      knowsAbout: [
        "Retrieval-Augmented Generation",
        "LLM Agents",
        "Agent Memory",
        "LLM Evaluation",
        "Hybrid Search",
        "Reciprocal Rank Fusion",
        "Vector Search",
        "pgvector",
        "LangGraph",
        "Mechanistic Interpretability",
        "Multi-Agent Systems",
        "Machine Learning Engineering",
        "Python",
        "PyTorch",
        "FastAPI"
      ],
      sameAs: [
        "https://github.com/ahammadnafiz",
        "https://www.linkedin.com/in/ahammad-nafiz/",
        "https://x.com/ahammadnafi_z",
        "https://ahammadnafiz.github.io/",
        "https://huggingface.co/ahammadnafiz",
        "https://ieeexplore.ieee.org/author/154406885670879",
        "https://medium.com/@ahammadnafizz"
      ],
      award: [
        "Champion, IC6 University Innovation Hub Program — UIU Cohort (Oct 2025), BDT 60,000 pre-seed",
        "Best Prototype Award, Blockchain Olympiad, UIU CSE Fest (Jan 2025), BDT 20,000",
        "Champion, CSE Project Show 2024 (Spring) — OOP for Data Science, for Predicta (Jun 2024)",
        "1st Runner-Up, Data Innovators Challenge 2024 — Sales analytics track"
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Enhanced SEO meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Build versioning */}
        <meta name="version" content={process.env.NEXT_PUBLIC_BUILD_ID || "dev"} />
        <meta name="build-time" content={process.env.NEXT_PUBLIC_BUILD_TIME || ""} />

        {/* Enhanced favicon and icons */}
        <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-32x32.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/apple-icon.png`} />
        <meta name="msapplication-TileImage" content={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/icon.png`} />

        {/* External resources with preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//x.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Film-grain overlay: the paper texture that ties the monochrome system together */}
        <div className="grain-overlay" aria-hidden="true" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set custom viewport height properties for better mobile support
              function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }

              // Set initial values
              setViewportHeight();

              // Update on resize and orientation change
              window.addEventListener('resize', setViewportHeight);
              window.addEventListener('orientationchange', () => {
                setTimeout(setViewportHeight, 100);
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
