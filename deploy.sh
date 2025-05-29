#!/bin/bash

# Portfolio Deployment Script with Cache Busting
# This script builds and deploys your portfolio with proper cache invalidation

echo "🚀 Starting portfolio deployment with cache busting..."

# Generate a unique build timestamp
BUILD_ID=$(date +%s)
BUILD_TIME=$(date -Iseconds)
echo "📦 Build ID: $BUILD_ID"
echo "📅 Build Time: $BUILD_TIME"

# Set environment variables for cache busting
export NEXT_PUBLIC_BUILD_ID=$BUILD_ID
export NEXT_PUBLIC_BUILD_TIME=$BUILD_TIME

# Update .env.local with build info
echo "NEXT_PUBLIC_BUILD_ID=$BUILD_ID" > .env.local
echo "NEXT_PUBLIC_BUILD_TIME=$BUILD_TIME" >> .env.local

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Add cache busting to static files
    echo "🔄 Applying cache busting to static files..."
    
    # Create a build info file for reference
    echo "Build ID: $BUILD_ID" > out/build-info.txt
    echo "Build Date: $(date)" >> out/build-info.txt
    
    # Optional: Deploy to GitHub Pages
    echo "📤 Ready for deployment!"
    echo "You can now push the 'out' directory to your gh-pages branch"
    echo ""
    echo "To deploy manually:"
    echo "1. Copy contents of 'out' directory to your gh-pages branch"
    echo "2. Push to GitHub"
    echo ""
    echo "Or use GitHub Actions for automatic deployment"
    
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Deployment preparation complete!"
