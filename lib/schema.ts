// Schema.org structured data generators for SEO
export interface PersonSchema {
  "@context": string
  "@type": "Person"
  name: string
  alternateName?: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
  jobTitle: string
  worksFor?: {
    "@type": "Organization"
    name: string
    description?: string
  }
  knowsAbout?: string[]
  email?: string
  telephone?: string
  address?: {
    "@type": "PostalAddress"
    addressCountry: string
  }
  alumniOf?: {
    "@type": "Organization"
    name: string
  }
}

export interface WebPageSchema {
  "@context": string
  "@type": "WebPage"
  name: string
  description: string
  url: string
  about?: {
    "@type": "Person"
    name: string
    jobTitle: string
    description: string
  }
  mainEntity?: {
    "@type": "Portfolio"
    name: string
    description: string
  }
}

export interface SoftwareApplicationSchema {
  "@context": string
  "@type": "SoftwareApplication"
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  programmingLanguage: string[]
  author: {
    "@type": "Person"
    name: string
    url: string
  }
  dateCreated: string
  keywords: string
}

export interface ContactPageSchema {
  "@context": string
  "@type": "ContactPage"
  name: string
  description: string
  mainEntity: PersonSchema
}

export interface BreadcrumbListSchema {
  "@context": string
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item: string
  }>
}

// Default person data
export const defaultPersonData: Omit<PersonSchema, "@context" | "@type"> = {
  name: "Ahammad Nafiz",
  alternateName: "Nafiz",
  description: "ML Researcher & Python Developer specializing in Natural Language Processing, Deep Learning, and AI research",
  url: "https://ahammadnafiz.github.io/portfolio",
  image: "https://ahammadnafiz.github.io/portfolio/assets/image.png",
  sameAs: [
    "https://github.com/ahammadnafiz",
    "https://linkedin.com/in/ahammad-nafiz",
    "https://x.com/ahammadnafi_z",
    "https://ahammadnafiz.github.io"
  ],
  jobTitle: "ML Researcher & Python Developer",
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
    "Reinforcement Learning",
    "Transformer Architecture",
    "Neural Networks",
    "AutoML",
    "FastAPI",
    "Next.js"
  ],
  email: "ahammadnafiz86@gmail.com",
  telephone: "+8801619960303",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD"
  },
  alumniOf: {
    "@type": "Organization",
    name: "United International University"
  }
}

// Schema generators
export function generatePersonSchema(overrides?: Partial<PersonSchema>): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    ...defaultPersonData,
    ...overrides
  }
}

export function generateWebPageSchema(data: Omit<WebPageSchema, "@context" | "@type">): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...data
  }
}

export function generateSoftwareApplicationSchema(data: Omit<SoftwareApplicationSchema, "@context" | "@type">): SoftwareApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    ...data
  }
}

export function generateContactPageSchema(data: Omit<ContactPageSchema, "@context" | "@type">): ContactPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    ...data
  }
}

export function generateBreadcrumbListSchema(items: Array<{ name: string; href: string }>): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://ahammadnafiz.github.io/portfolio${item.href}`
    }))
  }
}

// Utility function to safely stringify schema for script tags
export function schemaToScript(schema: object): string {
  return JSON.stringify(schema, null, 0)
}
