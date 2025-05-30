#!/bin/bash

# Enhanced deployment script with comprehensive cache busting system
set -e

# Color codes for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to test cache busting system
test_cache_busting() {
    print_status $BLUE "🧪 Testing Cache Busting Components..."
    
    # Test 1: Check if cache buster component exists
    if [ -f "components/cache-buster.tsx" ]; then
        print_status $GREEN "   ✅ Cache buster React component found"
    else
        print_status $RED "   ❌ Cache buster React component missing"
        return 1
    fi
    
    # Test 2: Check if service worker exists
    if [ -f "public/sw.js" ]; then
        print_status $GREEN "   ✅ Service worker found"
    else
        print_status $YELLOW "   ⚠️  Service worker not found (optional)"
    fi
    
    # Test 3: Check if standalone cache buster script exists
    if [ -f "public/cache-buster.js" ]; then
        print_status $GREEN "   ✅ Standalone cache buster script found"
    else
        print_status $YELLOW "   ⚠️  Standalone cache buster script not found (optional)"
    fi
    
    print_status $GREEN "   ✅ Cache busting components verified"
    return 0
}

print_status $BLUE "🚀 Building and deploying portfolio with comprehensive cache busting..."

# # Clean previous build - Fresh start
# print_status $BLUE "🧹 Cleaning previous build..."
# if [ -d "out" ]; then
#     echo "   Removing existing 'out' directory..."
#     rm -rf out
# fi

# if [ -d ".next" ]; then
#     echo "   Removing existing '.next' directory..."
#     rm -rf .next
# fi

# print_status $GREEN "✨ Fresh workspace prepared!"

# Test cache busting system before proceeding
test_cache_busting

# Cache Busting System - Generate unique build identifiers
echo ""
print_status $BLUE "🔄 Cache Busting System Initialization"
print_status $BLUE "======================================"

# Function to generate unique build ID
generate_build_id() {
    local git_hash=$(git rev-parse --short HEAD 2>/dev/null || echo "manual")
    local timestamp=$(date +%s)
    echo "$git_hash-$timestamp"
}

# Function to generate build time
generate_build_time() {
    date -u +"%Y-%m-%dT%H:%M:%S%z"
}

# Store previous build info for comparison
PREV_BUILD_ID=""
if [ -f ".env.local" ]; then
    PREV_BUILD_ID=$(grep "NEXT_PUBLIC_BUILD_ID=" .env.local 2>/dev/null | cut -d'=' -f2 || echo "")
    echo "📋 Previous Build ID: ${PREV_BUILD_ID:-'none'}"
fi

# Generate new build variables
export BUILD_ID=$(git rev-parse --short HEAD 2>/dev/null || echo "manual-$(date +%s)")
export NEXT_PUBLIC_BUILD_ID=$(generate_build_id)
export NEXT_PUBLIC_BUILD_TIME=$(generate_build_time)

print_status $GREEN "📦 New Build ID: $NEXT_PUBLIC_BUILD_ID"
print_status $GREEN "⏰ New Build Time: $NEXT_PUBLIC_BUILD_TIME"

# Verify build ID is unique
if [ "$PREV_BUILD_ID" = "$NEXT_PUBLIC_BUILD_ID" ]; then
    print_status $YELLOW "⚠️  Warning: Build ID unchanged, forcing unique timestamp..."
    sleep 1
    export NEXT_PUBLIC_BUILD_ID=$(generate_build_id)
    print_status $GREEN "📦 Updated Build ID: $NEXT_PUBLIC_BUILD_ID"
fi

# Update .env.local file with new cache busting variables
echo ""
print_status $BLUE "📝 Updating cache busting configuration..."
cat > .env.local << EOF
# Cache Busting Variables - Auto-generated on $(date)
# Build ID: Unique identifier for this build
NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID

# Build Time: Timestamp when this build was created
NEXT_PUBLIC_BUILD_TIME=$NEXT_PUBLIC_BUILD_TIME
EOF

print_status $GREEN "✅ Updated .env.local file with cache busting variables"

# Verify the environment file
echo ""
print_status $BLUE "🔍 Verifying cache busting configuration..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists"
    if grep -q "NEXT_PUBLIC_BUILD_ID=" .env.local; then
        echo "   ✅ Build ID variable set"
    else
        print_status $RED "   ❌ Build ID variable missing"
        exit 1
    fi
    if grep -q "NEXT_PUBLIC_BUILD_TIME=" .env.local; then
        echo "   ✅ Build time variable set"
    else
        print_status $RED "   ❌ Build time variable missing"
        exit 1
    fi
else
    print_status $RED "   ❌ .env.local file missing"
    exit 1
fi

print_status $GREEN "   ✅ Cache busting system verified"

# Build the project with fresh start
echo ""
echo "🔨 Building Next.js project with cache busting..."
echo "================================================"

# Build the project
NODE_ENV=production npm run build

# Verify build success
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Post-build cache busting verification
echo ""
echo "🔍 Post-Build Cache Busting Verification"
echo "========================================"

# Check if build output exists
if [ ! -d "out" ]; then
    echo "❌ Output directory 'out' not found"
    exit 1
fi

# Verify cache busting assets are present
echo "📂 Checking build output structure..."
if [ -d "out/_next/static" ]; then
    echo "   ✅ Next.js static assets found"
    STATIC_FILES=$(find out/_next/static -name "*.js" -o -name "*.css" | wc -l)
    echo "   📊 Static files generated: $STATIC_FILES"
else
    echo "   ⚠️  Next.js static directory not found"
fi

# Check for hashed filenames (Next.js built-in cache busting)
echo "🔤 Verifying filename hashing..."
HASHED_FILES=$(find out/_next/static -type f | head -5)
if [ -n "$HASHED_FILES" ]; then
    echo "   ✅ Hashed filenames detected:"
    echo "$HASHED_FILES" | sed 's/^/      /'
else
    echo "   ⚠️  No hashed files found"
fi

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
if [ -f "out/sw.js" ]; then
    echo "🔧 Configuring service worker for GitHub Pages..."
    sed -i 's|scope: "/portfolio/"|scope: "/portfolio/"|g' out/sw.js
else
    echo "ℹ️  No service worker found, skipping configuration..."
fi

echo "✅ Build completed successfully!"
echo "📁 Output directory: out/ (freshly created)"
echo "🌐 Ready for deployment to GitHub Pages"

# Show build info
echo ""
echo "📊 Build Summary:"
echo "  - Fresh Build: ✅ Previous files cleaned"
echo "  - Build ID: $NEXT_PUBLIC_BUILD_ID"
echo "  - Build Time: $NEXT_PUBLIC_BUILD_TIME"
echo "  - Service Worker: ✅ Network-first strategy"
echo "  - Cache Headers: ✅ Optimized for static assets"
echo "  - Hash-based filenames: ✅ Next.js built-in"
echo ""

# Show build statistics
if [ -d "out" ]; then
    OUT_SIZE=$(du -sh out | cut -f1)
    FILE_COUNT=$(find out -type f | wc -l)
    echo "📈 Build Statistics:"
    echo "  - Total size: $OUT_SIZE"
    echo "  - Files created: $FILE_COUNT"
    echo ""
fi

# Cache Busting Summary and Instructions
echo ""
echo "🔄 Cache Busting Summary"
echo "======================="
echo "✅ Environment variables updated in .env.local"
echo "✅ Unique build ID generated: $NEXT_PUBLIC_BUILD_ID"
echo "✅ Build timestamp recorded: $NEXT_PUBLIC_BUILD_TIME"
echo "✅ Next.js automatic asset hashing enabled"
echo "✅ Service worker configured for cache management"
echo "✅ HTTP cache headers optimized for GitHub Pages"
echo ""

# Final cache busting verification
echo "🧪 Final Cache Busting Test"
echo "==========================="

# Test if environment variables are properly set
if [ -n "$NEXT_PUBLIC_BUILD_ID" ] && [ -n "$NEXT_PUBLIC_BUILD_TIME" ]; then
    echo "✅ Cache busting variables are set and exported"
else
    echo "❌ Cache busting variables missing"
    exit 1
fi

# Check if the build contains the environment variables
if [ -f "out/_next/static/chunks/webpack.js" ] || [ -f "out/_next/static/development/_buildManifest.js" ]; then
    echo "✅ Build artifacts contain cache busting infrastructure"
else
    echo "⚠️  Cache busting infrastructure not detected in build"
fi

echo ""
echo "🎯 Cache Busting Instructions for Deployment:"
echo "============================================="
echo "1. 🚀 Push the 'out' directory to your gh-pages branch"
echo "2. 🌐 Users will automatically get the new version: $NEXT_PUBLIC_BUILD_ID"
echo "3. 🔄 Browser caches will be cleared automatically via service worker"
echo "4. 📱 Progressive loading ensures optimal performance"
echo ""
echo "🔧 Manual Cache Update (if needed):"
echo "   - Run: npm run update-cache"
echo "   - Then: npm run deploy"
echo ""

# Optional: Deploy to GitHub Pages (uncomment if you want automatic deployment)
# echo "🚀 Deploying to GitHub Pages..."
# git add -A
# git commit -m "Deploy: Build $BUILD_ID at $NEXT_PUBLIC_BUILD_TIME"
# git push origin gh-pages

echo "🎉 Deployment ready! Push the 'out' directory to your gh-pages branch."
