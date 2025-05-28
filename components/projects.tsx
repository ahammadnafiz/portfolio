const projects = [
  {
    title: "Predicta",
    description: "End-to-end ML pipeline for data analysis and prediction, featuring automated feature engineering and model selection. Built with advanced AI agents for intelligent automation.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "LangChain"],
    link: "https://github.com/ahammadnafiz",
    year: "2024 - Current"
  },
  {
    title: "FizTorch",
    description: "Educational deep learning framework inspired by PyTorch. Implements autograd, optimization algorithms, and core ML components with comprehensive documentation for beginners.",
    tech: ["Python", "NumPy", "Linear Algebra", "Deep Learning"],
    link: "https://github.com/ahammadnafiz",
    year: "2024"
  },
  {
    title: "Personal Knowledge Assistant",
    description: "Multi-Agent RAG system combining document processing, smart confidence-based routing, and web fusion. Features LLM integration and modern web interface.",
    tech: ["LangChain", "Hugging Face", "Groq LLM", "FAISS", "FastAPI", "Next.js", "Tailwind"],
    link: "https://github.com/ahammadnafiz",
    year: "2025"
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative">
      {/* Center content container */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-30"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent opacity-30 animate-pulse"></div>
          </div>
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-4 uppercase">
              <span className="text-accent">P</span>rojects
            </h2>
            <div className="w-12 sm:w-16 h-1 sm:h-2 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group border-2 border-accent hover:border-accent bg-secondary/10 transition-all duration-300 p-4 sm:p-6 lg:p-8 pixel-borders"
              >
                <div className="aspect-video bg-background mb-4 sm:mb-6 relative overflow-hidden border border-accent/30">
                  {/* Pixel art project preview - Responsive */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Mobile: 4x3 grid for video aspect */}
                    <div className="grid grid-cols-4 gap-0 w-full h-full sm:hidden">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square ${
                            Math.random() > 0.6 ? "bg-accent opacity-40" : "bg-transparent"
                          } group-hover:bg-accent transition-colors duration-500`}
                          style={{ transitionDelay: `${i * 30}ms` }}
                        />
                      ))}
                    </div>
                    {/* Small screens: 6x4 grid */}
                    <div className="hidden sm:grid md:hidden grid-cols-6 gap-0 w-full h-full">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square ${
                            Math.random() > 0.6 ? "bg-accent opacity-40" : "bg-transparent"
                          } group-hover:bg-accent transition-colors duration-500`}
                          style={{ transitionDelay: `${i * 25}ms` }}
                        />
                      ))}
                    </div>
                    {/* Medium and larger screens: 8x5 grid */}
                    <div className="hidden md:grid grid-cols-8 gap-0 w-full h-full">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square ${
                            Math.random() > 0.6 ? "bg-accent opacity-40" : "bg-transparent"
                          } group-hover:bg-accent transition-colors duration-500`}
                          style={{ transitionDelay: `${i * 20}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="font-mono font-bold text-lg sm:text-xl text-accent">{project.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </div>
                <p className="font-mono text-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 justify-center">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="font-mono text-xs border-2 border-accent px-2 py-1 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="pixel-button text-xs sm:text-sm inline-block"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>

          {/* View More Projects Button */}
          <div className="mt-12 sm:mt-16">
            <a
              href="https://github.com/ahammadnafiz"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-button text-sm sm:text-base"
            >
              View More Projects →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
