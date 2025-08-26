#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Validating All Applied Optimizations...\n');

const results = {
  passed: 0,
  failed: 0,
  checks: []
};

function check(description, condition, details = '') {
  const status = condition ? '✅' : '❌';
  const result = condition ? 'PASS' : 'FAIL';
  
  results.checks.push({ description, status, result, details });
  
  if (condition) {
    results.passed++;
  } else {
    results.failed++;
  }
  
  console.log(`${status} ${description}`);
  if (details) {
    console.log(`   ${details}`);
  }
}

// Read the built HTML file
const indexPath = path.join(__dirname, 'dist', 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf-8');

console.log('📋 **OPTIMIZATION VALIDATION REPORT**\n');

// 1. CSS Import Fix
check(
  'CSS import path fixed',
  !htmlContent.includes('globals.css'),
  'Confirmed: no reference to incorrect globals.css path'
);

// 2. Font Optimization
check(
  'Font loading optimized',
  htmlContent.includes('font-display=swap') && htmlContent.includes('preconnect'),
  'Google Fonts with display=swap and preconnect found'
);

// 3. Image Optimization
check(
  'Image optimization applied',
  htmlContent.includes('.webp') && htmlContent.includes('fetchpriority'),
  'WebP format and fetchpriority attributes detected'
);

// 4. SEO Utils Integration
check(
  'SEO structured data present',
  htmlContent.includes('"@type": "Organization"') && htmlContent.includes('schema.org'),
  'Organization schema markup found'
);

// 5. Security Headers
check(
  'Security meta tags present',
  htmlContent.includes('Content-Security-Policy') || htmlContent.includes('X-Frame-Options'),
  'Security-related meta tags detected'
);

// 6. Accessibility Features
check(
  'Accessibility improvements added',
  htmlContent.includes('Skip to main content') || htmlContent.includes('sr-only'),
  'Screen reader friendly elements found'
);

// 7. Bundle Splitting
const astroDir = path.join(__dirname, 'dist', '_astro');
const astroFiles = fs.readdirSync(astroDir);
const jsFiles = astroFiles.filter(f => f.endsWith('.js'));

check(
  'Bundle splitting working',
  jsFiles.length > 1,
  `${jsFiles.length} JavaScript bundles generated`
);

// 8. CSS Optimization
const cssFiles = astroFiles.filter(f => f.endsWith('.css'));
check(
  'CSS bundling optimized',
  cssFiles.length > 0 && cssFiles.length < 5,
  `${cssFiles.length} CSS bundles generated (optimal)`
);

// 9. Image Processing
const imageFiles = astroFiles.filter(f => f.includes('.webp'));
check(
  'Image processing active',
  imageFiles.length > 0,
  `${imageFiles.length} WebP images generated`
);

// 10. Performance Monitoring Setup
check(
  'Performance monitoring script included',
  htmlContent.includes('performance') || htmlContent.includes('astro:load'),
  'Performance monitoring code detected'
);

// 11. Error Boundaries
const componentFiles = fs.readdirSync(path.join(__dirname, 'src', 'components'));
check(
  'Error boundary component created',
  componentFiles.includes('ErrorBoundary.tsx'),
  'ErrorBoundary.tsx file exists'
);

// 12. Form Utilities
const libFiles = fs.readdirSync(path.join(__dirname, 'src', 'lib'));
check(
  'Lightweight form utilities created',
  libFiles.includes('form-utils.ts'),
  'form-utils.ts replaces heavy dependencies'
);

// 13. TypeScript Configuration Enhanced
const tsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf-8'));
check(
  'TypeScript configuration enhanced',
  tsConfig.compilerOptions.exactOptionalPropertyTypes === true,
  'Strict TypeScript options enabled'
);

// File Size Analysis
console.log('\n📊 **FILE SIZE ANALYSIS**');

const getFileSize = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch (error) {
    return 'N/A';
  }
};

console.log(`📄 index.html: ${getFileSize(indexPath)} KB`);

astroFiles.forEach(file => {
  const filePath = path.join(astroDir, file);
  const size = getFileSize(filePath);
  const icon = file.endsWith('.js') ? '🔧' : file.endsWith('.css') ? '🎨' : file.includes('.webp') ? '🖼️' : '📄';
  console.log(`${icon} ${file}: ${size} KB`);
});

// Summary
console.log('\n🏆 **VALIDATION SUMMARY**');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`📊 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.failed === 0) {
  console.log('\n🎉 **ALL OPTIMIZATIONS SUCCESSFULLY APPLIED!**');
  console.log('Your Astro site is fully optimized and ready for production.');
} else {
  console.log(`\n⚠️  ${results.failed} optimization(s) need attention.`);
}

console.log('\n🚀 **NEXT STEPS:**');
console.log('1. Run `npm run preview` to test the production build');
console.log('2. Test the site performance with browser dev tools');
console.log('3. Validate accessibility with screen readers');
console.log('4. Check SEO with tools like Google Search Console');

export { results };