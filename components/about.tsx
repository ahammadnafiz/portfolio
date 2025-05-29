"use client"

import { useEffect, useState } from "react"

export function About() {
  const [animationStep, setAnimationStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setAnimationStep(prev => prev + 1)
    }, 120)
    
    return () => clearInterval(interval)
  }, [])
  
  // Enhanced CNN Input Pattern - Realistic handwritten digit
  const getCNNInputPattern = (i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    // Simulate a handwritten digit "8" 
    const centerX = gridSize / 2
    const centerY = gridSize / 2
    
    // Top circle of "8"
    const topCircleY = centerY - gridSize * 0.15
    const topCircleDist = Math.sqrt((row - topCircleY) ** 2 + (col - centerX) ** 2)
    const isTopCircleEdge = topCircleDist > gridSize * 0.12 && topCircleDist < gridSize * 0.18
    const isTopCircleInner = topCircleDist <= gridSize * 0.12
    
    // Bottom circle of "8"
    const bottomCircleY = centerY + gridSize * 0.15
    const bottomCircleDist = Math.sqrt((row - bottomCircleY) ** 2 + (col - centerX) ** 2)
    const isBottomCircleEdge = bottomCircleDist > gridSize * 0.12 && bottomCircleDist < gridSize * 0.18
    const isBottomCircleInner = bottomCircleDist <= gridSize * 0.12
    
    // Middle connection
    const isMiddleConnection = Math.abs(row - centerY) < 1 && Math.abs(col - centerX) < gridSize * 0.08
    
    // Ink variations
    const hasInkVariation = (row * 3 + col * 5) % 11 === 0
    const hasSmudge = (row + col) % 13 === 0
    
    // Main stroke areas
    if (isTopCircleEdge || isBottomCircleEdge || isMiddleConnection) {
      if (hasInkVariation) {
        return "bg-slate-800"
      }
      return "bg-slate-700"
    }
    
    // Inner areas
    if (isTopCircleInner || isBottomCircleInner) {
      return "bg-slate-500/60"
    }
    
    // Paper texture
    if (hasSmudge) {
      return "bg-slate-400/20"
    }
    
    return "bg-slate-50"
  }
  
  // Enhanced CNN Pattern with CSS class integration
  const getEnhancedCNNPattern = (step: number, i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    const filterSize = 3
    const maxFilterRow = gridSize - filterSize + 1
    const maxFilterCol = gridSize - filterSize + 1
    const totalPositions = maxFilterRow * maxFilterCol
    
    // Cycle through different filter types
    const passNumber = Math.floor(step / totalPositions) % 4
    const currentPosition = step % totalPositions
    const filterRow = Math.floor(currentPosition / maxFilterCol)
    const filterCol = currentPosition % maxFilterCol
    
    // Get base pattern
    const basePattern = getCNNInputPattern(i, gridSize)
    
    // Current filter kernel
    const underFilter = row >= filterRow && row < filterRow + filterSize && 
                       col >= filterCol && col < filterCol + filterSize
    
    if (underFilter) {
      const relativeRow = row - filterRow
      const relativeCol = col - filterCol
      const isCenter = relativeRow === 1 && relativeCol === 1
      
      // Filter center with enhanced animation classes
      if (isCenter) {
        const filterClasses = [
          "cnn-filter-center cnn-pixel-processing bg-orange-500 border-2 border-orange-300 shadow-lg shadow-orange-500/40",
          "cnn-filter-center cnn-pixel-processing bg-purple-500 border-2 border-purple-300 shadow-lg shadow-purple-500/40", 
          "cnn-filter-center cnn-pixel-processing bg-cyan-500 border-2 border-cyan-300 shadow-lg shadow-cyan-500/40",
          "cnn-filter-center cnn-pixel-processing bg-emerald-500 border-2 border-emerald-300 shadow-lg shadow-emerald-500/40"
        ]
        return filterClasses[passNumber]
      }
      
      // Filter kernel positions
      switch (passNumber) {
        case 0: // Edge Detection (Sobel X)
          if (relativeCol === 0) return "cnn-filter-active bg-blue-400/80 border border-blue-300"
          if (relativeCol === 2) return "cnn-filter-active bg-red-400/80 border border-red-300" 
          return "cnn-filter-active bg-slate-300/60 border border-slate-400/40"
          
        case 1: // Edge Detection (Sobel Y) 
          if (relativeRow === 0) return "cnn-filter-active bg-green-400/80 border border-green-300"
          if (relativeRow === 2) return "cnn-filter-active bg-yellow-400/80 border border-yellow-300"
          return "cnn-filter-active bg-slate-300/60 border border-slate-400/40"
          
        case 2: // Blur/Gaussian
          const isCorner = (relativeRow === 0 || relativeRow === 2) && (relativeCol === 0 || relativeCol === 2)
          if (isCorner) return "cnn-filter-active bg-blue-300/60 border border-blue-200"
          return "cnn-filter-active bg-blue-400/70 border border-blue-300"
          
        case 3: // Sharpen
          if (relativeRow === 1 || relativeCol === 1) return "cnn-filter-active bg-red-300/70 border border-red-200"
          return "cnn-filter-active bg-slate-400/50 border border-slate-300"
      }
    }
    
    // Enhanced feature map activation trail with CSS classes
    const trailLength = 8
    for (let t = 1; t <= trailLength; t++) {
      const pastPosition = (step - t + totalPositions) % totalPositions
      const pastFilterRow = Math.floor(pastPosition / maxFilterCol)
      const pastFilterCol = pastPosition % maxFilterCol
      
      const wasUnderPastFilter = row >= pastFilterRow && row < pastFilterRow + filterSize && 
                                col >= pastFilterCol && col < pastFilterCol + filterSize
      
      if (wasUnderPastFilter) {
        const intensity = (trailLength - t) / trailLength
        const wasPastCenter = row === pastFilterRow + 1 && col === pastFilterCol + 1
        
        // Feature activation with intensity-based CSS classes
        if (wasPastCenter && intensity > 0.7) {
          return "cnn-activation-high cnn-feature-strong"
        } else if (wasPastCenter && intensity > 0.4) {
          return "cnn-activation-medium cnn-feature-map"
        } else if (intensity > 0.2) {
          return "cnn-activation-low cnn-feature-map"
        }
      }
    }
    
    return basePattern
  }
  
  // Get current filter info
  const getCurrentFilterInfo = (step: number, gridSize: number) => {
    const filterSize = 3
    const maxFilterRow = gridSize - filterSize + 1
    const maxFilterCol = gridSize - filterSize + 1
    const totalPositions = maxFilterRow * maxFilterCol
    const passNumber = Math.floor(step / totalPositions) % 4
    const currentPosition = step % totalPositions
    
    const filterTypes = [
      { name: 'Edge Detection (Sobel X)', class: 'cnn-edge-detection', color: 'text-orange-400' },
      { name: 'Edge Detection (Sobel Y)', class: 'cnn-edge-detection', color: 'text-purple-400' }, 
      { name: 'Gaussian Blur', class: 'cnn-blur-filter', color: 'text-cyan-400' },
      { name: 'Sharpen Filter', class: 'cnn-sharpen-filter', color: 'text-emerald-400' }
    ]
    
    return {
      ...filterTypes[passNumber],
      position: currentPosition,
      progress: ((currentPosition / totalPositions) * 100).toFixed(1)
    }
  }
  
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-secondary/20 relative">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center relative">
          {/* Left decorative element */}
          <div className="hidden lg:flex absolute -left-12 xl:-left-16 2xl:-left-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-accent opacity-30"></div>
          </div>
          
          {/* Right decorative element */}
          <div className="hidden lg:flex absolute -right-12 xl:-right-16 2xl:-right-20 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-accent opacity-30"></div>
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

            <div className="relative order-1 lg:order-2 mb-20 sm:mb-24 md:mb-28 lg:mb-20">
              <div className="group aspect-square bg-background relative overflow-hidden border-2 sm:border-4 border-accent pixel-borders w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[350px] mx-auto">
                
                {/* Enhanced CNN Processing Info */}
                <div className="absolute -top-14 sm:-top-16 md:-top-18 lg:-top-20 xl:-top-22 left-0 right-0 text-center space-y-1 sm:space-y-2">
                  <div className={`text-xs sm:text-sm font-mono px-2 sm:px-3 py-1 sm:py-1.5 border border-accent/30 rounded inline-block cnn-processing-indicator ${mounted ? getCurrentFilterInfo(animationStep, 12).class : ''}`}>
                    <span className={mounted ? getCurrentFilterInfo(animationStep, 12).color : 'text-accent'}>
                      <span className="hidden sm:inline">{mounted && getCurrentFilterInfo(animationStep, 12).name}</span>
                      <span className="sm:hidden text-xs truncate max-w-[120px] inline-block">
                        {mounted && getCurrentFilterInfo(animationStep, 12).name.split(' ')[0]}
                      </span>
                    </span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    <span className="bg-background/90 px-1 sm:px-2 py-0.5 sm:py-1 border border-muted-foreground/20 rounded text-xs">
                      <span className="hidden sm:inline">Progress: </span>{mounted && getCurrentFilterInfo(animationStep, 12).progress}%
                    </span>
                  </div>
                </div>
                
                {/* Enhanced CNN Grid with CSS Animation Classes */}
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  {/* Mobile: 6x6 grid */}
                  <div className={`grid grid-cols-6 gap-px w-full h-full sm:hidden ${!mounted ? 'cnn-animation-grid opacity-50' : ''}`}>
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`cnn-pixel aspect-square transition-all duration-150 ease-out ${
                          mounted ? getEnhancedCNNPattern(animationStep, i, 6) : 'bg-slate-300'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  
                  {/* Small screens: 8x8 grid */}
                  <div className={`hidden sm:grid md:hidden grid-cols-8 gap-px w-full h-full ${!mounted ? 'cnn-animation-grid opacity-50' : ''}`}>
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`cnn-pixel aspect-square transition-all duration-150 ease-out ${
                          mounted ? getEnhancedCNNPattern(animationStep, i, 8) : 'bg-slate-300'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  
                  {/* Medium screens: 10x10 grid */}
                  <div className={`hidden md:grid lg:hidden grid-cols-10 gap-px w-full h-full ${!mounted ? 'cnn-animation-grid opacity-50' : ''}`}>
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`cnn-pixel aspect-square transition-all duration-150 ease-out ${
                          mounted ? getEnhancedCNNPattern(animationStep, i, 10) : 'bg-slate-300'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  
                  {/* Large screens: 12x12 grid */}
                  <div className={`hidden lg:grid grid-cols-12 gap-px w-full h-full ${!mounted ? 'cnn-animation-grid opacity-50' : ''}`}>
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`cnn-pixel aspect-square transition-all duration-150 ease-out ${
                          mounted ? getEnhancedCNNPattern(animationStep, i, 12) : 'bg-slate-300'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Status Panel */}
                <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                  <div className="flex items-center justify-between text-xs font-mono gap-1 sm:gap-2">
                    {/* Processing Status with Data Stream */}
                    <div className="flex items-center space-x-1 sm:space-x-2 text-accent bg-background/95 px-1 sm:px-2 py-0.5 sm:py-1 border border-accent/30 rounded overflow-hidden min-w-0 flex-shrink">
                      <div className="cnn-data-stream w-6 sm:w-8 md:w-12 h-1 rounded-full flex-shrink-0"></div>
                      <span className="hidden sm:inline text-xs whitespace-nowrap">Processing</span>
                      <span className="sm:hidden text-xs">Proc</span>
                    </div>
                    
                    {/* Enhanced Kernel Position */}
                    <div className="text-muted-foreground bg-background/95 px-1 sm:px-2 py-0.5 sm:py-1 border border-muted-foreground/20 rounded text-xs whitespace-nowrap flex-shrink-0">
                      {mounted && (
                        <>
                          {(() => {
                            const gridSize = typeof window !== 'undefined' 
                              ? window.innerWidth < 640 ? 6 : window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 10 : 12
                              : 12;
                            const maxPos = (gridSize - 3 + 1) * (gridSize - 3 + 1);
                            const currentPos = animationStep % maxPos;
                            const row = Math.floor(currentPos / (gridSize - 3 + 1));
                            const col = currentPos % (gridSize - 3 + 1);
                            return `K[${row},${col}]`;
                          })()}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Feature Map Preview - Better responsive positioning */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 left-0 right-0 text-center">
                <div className="text-xs font-mono text-muted-foreground">
                  <div className="bg-background/95 px-2 sm:px-3 py-1 sm:py-1.5 border border-muted-foreground/20 rounded inline-flex items-center space-x-1 sm:space-x-2 shadow-sm max-w-[140px] sm:max-w-none mx-auto">
                    <div className="flex space-x-1 flex-shrink-0">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="hidden sm:inline">Feature Maps Active</span>
                    <span className="sm:hidden text-xs truncate">Features</span>
                  </div>
                </div>
              </div>
              
              {/* Pixel corner decoration - Responsive positioning */}
              <div className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 -right-1 sm:-right-2 md:-right-3 lg:-right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 bg-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}