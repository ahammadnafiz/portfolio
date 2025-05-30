#!/bin/bash

# Script to update cache busting variables in .env.local
echo "🔄 Updating cache busting variables..."

# Generate new build ID with timestamp for uniqueness
BUILD_ID=$(git rev-parse --short HEAD 2>/dev/null || echo "manual")
TIMESTAMP=$(date +%s)
NEW_BUILD_ID="$BUILD_ID-$TIMESTAMP"
NEW_BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%S%z")

echo "📦 New Build ID: $NEW_BUILD_ID"
echo "⏰ New Build Time: $NEW_BUILD_TIME"

# Update .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_BUILD_ID=$NEW_BUILD_ID
NEXT_PUBLIC_BUILD_TIME=$NEW_BUILD_TIME
EOF

echo "✅ Updated .env.local file successfully!"
echo "💡 Restart your development server to pick up the new variables."
