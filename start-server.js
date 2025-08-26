#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Markosh Optimized Site Preview Server...\n');

const astroPath = path.join(__dirname, 'node_modules', 'astro', 'dist', 'cli', 'index.js');
const serverProcess = spawn('node', [astroPath, 'preview', '--host', '0.0.0.0'], {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('🌐 Server starting...');
console.log('📍 Once running, access your site at:');
console.log('   • Local:   http://localhost:4321');
console.log('   • Network: http://0.0.0.0:4321');
console.log('\n🔍 **TESTING CHECKLIST:**');
console.log('✅ Page loads without errors');
console.log('✅ Images load in WebP format');
console.log('✅ Fonts load smoothly');
console.log('✅ Contact form works');
console.log('✅ Mobile responsiveness');
console.log('✅ Performance in DevTools');
console.log('\n⏹️  Press Ctrl+C to stop the server\n');

serverProcess.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`\n🛑 Server stopped with exit code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping server...');
  serverProcess.kill('SIGTERM');
});