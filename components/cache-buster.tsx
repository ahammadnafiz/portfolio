"use client"

import { useEffect } from 'react'

export function CacheBuster() {
  useEffect(() => {
    // Get current build info
    const currentBuildId = process.env.NEXT_PUBLIC_BUILD_ID
    const currentBuildTime = process.env.NEXT_PUBLIC_BUILD_TIME
    const storedBuildId = localStorage.getItem('portfolio_build_id')
    
    // Debug logging
    console.log('🔍 Cache Buster Status:');
    console.log('  Current Build ID:', currentBuildId || 'undefined');
    console.log('  Current Build Time:', currentBuildTime || 'undefined');
    console.log('  Stored Build ID:', storedBuildId || 'none');
    
    // Check if we have valid build info
    if (!currentBuildId) {
      console.warn('⚠️ No NEXT_PUBLIC_BUILD_ID found. Cache busting disabled.');
      return;
    }
    
    // Check for version changes
    if (storedBuildId && storedBuildId !== currentBuildId) {
      console.log('🔄 New version detected!');
      console.log('  Previous:', storedBuildId);
      console.log('  Current:', currentBuildId);
      
      // Clear localStorage but let service worker handle cache updates
      localStorage.clear()
      
      // Update service worker caches if available
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        console.log('📤 Notifying service worker of version change...');
        
        // Send message to service worker to clear caches
        navigator.serviceWorker.controller.postMessage({
          type: 'CLEAR_CACHE',
          version: currentBuildId,
          buildTime: currentBuildTime
        });
        
        console.log('✅ Service worker notified');
      } else {
        console.log('🔄 No service worker available, forcing reload...');
        // Fallback if no service worker
        window.location.reload();
      }
    } else if (!storedBuildId) {
      console.log('🆕 First visit or cleared storage');
    } else {
      console.log('✅ Version unchanged, no cache clearing needed');
    }
    
    // Store current build ID and time
    if (currentBuildId) {
      localStorage.setItem('portfolio_build_id', currentBuildId)
      if (currentBuildTime) {
        localStorage.setItem('portfolio_build_time', currentBuildTime)
      }
    }
  }, [])

  return null
}
