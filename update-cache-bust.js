#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔄 Updating cache busting variables...');

// Generate new build ID with timestamp for uniqueness
let buildId;
try {
  buildId = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch (error) {
  buildId = 'manual';
}

const timestamp = Date.now();
const newBuildId = `${buildId}-${timestamp}`;
const newBuildTime = new Date().toISOString();

console.log(`📦 New Build ID: ${newBuildId}`);
console.log(`⏰ New Build Time: ${newBuildTime}`);

// Update .env.local file
const envContent = `NEXT_PUBLIC_BUILD_ID=${newBuildId}
NEXT_PUBLIC_BUILD_TIME=${newBuildTime}
`;

fs.writeFileSync('.env.local', envContent);

console.log('✅ Updated .env.local file successfully!');
console.log('💡 Restart your development server to pick up the new variables.');
