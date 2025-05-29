#!/bin/bash

# Enhanced deployment script with proper cache headers for GitHub Pages
set -e

echo "🚀 Building and deploying portfolio with optimized caching..."

# Set build environment variables
export BUILD_ID=$(git rev-parse --short HEAD 2>/dev/null || echo "manual-$(date +%s)")
export NEXT_PUBLIC_BUILD_ID=$BUILD_ID
export NEXT_PUBLIC_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "📦 Build ID: $BUILD_ID"
echo "⏰ Build Time: $NEXT_PUBLIC_BUILD_TIME"

# Build the project
echo "🔨 Building Next.js project..."
npm run build

# Create .nojekyll file to prevent GitHub Pages from ignoring files starting with _
echo "📝 Creating .nojekyll file..."
touch out/.nojekyll

# Create custom headers file for GitHub Pages (if using a custom domain)
cat > out/_headers << 'EOF'
# Cache control for static assets
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Cache control for images and other assets
*.js
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.css
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.png
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.jpg
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.jpeg
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.gif
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.svg
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.webp
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.ico
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
*.woff
  Cache-Control: public, max-age=31536000, immutable
*.woff2
  Cache-Control: public, max-age=31536000, immutable
*.ttf
  Cache-Control: public, max-age=31536000, immutable
*.eot
  Cache-Control: public, max-age=31536000, immutable

# No cache for HTML files
*.html
  Cache-Control: no-cache, max-age=0, must-revalidate

# No cache for service worker
/sw.js
  Cache-Control: no-cache, max-age=0, must-revalidate
  Service-Worker-Allowed: /
EOF

# Create robots.txt
cat > out/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://yourusername.github.io/portfolio/sitemap.xml
EOF

# Update service worker with correct scope for GitHub Pages
sed -i 's|scope: "/portfolio/"|scope: "/portfolio/"|g' out/sw.js

echo "✅ Build completed successfully!"
echo "📁 Output directory: out/"
echo "🌐 Ready for deployment to GitHub Pages"

# Show build info
echo ""
echo "📊 Build Summary:"
echo "  - Build ID: $BUILD_ID"
echo "  - Build Time: $NEXT_PUBLIC_BUILD_TIME"
echo "  - Service Worker: ✅ Network-first strategy"
echo "  - Cache Headers: ✅ Optimized for static assets"
echo "  - Hash-based filenames: ✅ Next.js built-in"
echo ""

# Optional: Deploy to GitHub Pages (uncomment if you want automatic deployment)
# echo "🚀 Deploying to GitHub Pages..."
# git add -A
# git commit -m "Deploy: Build $BUILD_ID at $NEXT_PUBLIC_BUILD_TIME"
# git push origin gh-pages

echo "🎉 Deployment ready! Push the 'out' directory to your gh-pages branch."
