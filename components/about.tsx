export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-secondary/20 relative">
      {/* Center content container */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-30"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent opacity-30"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-8 sm:mb-12 uppercase">
            <span className="text-accent">A</span>bout
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6 font-mono text-foreground leading-relaxed text-sm sm:text-base text-left">
                <p className="border-l-2 sm:border-l-4 border-accent pl-3 sm:pl-4">
                  I'm a Data Science student with a strong interest in AI research—especially Natural Language Processing and Reinforcement Learning. I focus on understanding machine learning from both theoretical and practical angles, currently diving deep into Transformer architectures by implementing them from scratch.
                </p>
                <p>
                  As Head of R&D at UIU Data Science Club, I lead workshops and projects to help others learn alongside me. I also build educational tools like FizTorch (a deep learning framework) and Predicta (an AutoML pipeline) to make complex AI concepts more accessible.
                </p>
                <p>
                  I believe in learning AI through research papers, code, and collaboration—and I'm always looking to connect with mentors and contribute to open-source projects.
                </p>
                
                {/* Resume Download Button */}
                <div className="pt-4">
                  <a
                    href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/Nafiz CV Updated.pdf`}
                    download="Nafiz_CV_Updated.pdf"
                    className="pixel-button uppercase text-sm"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="group aspect-square bg-background relative overflow-hidden border-2 sm:border-4 border-accent pixel-borders w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[350px] mx-auto">
                {/* Pixel Art Pattern - Responsive Grid with hover animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mobile: 6x6 grid */}
                  <div className="grid grid-cols-6 gap-0 w-full h-full sm:hidden">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square ${
                          Math.random() > 0.7 ? "bg-accent opacity-50" : "bg-transparent"
                        } group-hover:bg-accent transition-colors duration-500`}
                        style={{ transitionDelay: `${i * 15}ms` }}
                      />
                    ))}
                  </div>
                  {/* Small screens: 8x8 grid */}
                  <div className="hidden sm:grid md:hidden grid-cols-8 gap-0 w-full h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square ${
                          Math.random() > 0.7 ? "bg-accent opacity-50" : "bg-transparent"
                        } group-hover:bg-accent transition-colors duration-500`}
                        style={{ transitionDelay: `${i * 12}ms` }}
                      />
                    ))}
                  </div>
                  {/* Medium screens: 10x10 grid */}
                  <div className="hidden md:grid lg:hidden grid-cols-10 gap-0 w-full h-full">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square ${
                          Math.random() > 0.7 ? "bg-accent opacity-50" : "bg-transparent"
                        } group-hover:bg-accent transition-colors duration-500`}
                        style={{ transitionDelay: `${i * 10}ms` }}
                      />
                    ))}
                  </div>
                  {/* Large screens: 12x12 grid */}
                  <div className="hidden lg:grid grid-cols-12 gap-0 w-full h-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square ${
                          Math.random() > 0.7 ? "bg-accent opacity-50" : "bg-transparent"
                        } group-hover:bg-accent transition-colors duration-500`}
                        style={{ transitionDelay: `${i * 8}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Pixel corner decoration */}
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
