#!/usr/bin/env node

import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 4321;
const DIST_DIR = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(DIST_DIR, filePath);
  
  // Handle directory requests
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  
  const ext = extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath);
      
      // Add security headers
      res.setHeader('Content-Type', contentType);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Cache headers for static assets
      if (ext === '.css' || ext === '.js' || ext.includes('image') || ext.includes('font')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      
      res.writeHead(200);
      res.end(content);
    } else {
      // Serve 404 page or fallback to index.html for SPA routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      if (existsSync(indexPath)) {
        const indexContent = readFileSync(indexPath);
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(indexContent);
      } else {
        res.writeHead(404);
        res.end('404 - File not found');
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end('500 - Internal server error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 **MARKOSH OPTIMIZED SITE IS LIVE!**\n');
  console.log('📍 **Access URLs:**');
  console.log(`   • Local:    http://localhost:${PORT}`);
  console.log(`   • Network:  http://0.0.0.0:${PORT}`);
  console.log('\n🔍 **TESTING CHECKLIST:**');
  console.log('✅ Homepage loads without errors');
  console.log('✅ All images display in WebP format');
  console.log('✅ Fonts load smoothly with fallbacks');
  console.log('✅ Navigation works correctly');
  console.log('✅ Contact form validates properly');
  console.log('✅ Mobile responsive design');
  console.log('✅ Performance metrics in DevTools');
  console.log('✅ Accessibility with screen readers');
  console.log('\n🎯 **PERFORMANCE TESTING:**');
  console.log('• Open DevTools → Network tab');
  console.log('• Check Lighthouse performance score');
  console.log('• Verify WebP images are loading');
  console.log('• Test form validation and submission');
  console.log('\n⏹️  Press Ctrl+C to stop the server');
  console.log('────────────────────────────────────────');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server stopped successfully.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated.');
  server.close();
  process.exit(0);
});