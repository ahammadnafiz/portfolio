"use client"

import { useEffect, useState } from "react"

export function About() {
  const [filterPosition, setFilterPosition] = useState({ row: 0, col: 0 })
  const [animationCycle, setAnimationCycle] = useState(0) // 0: input, 1: filtering, 2: output
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setFilterPosition(prev => {
        const gridSize = 12 // Using largest grid for calculation
        const maxPosition = gridSize - 3 // 3x3 filter
        
        if (prev.col < maxPosition) {
          return { ...prev, col: prev.col + 1 }
        } else if (prev.row < maxPosition) {
          return { row: prev.row + 1, col: 0 }
        } else {
          // Reset and cycle through animation phases
          setAnimationCycle(c => (c + 1) % 3)
          return { row: 0, col: 0 }
        }
      })
    }, 150) // Faster animation for smoother CNN visualization
    
    return () => clearInterval(interval)
  }, [])
  
  // Generate static input pattern (represents input image)
  const getInputPattern = (i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    // Create a simple pattern that looks like image data
    return ((row + col) % 3 === 0 || (row % 2 === 1 && col % 2 === 1)) ? "bg-accent opacity-40" : "bg-transparent"
  }
  
  // Check if current pixel is under the 3x3 filter
  const isUnderFilter = (i: number, gridSize: number, filterRow: number, filterCol: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    return row >= filterRow && row < filterRow + 3 && col >= filterCol && col < filterCol + 3
  }
  
  // Generate output feature map (activated areas where filter was applied)
  const getOutputPattern = (i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    // Show feature map as a sparser, processed version
    const maxPos = gridSize - 3
    const normalizedRow = Math.floor((row / gridSize) * (maxPos + 1))
    const normalizedCol = Math.floor((col / gridSize) * (maxPos + 1))
    return (normalizedRow % 2 === 0 && normalizedCol % 2 === 0) ? "bg-accent opacity-70" : "bg-transparent"
  }
  
  // Get the pattern based on current animation cycle
  const getCNNPattern = (i: number, gridSize: number) => {
    const scaledFilterRow = Math.floor((filterPosition.row / (12 - 3)) * Math.max(0, gridSize - 3))
    const scaledFilterCol = Math.floor((filterPosition.col / (12 - 3)) * Math.max(0, gridSize - 3))
    
    switch (animationCycle) {
      case 0: // Input phase - show input data
        return getInputPattern(i, gridSize)
      case 1: // Filtering phase - show filter moving over input
        const basePattern = getInputPattern(i, gridSize)
        const underFilter = isUnderFilter(i, gridSize, scaledFilterRow, scaledFilterCol)
        return underFilter ? "bg-accent opacity-90" : basePattern
      case 2: // Output phase - show feature map
        return getOutputPattern(i, gridSize)
      default:
        return "bg-transparent"
    }
  }
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
                {/* CNN Animation Labels */}
                <div className="absolute -top-8 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-accent bg-background px-2 py-1 border border-accent">
                    {['Input Layer', 'Convolution (3x3)', 'Feature Map'][animationCycle]}
                  </span>
                </div>
                
                {/* Filter Position Indicator */}
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-muted-foreground">
                    Filter: ({filterPosition.row}, {filterPosition.col})
                  </span>
                </div>
                
                {/* CNN Pixel Art Pattern - Responsive Grid with actual CNN animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mobile: 6x6 grid */}
                  <div className={`grid grid-cols-6 gap-0 w-full h-full sm:hidden ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-150 ${
                          mounted ? getCNNPattern(i, 6) : 'bg-accent opacity-40'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Small screens: 8x8 grid */}
                  <div className={`hidden sm:grid md:hidden grid-cols-8 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-150 ${
                          mounted ? getCNNPattern(i, 8) : 'bg-accent opacity-40'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Medium screens: 10x10 grid */}
                  <div className={`hidden md:grid lg:hidden grid-cols-10 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-150 ${
                          mounted ? getCNNPattern(i, 10) : 'bg-accent opacity-40'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Large screens: 12x12 grid */}
                  <div className={`hidden lg:grid grid-cols-12 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-150 ${
                          mounted ? getCNNPattern(i, 12) : 'bg-accent opacity-40'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                </div>
                
                {/* CNN Process Indicators */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-center space-x-1">
                  {[0, 1, 2].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 border border-accent transition-all duration-300 ${
                        step === animationCycle ? 'bg-accent' : 'bg-transparent'
                      }`}
                    />
                  ))}
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
