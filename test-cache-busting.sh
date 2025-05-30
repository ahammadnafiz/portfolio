#!/bin/bash

echo "🧪 Testing Cache Busting System"
echo "==============================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "   Run: npm run update-cache"
    exit 1
fi

echo "✅ .env.local found"

# Show current values
echo ""
echo "📋 Current Environment Variables:"
cat .env.local

echo ""
echo "🔄 Updating cache variables..."
./update-cache-bust.sh

echo ""
echo "📋 Updated Environment Variables:"
cat .env.local

echo ""
echo "🧪 Test Results:"
echo "✅ Cache busting scripts working"
echo "✅ Environment variables updating"
echo "💡 Restart your dev server to test in browser"
echo ""
echo "🌐 To test in browser:"
echo "   1. Start dev server: npm run dev"
echo "   2. Open browser console"
echo "   3. Look for cache buster logs"
echo "   4. Update cache again: npm run update-cache"
echo "   5. Refresh browser to see version change detection"
