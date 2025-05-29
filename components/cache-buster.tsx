"use client"

import { useEffect } from 'react'

export function CacheBuster() {
  useEffect(() => {
    // Force reload if build version has changed
    const currentBuildId = process.env.NEXT_PUBLIC_BUILD_ID
    const storedBuildId = localStorage.getItem('portfolio_build_id')
    
    if (storedBuildId && storedBuildId !== currentBuildId) {
      // Clear all caches and reload
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name)
          })
        })
      }
      
      // Clear localStorage
      localStorage.clear()
      
      // Force hard reload
      window.location.reload()
    }
    
    // Store current build ID
    if (currentBuildId) {
      localStorage.setItem('portfolio_build_id', currentBuildId)
    }
  }, [])

  return null
}
