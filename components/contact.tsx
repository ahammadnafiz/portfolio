export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-secondary/20 text-foreground relative">
      {/* Center content container */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent opacity-30"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-30 animate-pulse"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-6 sm:mb-8 uppercase">
            <span className="text-accent">C</span>ontact
          </h2>
          <div className="w-12 sm:w-16 h-1 sm:h-2 bg-accent mx-auto mb-8 sm:mb-12"></div>

          <p className="font-mono text-foreground text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in new opportunities in data science, AI development, and collaborative projects.
            <br />
            <span className="text-accent">Let's build intelligent solutions together.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
            <a
              href="mailto:ahammadnafiz@outlook.com"
              className="pixel-button uppercase text-sm sm:text-base"
            >
              Send Email
            </a>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              <a
                href="https://github.com/ahammadnafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ahammad-nafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://ahammadnafiz.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
              >
                Portfolio
              </a>
              <a
                href="tel:+8801619960303"
                className="font-mono text-xs sm:text-sm border-b-2 border-accent hover:text-accent transition-colors"
              >
                Phone
              </a>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-accent/30">
            <p className="font-mono text-xs text-accent">© 2025 Ahammad Nafiz</p>
          </div>
        </div>
      </div>
    </section>
  )
}
