"use client"

import { useEffect, useState } from "react"

const projects = [
  {
    title: "Predicta",
    description: "End-to-end ML pipeline for data analysis and prediction, featuring automated feature engineering and model selection. Built with advanced AI agents for intelligent automation.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "LangChain"],
    link: "https://github.com/ahammadnafiz/Predicta",
    year: "2024 - Current",
    animationType: "neural_network" // Neural network propagation
  },
  {
    title: "FizTorch",
    description: "Educational deep learning framework inspired by PyTorch. Implements autograd, optimization algorithms, and core ML components with comprehensive documentation for beginners.",
    tech: ["Python", "NumPy", "Linear Algebra", "Deep Learning"],
    link: "https://github.com/ahammadnafiz/FizTorch",
    year: "2024",
    animationType: "gradient_descent" // Gradient descent optimization
  },
  {
    title: "Personal Knowledge Assistant",
    description: "Multi-Agent RAG system combining document processing, smart confidence-based routing, and web fusion. Features LLM integration and modern web interface.",
    tech: ["LangChain", "Hugging Face", "Groq LLM", "FAISS", "FastAPI", "Next.js", "Tailwind"],
    link: "https://github.com/ahammadnafiz/Personal-Knowledge-Assistant",
    year: "2025",
    animationType: "attention_mechanism" // Attention/transformer pattern
  },
]

export function Projects() {
  const [animationSteps, setAnimationSteps] = useState<{[key: number]: number}>({})
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const intervals: NodeJS.Timeout[] = []
    
    projects.forEach((_, index) => {
      const interval = setInterval(() => {
        setAnimationSteps(prev => ({
          ...prev,
          [index]: (prev[index] || 0) + 1
        }))
      }, 250 + index * 60) // Faster animation speed
      intervals.push(interval)
    })
    
    return () => intervals.forEach(clearInterval)
  }, [])
  
  // Neural Network Animation - Forward propagation pattern with vibrant colors
  const getNeuralNetworkPattern = (step: number, i: number, gridCols: number, gridRows: number) => {
    const row = Math.floor(i / gridCols)
    const col = i % gridCols
    const waveProgress = (step % (gridCols + gridRows)) / (gridCols + gridRows)
    const distanceFromStart = (row + col) / (gridCols + gridRows - 2)
    
    // Vibrant color cycling for active neurons
    const colorPhase = (step + i) % 4
    
    if (Math.abs(distanceFromStart - waveProgress) < 0.3) {
      if (colorPhase === 0) return "bg-violet-500 opacity-70" // Electric violet
      if (colorPhase === 1) return "bg-emerald-500 opacity-70" // Vibrant emerald
      if (colorPhase === 2) return "bg-cyan-500 opacity-70" // Electric cyan
      return "bg-fuchsia-500 opacity-70" // Bright fuchsia
    } else if (Math.abs(distanceFromStart - waveProgress) < 0.5) {
      if (colorPhase === 0) return "bg-violet-400 opacity-35"
      if (colorPhase === 1) return "bg-emerald-400 opacity-35"
      if (colorPhase === 2) return "bg-cyan-400 opacity-35"
      return "bg-fuchsia-400 opacity-35"
    }
    
    // Random vibrant sparkles
    if (Math.random() > 0.98) {
      const sparkleColor = Math.floor(Math.random() * 5)
      if (sparkleColor === 0) return "bg-rose-400 opacity-25" // Vibrant rose
      if (sparkleColor === 1) return "bg-amber-400 opacity-25" // Golden amber
      if (sparkleColor === 2) return "bg-indigo-400 opacity-25" // Deep indigo
      if (sparkleColor === 3) return "bg-teal-400 opacity-25" // Ocean teal
      return "bg-pink-400 opacity-25" // Electric pink
    }
    
    return "bg-transparent"
  }
  
  // Gradient Descent Animation - Optimization path with vibrant heat map
  const getGradientDescentPattern = (step: number, i: number, gridCols: number, gridRows: number) => {
    const row = Math.floor(i / gridCols)
    const col = i % gridCols
    const centerRow = Math.floor(gridRows / 2)
    const centerCol = Math.floor(gridCols / 2)
    
    // Create a "loss landscape" with global minimum at center
    const distanceFromCenter = Math.abs(row - centerRow) + Math.abs(col - centerCol)
    const maxDistance = centerRow + centerCol
    
    // Animated "descent" towards center
    const descentProgress = (step % 80) / 80
    const currentRadius = (1 - descentProgress) * maxDistance
    
    // Vibrant heat map based on loss/distance
    if (Math.abs(distanceFromCenter - currentRadius) < 2) {
      return "bg-sky-400 opacity-85" // Bright sky blue for current optimization point
    } else if (distanceFromCenter > maxDistance * 0.7) {
      return "bg-rose-500 opacity-45" // Vibrant rose for high loss areas
    } else if (distanceFromCenter < maxDistance * 0.3) {
      return "bg-lime-500 opacity-55" // Electric lime for low loss areas
    } else {
      return "bg-orange-400 opacity-30" // Warm orange for medium loss areas
    }
  }
  
  // Attention Mechanism Animation - Vibrant focus patterns
  const getAttentionPattern = (step: number, i: number, gridCols: number, gridRows: number) => {
    const row = Math.floor(i / gridRows)
    const col = i % gridCols
    
    // Create multiple attention heads focusing on different areas with vibrant colors
    const attentionCycle = Math.floor(step / 30) % 4
    const intensity = Math.min((step % 30) / 30, 0.75)
    
    let focused = false
    let colorClass = ""
    
    switch (attentionCycle) {
      case 0: // Top-left attention (Vibrant rose)
        focused = row < gridRows / 2 && col < gridCols / 2
        colorClass = "bg-rose-500"
        break
      case 1: // Top-right attention (Electric emerald)
        focused = row < gridRows / 2 && col >= gridCols / 2
        colorClass = "bg-emerald-500"
        break
      case 2: // Bottom-left attention (Sapphire blue)
        focused = row >= gridRows / 2 && col < gridCols / 2
        colorClass = "bg-blue-600"
        break
      case 3: // Bottom-right attention (Vibrant purple)
        focused = row >= gridRows / 2 && col >= gridCols / 2
        colorClass = "bg-purple-600"
        break
    }
    
    if (focused) {
      const opacityLevel = Math.floor(intensity * 65 + 25)
      return `${colorClass} opacity-${opacityLevel}`
    }
    
    // Background vibrant noise
    if (Math.random() > 0.96) {
      const noiseColors = [
        "bg-rose-300", "bg-amber-300", "bg-emerald-300", 
        "bg-sky-300", "bg-violet-300", "bg-fuchsia-300",
        "bg-teal-300", "bg-indigo-300"
      ]
      const randomColor = noiseColors[Math.floor(Math.random() * noiseColors.length)]
      return `${randomColor} opacity-12`
    }
    
    return "bg-transparent"
  }
  
  const getAnimationPattern = (animationType: string, step: number, i: number, gridCols: number, gridRows: number) => {
    switch (animationType) {
      case "neural_network":
        return getNeuralNetworkPattern(step, i, gridCols, gridRows)
      case "gradient_descent":
        return getGradientDescentPattern(step, i, gridCols, gridRows)
      case "attention_mechanism":
        return getAttentionPattern(step, i, gridCols, gridRows)
      default:
        return "bg-transparent"
    }
  }
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
                  {/* ML/AI Themed Pixel Art Animations */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Animation Label */}
                    <div className="absolute top-1 left-1 text-xs font-mono text-accent bg-background/80 px-1">
                      {project.animationType === "neural_network" && "Neural Net"}
                      {project.animationType === "gradient_descent" && "Gradient Descent"}
                      {project.animationType === "attention_mechanism" && "Attention"}
                    </div>
                    
                    {/* Mobile: 6x4 grid for video aspect */}
                    <div className={`grid grid-cols-6 gap-0 w-full h-full sm:hidden ${
                      !mounted ? `project-${project.animationType.replace('_', '-')}` : ''
                    }`}>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square transition-all duration-500 ${
                            mounted 
                              ? getAnimationPattern(project.animationType, animationSteps[index] || 0, i, 6, 4)
                              : 'bg-accent opacity-15'
                          }`}
                          style={!mounted ? { 
                            '--wave-delay': i,
                            '--descent-delay': i,
                            '--attention-delay': i
                          } as React.CSSProperties : {}}
                        />
                      ))}
                    </div>
                    {/* Small screens: 8x5 grid */}
                    <div className={`hidden sm:grid md:hidden grid-cols-8 gap-0 w-full h-full ${
                      !mounted ? `project-${project.animationType.replace('_', '-')}` : ''
                    }`}>
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square transition-all duration-500 ${
                            mounted 
                              ? getAnimationPattern(project.animationType, animationSteps[index] || 0, i, 8, 5)
                              : 'bg-accent opacity-15'
                          }`}
                          style={!mounted ? { 
                            '--wave-delay': i,
                            '--descent-delay': i,
                            '--attention-delay': i
                          } as React.CSSProperties : {}}
                        />
                      ))}
                    </div>
                    {/* Medium and larger screens: 10x6 grid */}
                    <div className={`hidden md:grid grid-cols-10 gap-0 w-full h-full ${
                      !mounted ? `project-${project.animationType.replace('_', '-')}` : ''
                    }`}>
                      {Array.from({ length: 60 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square transition-all duration-500 ${
                            mounted 
                              ? getAnimationPattern(project.animationType, animationSteps[index] || 0, i, 10, 6)
                              : 'bg-accent opacity-15'
                          }`}
                          style={!mounted ? { 
                            '--wave-delay': i,
                            '--descent-delay': i,
                            '--attention-delay': i
                          } as React.CSSProperties : {}}
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
