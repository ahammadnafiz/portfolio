"use client"

import { useEffect, useState } from "react"

export function About() {
  const [animationStep, setAnimationStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [currentChannel, setCurrentChannel] = useState(0) // 0: RGB combined, 1: R, 2: G, 3: B
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setAnimationStep(prev => prev + 1)
    }, 120) // Slightly slower for better visibility of RGB effects
    
    // Channel switching every 3 seconds
    const channelInterval = setInterval(() => {
      setCurrentChannel(prev => (prev + 1) % 4)
    }, 3000)
    
    return () => {
      clearInterval(interval)
      clearInterval(channelInterval)
    }
  }, [])
  
  // Generate realistic RGB image data
  const getRGBImageData = (i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    // Create realistic image features
    const centerX = gridSize / 2
    const centerY = gridSize / 2
    const distanceFromCenter = Math.sqrt((row - centerY) ** 2 + (col - centerX) ** 2)
    
    // Simulate a face-like object with different RGB intensities
    const isMainObject = distanceFromCenter > gridSize * 0.2 && distanceFromCenter < gridSize * 0.4
    const isEyes = (Math.abs(row - gridSize * 0.35) < 1 && (Math.abs(col - gridSize * 0.3) < 1 || Math.abs(col - gridSize * 0.7) < 1))
    const isMouth = Math.abs(row - gridSize * 0.65) < 1 && Math.abs(col - centerX) < gridSize * 0.15
    const isSkinTone = distanceFromCenter < gridSize * 0.45 && !isEyes && !isMouth
    
    // RGB values (0-255 simulation using opacity)
    let r = 0, g = 0, b = 0
    
    if (isEyes) {
      r = 50; g = 30; b = 20 // Dark brown eyes
    } else if (isMouth) {
      r = 180; g = 80; b = 90 // Reddish lips
    } else if (isSkinTone) {
      r = 220; g = 180; b = 140 // Skin tone
    } else if (isMainObject) {
      r = 160; g = 140; b = 120 // Hair/background of face
    } else {
      // Background with some texture
      const noise = (row * 7 + col * 11) % 40
      r = 240 + noise; g = 245 + noise; b = 250 + noise // Light background
    }
    
    return { r: Math.min(255, r), g: Math.min(255, g), b: Math.min(255, b) }
  }
  
  // RGB Channel visualization
  const getRGBChannelClass = (rgb: {r: number, g: number, b: number}, channel: number) => {
    const { r, g, b } = rgb
    
    switch (channel) {
      case 0: // RGB Combined
        return `bg-red-500/${Math.floor(r/255*40)} bg-green-500/${Math.floor(g/255*40)} bg-blue-500/${Math.floor(b/255*40)}`
      case 1: // Red channel
        return `bg-red-500/${Math.floor(r/255*60)}`
      case 2: // Green channel  
        return `bg-green-500/${Math.floor(g/255*60)}`
      case 3: // Blue channel
        return `bg-blue-500/${Math.floor(b/255*60)}`
      default:
        return "bg-gray-500/20"
    }
  }
  
  // Realistic CNN convolution with RGB processing
  const getRealisticCNNPattern = (step: number, i: number, gridSize: number) => {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    
    // Get base RGB data
    const rgbData = getRGBImageData(i, gridSize)
    
    // Filter parameters
    const filterSize = 3
    const maxFilterRow = gridSize - filterSize + 1
    const maxFilterCol = gridSize - filterSize + 1
    const totalPositions = maxFilterRow * maxFilterCol
    
    const currentPosition = step % totalPositions
    const filterRow = Math.floor(currentPosition / maxFilterCol)
    const filterCol = currentPosition % maxFilterCol
    
    // Check if under current filter
    const underFilter = row >= filterRow && row < filterRow + filterSize && 
                       col >= filterCol && col < filterCol + filterSize
    
    if (underFilter) {
      const relativeRow = row - filterRow
      const relativeCol = col - filterCol
      const isCenter = relativeRow === 1 && relativeCol === 1
      
      if (isCenter) {
        // Active convolution computation - show RGB processing
        const channelColors = ["border-purple-400 bg-purple-500/80 shadow-lg shadow-purple-500/50", 
                              "border-red-400 bg-red-500/80 shadow-lg shadow-red-500/50",
                              "border-green-400 bg-green-500/80 shadow-lg shadow-green-500/50", 
                              "border-blue-400 bg-blue-500/80 shadow-lg shadow-blue-500/50"]
        return `${channelColors[currentChannel]} border-2 animate-pulse`
      }
      
      // Different kernel weights for edge detection
      const kernelWeights = [
        [-1, -1, -1],
        [-1,  8, -1], 
        [-1, -1, -1]
      ]
      
      const weight = kernelWeights[relativeRow][relativeCol]
      if (weight === 8) {
        return "bg-yellow-400/80 border border-yellow-300 shadow-sm"
      } else if (weight === -1) {
        return "bg-cyan-400/60 border border-cyan-300"
      }
    }
    
    // Show feature activation trails
    const recentSteps = 8
    for (let i = 1; i <= recentSteps; i++) {
      const pastPosition = (step - i + totalPositions) % totalPositions
      const pastFilterRow = Math.floor(pastPosition / maxFilterCol)
      const pastFilterCol = pastPosition % maxFilterCol
      
      const wasPreviouslyCenter = row === pastFilterRow + 1 && col === pastFilterCol + 1
      
      if (wasPreviouslyCenter) {
        const intensity = (recentSteps - i) / recentSteps
        if (intensity > 0.4) {
          // Show detected features based on RGB content
          const { r, g, b } = rgbData
          const edgeStrength = Math.abs(r - 128) + Math.abs(g - 128) + Math.abs(b - 128)
          
          if (edgeStrength > 200) {
            return `bg-orange-400/${Math.floor(intensity * 60)} border border-orange-300/40` // Strong edge
          } else if (edgeStrength > 100) {
            return `bg-lime-400/${Math.floor(intensity * 40)} border border-lime-300/30` // Medium edge
          }
        }
      }
    }
    
    // Base RGB visualization
    const baseIntensity = currentChannel === 0 ? 30 : 50
    const { r, g, b } = rgbData
    
    switch (currentChannel) {
      case 0: // RGB Combined - realistic color mixing
        if (r > 200 && g > 150 && b > 100) return "bg-orange-200/40" // Skin tones
        if (r > 150 && g < 100 && b < 100) return "bg-red-400/50" // Red features  
        if (r < 100 && g < 100 && b < 100) return "bg-gray-800/60" // Dark features
        return "bg-gray-100/30" // Background
      case 1: // Red channel
        return `bg-red-500/${Math.floor(r/255*baseIntensity)}`
      case 2: // Green channel
        return `bg-green-500/${Math.floor(g/255*baseIntensity)}`
      case 3: // Blue channel
        return `bg-blue-500/${Math.floor(b/255*baseIntensity)}`
      default:
        return "bg-background"
    }
  }
  
  const getChannelName = (channel: number) => {
    switch (channel) {
      case 0: return "RGB Combined"
      case 1: return "Red Channel"
      case 2: return "Green Channel" 
      case 3: return "Blue Channel"
      default: return "Unknown"
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
                {/* Channel Indicator */}
                <div className="absolute -top-8 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-accent bg-background/90 px-2 py-1 border border-accent/30 rounded">
                    {mounted && getChannelName(currentChannel)}
                  </span>
                </div>
                
                {/* Filter Position & Performance Indicator */}
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <span className="text-xs font-mono text-muted-foreground">
                    {mounted && (
                      <>
                        Kernel Position: {(() => {
                          const gridSize = typeof window !== 'undefined' 
                            ? window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : window.innerWidth < 1024 ? 12 : 14
                            : 14;
                          const maxPos = (gridSize - 3 + 1) * (gridSize - 3 + 1);
                          const currentPos = animationStep % maxPos;
                          return `[${Math.floor(currentPos / (gridSize - 3 + 1))},${currentPos % (gridSize - 3 + 1)}]`;
                        })()}
                      </>
                    )}
                  </span>
                </div>
                
                {/* Realistic RGB CNN Pattern - Responsive Grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mobile: 8x8 grid */}
                  <div className={`grid grid-cols-8 gap-0 w-full h-full sm:hidden ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-300 ${
                          mounted ? getRealisticCNNPattern(animationStep, i, 8) : 'bg-accent/15'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Small screens: 10x10 grid */}
                  <div className={`hidden sm:grid md:hidden grid-cols-10 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-300 ${
                          mounted ? getRealisticCNNPattern(animationStep, i, 10) : 'bg-accent/15'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Medium screens: 12x12 grid */}
                  <div className={`hidden md:grid lg:hidden grid-cols-12 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-300 ${
                          mounted ? getRealisticCNNPattern(animationStep, i, 12) : 'bg-accent/15'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                  {/* Large screens: 14x14 grid */}
                  <div className={`hidden lg:grid grid-cols-14 gap-0 w-full h-full ${!mounted ? 'cnn-animation-grid' : ''}`}>
                    {Array.from({ length: 196 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square transition-all duration-300 ${
                          mounted ? getRealisticCNNPattern(animationStep, i, 14) : 'bg-accent/15'
                        }`}
                        style={!mounted ? { '--animation-delay': i } as React.CSSProperties : {}}
                      />
                    ))}
                  </div>
                </div>
                
                {/* RGB Processing Status */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                  <div className="flex items-center space-x-2 text-xs font-mono text-accent bg-background/90 px-2 py-1 border border-accent/30 rounded">
                    <div className="flex space-x-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${currentChannel === 1 ? 'bg-red-500 animate-pulse' : 'bg-red-500/30'}`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full ${currentChannel === 2 ? 'bg-green-500 animate-pulse' : 'bg-green-500/30'}`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full ${currentChannel === 3 ? 'bg-blue-500 animate-pulse' : 'bg-blue-500/30'}`}></div>
                    </div>
                    <span>RGB Edge Detection</span>
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