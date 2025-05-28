"use client"

import { useEffect, useState } from "react"

export function About() {
  const [animationStep, setAnimationStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setAnimationStep(prev => prev + 1)
    }, 150) // Smooth animation timing for continuous convolution
    
    return () => clearInterval(interval)
  }, [])
  
  // CNN Input Pattern - Realistic image data visualization
  const getCNNInputPattern = (i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    // Create realistic image-like patterns (simulating edges, textures, objects)
    const centerX = gridSize / 2
    const centerY = gridSize / 2
    const distanceFromCenter = Math.sqrt((row - centerY) ** 2 + (col - centerX) ** 2)
    
    // Simulate a circular object (like a digit or shape)
    const isCircularObject = distanceFromCenter > gridSize * 0.15 && distanceFromCenter < gridSize * 0.35
    
    // Simulate edges and textures
    const hasVerticalEdge = Math.abs(col - gridSize * 0.3) < 1 || Math.abs(col - gridSize * 0.7) < 1
    const hasHorizontalEdge = Math.abs(row - gridSize * 0.4) < 1 || Math.abs(row - gridSize * 0.6) < 1
    
    // Simulate noise/texture patterns (deterministic)
    const hasTexture = (row + col * 3) % 7 === 0 && (row * col) % 5 === 0
    
    // Simulate corner features
    const isCornerFeature = (row < 2 && col < 2) || (row > gridSize - 3 && col > gridSize - 3)
    
    // Different intensity levels like real grayscale images
    if (isCircularObject) {
      return "bg-accent/40" // Main object - higher intensity
    } else if (hasVerticalEdge || hasHorizontalEdge) {
      return "bg-accent/30" // Edges - medium intensity
    } else if (hasTexture) {
      return "bg-accent/15" // Texture - low intensity
    } else if (isCornerFeature) {
      return "bg-accent/25" // Corner features
    }
    
    return "bg-background" // Background pixels
  }
  
  // Continuous CNN Convolution Pattern - Realistic computer vision processing
  const getContinuousCNNPattern = (step: number, i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    // Calculate filter positions for smooth movement
    const filterSize = 3
    const maxFilterRow = gridSize - filterSize + 1  // Fix: ensure full coverage
    const maxFilterCol = gridSize - filterSize + 1  // Fix: ensure full coverage
    const totalPositions = maxFilterRow * maxFilterCol
    
    // Use step to create smooth continuous movement
    const currentPosition = step % totalPositions
    const filterRow = Math.floor(currentPosition / maxFilterCol)
    const filterCol = currentPosition % maxFilterCol
    
    // Get base input pattern (realistic image data)
    const basePattern = getCNNInputPattern(i, gridSize)
    
    // Check if current pixel is under the filter kernel
    const underFilter = row >= filterRow && row < filterRow + filterSize && 
                       col >= filterCol && col < filterCol + filterSize
    
    // Realistic CNN filter effects
    if (underFilter) {
      // Center of filter (convolution computation happening)
      const isCenter = row === filterRow + 1 && col === filterCol + 1
      if (isCenter) {
        return "bg-red-500/80 border-2 border-red-400 shadow-lg shadow-red-500/50 animate-pulse" // Active computation
      }
      
      // Filter kernel positions with realistic highlighting
      const relativeRow = row - filterRow
      const relativeCol = col - filterCol
      
      // Simulate different kernel weights (edge detection filter)
      if ((relativeRow === 0 || relativeRow === 2) && relativeCol === 1) {
        return "bg-yellow-400/70 border border-yellow-300" // Vertical edge detection
      } else if ((relativeCol === 0 || relativeCol === 2) && relativeRow === 1) {
        return "bg-blue-400/70 border border-blue-300" // Horizontal edge detection
      } else {
        return "bg-accent/70 border border-accent/50" // Other kernel positions
      }
    }
    
    // Show feature activation from recently processed areas
    const recentSteps = 6
    for (let i = 1; i <= recentSteps; i++) {
      const pastPosition = (step - i + totalPositions) % totalPositions
      const pastFilterRow = Math.floor(pastPosition / maxFilterCol)
      const pastFilterCol = pastPosition % maxFilterCol
      
      const wasPreviouslyUnderFilter = row >= pastFilterRow && row < pastFilterRow + filterSize && 
                                      col >= pastFilterCol && col < pastFilterCol + filterSize
      
      if (wasPreviouslyUnderFilter) {
        // Simulate feature map activation with fading intensity
        const intensity = (recentSteps - i) / recentSteps
        const wasCenterPreviously = row === pastFilterRow + 1 && col === pastFilterCol + 1
        
        if (wasCenterPreviously && intensity > 0.5) {
          return `bg-green-400/${Math.floor(intensity * 40)} border border-green-300/30` // Strong feature detected
        } else if (intensity > 0.3) {
          return `bg-accent/${Math.floor(intensity * 20)} border border-accent/20` // Moderate activation
        }
      }
    }
    
    return basePattern
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
                {/* CNN Animation Label */}
                <div className="absolute -top-8 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-accent bg-background px-2 py-1 border border-accent">
                    Edge Detection CNN • Real-time Processing
                  </span>
                </div>
                
                {/* Filter Position & Performance Indicator */}
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-muted-foreground">
                    {mounted && (
                      <>
                        Kernel Position: {(() => {
                          const gridSize = typeof window !== 'undefined' 
                            ? window.innerWidth < 640 ? 6 : window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 10 : 12
                            : 12;
                          const maxPos = (gridSize - 3 + 1) * (gridSize - 3 + 1);
                          const currentPos = animationStep % maxPos;
                          return `[${Math.floor(currentPos / (gridSize - 3 + 1))},${currentPos % (gridSize - 3 + 1)}]`;
                        })()}
                      </>
                    )}
                  </span>
                </div>
                
                {/* CNN Pixel Art Pattern - Responsive Grid with continuous convolution */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mobile: 6x6 grid */}
                  <div className={`grid grid-cols-6 gap-0 w-full h-full sm:hidden ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-200 ${
                          mounted ? getContinuousCNNPattern(animationStep, i, 6) : 'bg-accent/15'
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
                        className={`aspect-square transition-all duration-200 ${
                          mounted ? getContinuousCNNPattern(animationStep, i, 8) : 'bg-accent/15'
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
                        className={`aspect-square transition-all duration-200 ${
                          mounted ? getContinuousCNNPattern(animationStep, i, 10) : 'bg-accent/15'
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
                        className={`aspect-square transition-all duration-200 ${
                          mounted ? getContinuousCNNPattern(animationStep, i, 12) : 'bg-accent/15'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Filter Status Indicator */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                  <div className="flex items-center space-x-2 text-xs font-mono text-accent bg-background/90 px-2 py-1 border border-accent/30 rounded">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span>Edge Detection Active</span>
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
