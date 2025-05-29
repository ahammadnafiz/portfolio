"use client"

import { useEffect } from 'react'

export function CacheBuster() {
  useEffect(() => {
    // Check for version changes but let service worker handle the caching
    const currentBuildId = process.env.NEXT_PUBLIC_BUILD_ID
    const storedBuildId = localStorage.getItem('portfolio_build_id')
    
    if (storedBuildId && storedBuildId !== currentBuildId) {
      console.log('🔄 New version detected:', currentBuildId);
      
      // Clear localStorage but let service worker handle cache updates
      localStorage.clear()
      
      // Update service worker caches if available
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Send message to service worker to clear caches
        navigator.serviceWorker.controller.postMessage({
          type: 'CLEAR_CACHE',
          version: currentBuildId
        });
        
        // The service worker will handle the reload after clearing caches
        console.log('SW: Notified service worker of version change');
      } else {
        // Fallback if no service worker
        window.location.reload();
      }
    }
    
    // Store current build ID
    if (currentBuildId) {
      localStorage.setItem('portfolio_build_id', currentBuildId)
    }
  }, [])

  return null
}
