"use client"

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_CLEARED') {
          console.log('SW: Cache cleared for version:', event.data.version);
          // Reload to get fresh content
          window.location.reload();
        }
      });

      // Register service worker
      navigator.serviceWorker
        .register('/portfolio/sw.js', { scope: '/portfolio/' })
        .then((registration) => {
          console.log('SW: Service Worker registered successfully:', registration);
          
          // Check for updates immediately
          registration.update();
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available
                    console.log('SW: New content available, activating...');
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                  } else {
                    // Content is cached for offline use
                    console.log('SW: Content cached for offline use');
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW: Service Worker registration failed:', error);
        });

      // Listen for controller change (new SW taking over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('SW: Controller changed, reloading page');
        window.location.reload();
      });

      // Check if there's a waiting SW and activate it
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
  }, []);

  return null;
}
