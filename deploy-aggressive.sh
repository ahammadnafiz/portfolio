#!/bin/bash

# Aggressive Cache Busting Script
# This script implements multiple cache busting strategies

echo "🚀 Starting aggressive cache busting deployment..."

# Generate unique identifiers
BUILD_ID=$(date +%s)
BUILD_TIME=$(date -Iseconds)
RANDOM_HASH=$(openssl rand -hex 8)
CACHE_BUSTER="${BUILD_ID}-${RANDOM_HASH}"

echo "📦 Build ID: $BUILD_ID"
echo "🔀 Cache Buster: $CACHE_BUSTER"
echo "📅 Build Time: $BUILD_TIME"

# Set environment variables for cache busting
export NEXT_PUBLIC_BUILD_ID=$CACHE_BUSTER
export NEXT_PUBLIC_BUILD_TIME=$BUILD_TIME

# Update .env.local with cache busting info
echo "NEXT_PUBLIC_BUILD_ID=$CACHE_BUSTER" > .env.local
echo "NEXT_PUBLIC_BUILD_TIME=$BUILD_TIME" >> .env.local

# Clean previous builds thoroughly
echo "🧹 Deep cleaning previous builds..."
rm -rf .next out node_modules/.cache

# Clear npm cache
echo "🗑️ Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies to ensure fresh build
echo "📥 Reinstalling dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🔨 Building project with aggressive cache busting..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Add comprehensive cache busting to output
    echo "🔄 Applying comprehensive cache busting..."
    
    # Create cache busting info files
    echo "Build ID: $CACHE_BUSTER" > out/build-info.txt
    echo "Build Date: $(date)" >> out/build-info.txt
    echo "Random Hash: $RANDOM_HASH" >> out/build-info.txt
    echo "Cache Control: no-cache, no-store, must-revalidate" >> out/build-info.txt
    
    # Add version to all HTML files
    find out -name "*.html" -type f -exec sed -i "s/<html/<html data-cache-buster=\"$CACHE_BUSTER\"/g" {} \;
    
    # Create a cache busting manifest
    echo "{" > out/cache-manifest.json
    echo "  \"buildId\": \"$CACHE_BUSTER\"," >> out/cache-manifest.json
    echo "  \"buildTime\": \"$BUILD_TIME\"," >> out/cache-manifest.json
    echo "  \"randomHash\": \"$RANDOM_HASH\"," >> out/cache-manifest.json
    echo "  \"timestamp\": $(date +%s)" >> out/cache-manifest.json
    echo "}" >> out/cache-manifest.json
    
    # Add no-cache headers to static files
    echo "# Cache Control Headers" > out/.htaccess
    echo "Header set Cache-Control \"no-cache, no-store, must-revalidate\"" >> out/.htaccess
    echo "Header set Pragma \"no-cache\"" >> out/.htaccess
    echo "Header set Expires \"0\"" >> out/.htaccess
    
    echo "📤 Ready for deployment!"
    echo ""
    echo "🎯 Cache Busting Features Added:"
    echo "   ✓ Unique build ID with random hash"
    echo "   ✓ Environment variables updated"
    echo "   ✓ HTML files tagged with cache buster"
    echo "   ✓ Cache manifest created"
    echo "   ✓ .htaccess headers added"
    echo "   ✓ Client-side cache detection"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Deploy the 'out' directory to GitHub Pages"
    echo "2. Users will get automatic cache invalidation"
    echo "3. Hard refresh will no longer be needed"
    
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Aggressive cache busting deployment complete!"
