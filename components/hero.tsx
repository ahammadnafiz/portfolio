"use client"

import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20">
      {/* ML/Math Background Equations - Floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Row - Distributed */}
        <div className="absolute top-16 left-8 text-accent/6 font-mono text-sm transform -rotate-12 hidden md:block animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}>
          θ = θ - α∇J(θ)
        </div>
        
        <div className="absolute top-24 left-1/3 text-accent/5 font-mono text-xs transform rotate-15 hidden lg:block animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}>
          f(x) = σ(W·x + b)
        </div>
        
        <div className="absolute top-20 right-1/4 text-accent/7 font-mono text-xs transform -rotate-8 hidden lg:block animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }}>
          ∂L/∂w = ∂L/∂y · ∂y/∂w
        </div>
        
        <div className="absolute top-28 right-12 text-accent/6 font-mono text-sm transform rotate-6 hidden md:block animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }}>
          L = -∑(y·log(ŷ))
        </div>
        
        {/* Upper Middle Row */}
        <div className="absolute top-1/3 left-16 text-accent/8 font-mono text-xs transform rotate-20 hidden lg:block animate-float" style={{ animationDelay: '1.5s', animationDuration: '6.5s' }}>
          y = mx + b + ε
        </div>
        
        <div className="absolute top-1/3 left-2/3 text-accent/5 font-mono text-xs transform -rotate-25 hidden xl:block animate-float" style={{ animationDelay: '4s', animationDuration: '7.5s' }}>
          P(A|B) = P(B|A)·P(A)/P(B)
        </div>
        
        <div className="absolute top-1/3 right-8 text-accent/9 font-mono text-xs transform rotate-10 hidden lg:block animate-float" style={{ animationDelay: '2.5s', animationDuration: '8s' }}>
          ∇²f = ∂²f/∂x² + ∂²f/∂y²
        </div>
        
        {/* Center Row - Balanced Distribution */}
        <div className="absolute top-1/2 left-6 text-accent/7 font-mono text-xs transform -rotate-15 hidden lg:block animate-float" style={{ animationDelay: '3.5s', animationDuration: '6s' }}>
          E[X] = ∑x·P(x)
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-accent/4 font-mono text-xs rotate-0 hidden xl:block animate-float" style={{ animationDelay: '5s', animationDuration: '9s' }}>
          σ(z) = 1/(1+e^(-z))
        </div>
        
        <div className="absolute top-1/2 right-6 text-accent/8 font-mono text-xs transform rotate-18 hidden lg:block animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }}>
          Var(X) = E[X²] - (E[X])²
        </div>
        
        {/* Lower Middle Row */}
        <div className="absolute top-2/3 left-1/4 text-accent/6 font-mono text-xs transform rotate-12 hidden xl:block animate-float" style={{ animationDelay: '0.5s', animationDuration: '8.5s' }}>
          ||x||₂ = √(∑xᵢ²)
        </div>
        
        <div className="absolute top-2/3 right-1/3 text-accent/7 font-mono text-xs transform -rotate-20 hidden xl:block animate-float" style={{ animationDelay: '6s', animationDuration: '6.5s' }}>
          KL(P||Q) = ∑P(x)log(P(x)/Q(x))
        </div>
        
        <div className="absolute top-2/3 right-16 text-accent/5 font-mono text-xs transform rotate-8 hidden lg:block animate-float" style={{ animationDelay: '4.5s', animationDuration: '8.5s' }}>
          J = ½∑(hθ(x) - y)²
        </div>
        
        {/* Bottom Row */}
        <div className="absolute bottom-32 left-12 text-accent/8 font-mono text-xs transform -rotate-10 hidden md:block animate-float" style={{ animationDelay: '2s', animationDuration: '7.5s' }}>
          A = UΣV^T
        </div>
        
        <div className="absolute bottom-24 left-1/3 text-accent/6 font-mono text-xs transform rotate-25 hidden lg:block animate-float" style={{ animationDelay: '7s', animationDuration: '9.5s' }}>
          ∂J/∂θⱼ = (1/m)∑(hθ(x^(i)) - y^(i))x_j^(i)
        </div>
        
        <div className="absolute bottom-28 right-1/4 text-accent/7 font-mono text-xs transform -rotate-18 hidden lg:block animate-float" style={{ animationDelay: '5.5s', animationDuration: '8s' }}>
          H(X) = -∑P(x)log₂P(x)
        </div>
        
        <div className="absolute bottom-20 right-8 text-accent/9 font-mono text-xs transform rotate-14 hidden md:block animate-float" style={{ animationDelay: '3s', animationDuration: '6.5s' }}>
          ∇f(x) = lim[h→0](f(x+h)-f(x))/h
        </div>
        
        {/* Additional Scattered Equations for Balance */}
        <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 text-accent/4 font-mono text-xs transform rotate-30 hidden 2xl:block animate-float" style={{ animationDelay: '6.5s', animationDuration: '7s' }}>
          ReLU(x) = max(0,x)
        </div>
        
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 text-accent/5 font-mono text-xs transform -rotate-12 hidden 2xl:block animate-float" style={{ animationDelay: '8s', animationDuration: '8.5s' }}>
          Attention(Q,K,V) = softmax(QK^T/√d_k)V
        </div>
        
        <div className="absolute top-3/5 left-1/5 text-accent/6 font-mono text-xs transform rotate-22 hidden 2xl:block animate-float" style={{ animationDelay: '9s', animationDuration: '7.5s' }}>
          MSE = (1/n)∑(yᵢ - ŷᵢ)²
        </div>
        
        <div className="absolute top-3/5 right-1/5 text-accent/5 font-mono text-xs transform -rotate-16 hidden 2xl:block animate-float" style={{ animationDelay: '10s', animationDuration: '9s' }}>
          Adam: m = β₁m + (1-β₁)g
        </div>
      </div>
      
      {/* Center content container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Left decorative element */}
        <div className="hidden lg:flex absolute -left-16 xl:-left-20 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-accent animate-pulse opacity-30"></div>
        </div>
        
        {/* Right decorative element */}
        <div className="hidden lg:flex absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent opacity-20 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-8">
          {/* Profile Image - Top */}
          <div
            className={`transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              {/* Main image container with round frame */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                {/* Glowing background effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-xl"></div>
                
                {/* Pixel art decorative border */}
                <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-pulse"></div>
                
                {/* Inner border with accent color */}
                <div className="absolute inset-2 rounded-full border-2 border-accent"></div>
                
                {/* Image container */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-background to-muted">
                  <img
                    src={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/psyco-v1.png`}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => console.error('Image failed to load:', e)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                  
                  {/* Overlay blend effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 mix-blend-overlay"></div>
                </div>

                {/* Floating pixel decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-accent animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -top-2 -right-2 w-3 h-3 border-2 border-accent animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border-2 border-accent animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Name and Text Content - Below Profile */}
          <div
            className={`transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 tracking-tight">
              <span className="text-accent">A</span>hammad <span className="text-accent">N</span>afiz
            </h1>
            
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-2 bg-accent mx-auto mb-8"></div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-muted-foreground mb-8 leading-relaxed uppercase max-w-2xl">
              ML Researcher | Python Developer
              <br />
              <span className="text-accent">Building AI Skills Through Code, Research, and Community</span>
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 sm:space-x-8 mb-8">
              <a
                href="https://github.com/ahammadnafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/in/ahammad-nafiz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a
                href="https://x.com/ahammadnafi_z"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>

            {/* Pixel art geometric decoration */}
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-12">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-accent"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-accent"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-accent"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="pixel-button uppercase text-sm sm:text-base"
              >
                View Work
              </button>
              
              <a
                href={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/Nafiz CV Updated.pdf`}
                download="Nafiz_CV_Updated.pdf"
                className="pixel-button uppercase text-sm sm:text-base"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
