import type React from "react"
import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import { CacheBuster } from "../components/cache-buster"
import { ServiceWorkerRegistration } from "../components/service-worker-registration"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ahammadnafiz.github.io"),
  // Basic metadata
  title: {
    default: "Ahammad Nafiz | ML & AI Engineer",
    template: "%s | Ahammad Nafiz"
  },
  description: "ML & AI Engineer building RAG systems, LLM agents, and mechanistic interpretability. Head of R&D at UIU Data Science Club. Creator of FizTorch and Predicta.",
  
  // Keywords for SEO
  keywords: [
    "Ahammad Nafiz",
    "ML Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "RAG",
    "Retrieval-Augmented Generation",
    "LLM Agents",
    "Multi-Agent Systems",
    "Mechanistic Interpretability",
    "LLM Evaluation",
    "Vector Search",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "NLP",
    "AI Research",
    "Data Science",
    "PyTorch",
    "Transformer Architecture",
    "FizTorch",
    "Predicta",
    "AutoML",
    "Neural Networks",
    "UIU Data Science Club",
    "Reinforcement Learning",
    "Computer Vision",
    "TensorFlow",
    "Scikit-learn",
    "FastAPI",
    "Next.js",
    "Portfolio"
  ],
  
  // Author information
  authors: [{ name: "Ahammad Nafiz", url: "https://ahammadnafiz.github.io" }],
  creator: "Ahammad Nafiz",
  publisher: "Ahammad Nafiz",
  
  // Open Graph metadata for social media
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahammadnafiz.github.io/portfolio",
    title: "Ahammad Nafiz | ML & AI Engineer",
    description: "ML & AI Engineer building RAG systems, LLM agents, and mechanistic interpretability. Head of R&D at UIU Data Science Club.",
    siteName: "Ahammad Nafiz Portfolio",
    images: [
      {
        url: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/assets/image.png`,
        width: 1200,
        height: 630,
        alt: "Ahammad Nafiz - ML & AI Engineer Portfolio"
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Ahammad Nafiz | ML & AI Engineer",
    description: "ML & AI Engineer building RAG systems, LLM agents, and mechanistic interpretability.",
    site: "@ahammadnafi_z",
    creator: "@ahammadnafi_z",
    images: [`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/assets/image.png`]
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
    canonical: "https://ahammadnafiz.github.io/portfolio"
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
    'devicons': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
    'theme-color': '#e8e6e1',
    'msapplication-TileColor': '#1b1815',
    'msapplication-config': `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/browserconfig.xml`
  }
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
        
        {/* Cache control and versioning */}
        <meta httpEquiv="Cache-Control" content="no-cache, max-age=0" />
        <meta name="version" content={process.env.NEXT_PUBLIC_BUILD_ID || "dev"} />
        <meta name="build-time" content={process.env.NEXT_PUBLIC_BUILD_TIME || ""} />
        
        {/* Enhanced favicon and icons */}
        <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/favicon-32x32.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/apple-icon.png`} />
        <meta name="msapplication-TileImage" content={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/icon.png`} />
        
        {/* PWA Manifest */}
        <link rel="manifest" href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/manifest.json`} />
        
        {/* External resources with preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//x.com" />
        
        {/* External stylesheets */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" 
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahammad Nafiz",
              alternateName: "Nafiz",
              description: "ML & AI Engineer building RAG systems, LLM agents, and mechanistic interpretability",
              url: "https://ahammadnafiz.github.io/portfolio",
              image: "https://ahammadnafiz.github.io/portfolio/assets/image.png",
              sameAs: [
                "https://github.com/ahammadnafiz",
                "https://linkedin.com/in/ahammad-nafiz",
                "https://x.com/ahammadnafi_z",
                "https://ahammadnafiz.github.io"
              ],
              jobTitle: "ML & AI Engineer",
              worksFor: {
                "@type": "Organization",
                name: "UIU Data Science Club",
                description: "Head of R&D"
              },
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Python Development",
                "PyTorch",
                "TensorFlow",
                "Data Science",
                "Artificial Intelligence",
                "Computer Vision",
                "Reinforcement Learning"
              ],
              email: "ahammadnafiz86@gmail.com",
              alumniOf: {
                "@type": "Organization",
                name: "United International University"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Film-grain overlay: the paper texture that ties the monochrome system together */}
        <div className="grain-overlay" aria-hidden="true" />
        <ServiceWorkerRegistration />
        <CacheBuster />
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
