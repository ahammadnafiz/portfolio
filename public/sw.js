// Service Worker for Network-First Strategy
const CACHE_NAME = 'portfolio-cache-v1';
const RUNTIME_CACHE = 'portfolio-runtime-v1';

// Install event - skip waiting and clean old caches
self.addEventListener('install', event => {
  console.log('SW: Installing new service worker');
  self.skipWaiting();
});

// Activate event - claim clients and clean old caches
self.addEventListener('activate', event => {
  console.log('SW: Activating new service worker');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('SW: Clearing caches for new version:', event.data.version);
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('SW: Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Notify all clients to reload
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_CLEARED', version: event.data.version });
          });
        });
      })
    );
  }
});

// Network-first strategy for all requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    networkFirst(request)
  );
});

// Network-first strategy implementation
async function networkFirst(request) {
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate';
  const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/);
  
  try {
    // Always try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(isStaticAsset ? CACHE_NAME : RUNTIME_CACHE);
      // Clone response before caching (response can only be consumed once)
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache for:', request.url);
    
    // Try to get from cache if network fails
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // For navigation requests, return offline page or basic HTML
    if (isNavigation) {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Offline - Ahammad Nafiz</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, sans-serif; text-align: center; padding: 50px; }
              .offline { color: #666; }
            </style>
          </head>
          <body>
            <h1>You're offline</h1>
            <p class="offline">Please check your internet connection and try again.</p>
            <button onclick="window.location.reload()">Try Again</button>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
    
    // For other requests, throw the error
    throw error;
  }
}
