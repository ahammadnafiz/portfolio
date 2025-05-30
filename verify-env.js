#!/usr/bin/env node

// Quick test to verify environment variables are accessible
console.log('🔍 Environment Variables Test');
console.log('============================');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local not found');
    process.exit(1);
}

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

console.log('📋 Variables in .env.local:');
lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        console.log(`  ${key}: ${value}`);
    }
});

console.log('\n🌐 Variables accessible to Next.js:');
lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && key.startsWith('NEXT_PUBLIC_')) {
        const envValue = process.env[key] || 'undefined';
        console.log(`  ${key}: ${envValue} ${envValue !== 'undefined' ? '✅' : '❌'}`);
    }
});

console.log('\n💡 Note: In development, restart the Next.js server to pick up .env.local changes');
console.log('🚀 To test: npm run dev');
