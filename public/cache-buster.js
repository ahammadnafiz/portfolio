// Cache Busting Script - Forces browser to reload when new version is detected
(function() {
    'use strict';
    
    // Get build info from meta tags
    const versionMeta = document.querySelector('meta[name="version"]');
    const buildTimeMeta = document.querySelector('meta[name="build-time"]');
    
    if (!versionMeta) return;
    
    const currentVersion = versionMeta.content;
    const buildTime = buildTimeMeta ? buildTimeMeta.content : '';
    
    // Check stored version
    const storedVersion = localStorage.getItem('portfolio_version');
    const storedTime = localStorage.getItem('portfolio_build_time');
    
    // If version changed, clear everything and reload
    if (storedVersion && storedVersion !== currentVersion) {
        console.log('🔄 New version detected, clearing cache...');
        
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear service worker caches if available
        if ('caches' in window) {
            caches.keys().then(function(names) {
                names.forEach(function(name) {
                    caches.delete(name);
                });
            });
        }
        
        // Clear browser cache by appending timestamp to URL
        const url = new URL(window.location);
        url.searchParams.set('cb', Date.now());
        
        // Force reload with cache bypass
        window.location.replace(url.toString());
        return;
    }
    
    // Store current version
    localStorage.setItem('portfolio_version', currentVersion);
    if (buildTime) {
        localStorage.setItem('portfolio_build_time', buildTime);
    }
    
    // Add version info to console for debugging
    console.log('📦 Portfolio Version:', currentVersion);
    if (buildTime) {
        console.log('📅 Build Time:', buildTime);
    }
})();
