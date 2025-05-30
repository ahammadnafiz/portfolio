export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-secondary/20 text-foreground relative">
      {/* Structured Data for Contact */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Ahammad Nafiz",
            "description": "Get in touch with Ahammad Nafiz for Machine Learning, AI Development, and Data Science opportunities",
            "mainEntity": {
              "@type": "Person",
              "name": "Ahammad Nafiz",
              "jobTitle": "Machine Learning Engineer",
              "email": "ahammadnafiz86@gmail.com",
              "telephone": "+8801619960303",
              "url": "https://ahammadnafiz.github.io",
              "sameAs": [
                "https://github.com/ahammadnafiz",
                "https://linkedin.com/in/ahammad-nafiz"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BD"
              }
            }
          })
        }}
      />
      
      {/* Center content container */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2" aria-hidden="true">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent opacity-30"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2" aria-hidden="true">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-30 animate-pulse"></div>
          </div>
          
          <header className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6 sm:mb-8 uppercase">
              <span className="text-accent">C</span>ontact
            </h2>
            <div className="w-12 sm:w-16 h-1 sm:h-2 bg-accent mx-auto" aria-hidden="true"></div>
          </header>

          <p className="font-mono text-foreground text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in new opportunities in data science, AI development, and collaborative projects.
            <br />
            <span className="text-accent">Let's build intelligent solutions together.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
            <a
              href="mailto:ahammadnafiz86@gmail.com"
              className="pixel-button uppercase text-sm sm:text-base"
              aria-label="Send email to Ahammad Nafiz"
              itemProp="email"
            >
              Send Email
            </a>

            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8" aria-label="Social media and contact links">
              <a
                href="https://github.com/ahammadnafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
                aria-label="Visit Ahammad Nafiz's GitHub profile"
                itemProp="sameAs"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ahammad-nafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
                aria-label="Connect with Ahammad Nafiz on LinkedIn"
                itemProp="sameAs"
              >
                LinkedIn
              </a>
              <a
                href="https://ahammadnafiz.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
                aria-label="Visit Ahammad Nafiz's blog"
                itemProp="url"
              >
                Blog
              </a>
              <a
                href="tel:+8801619960303"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
                aria-label="Call Ahammad Nafiz"
                itemProp="telephone"
              >
                Phone
              </a>
            </nav>
          </div>

          <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-accent/30">
            <p className="font-mono text-xs text-accent">© 2025 Ahammad Nafiz</p>
          </footer>
        </div>
      </div>
    </section>
  )
}
