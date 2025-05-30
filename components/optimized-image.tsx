import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 90,
  placeholder = "empty",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted text-muted-foreground text-sm ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        Image not available
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        {...props}
      />
      
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          aria-label="Loading image"
        />
      )}
    </div>
  )
}
