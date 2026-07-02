import { readFile } from 'node:fs/promises';

const reportPath = process.argv[2];

if (!reportPath) {
  console.log('Usage: node scripts/extract-lighthouse-summary.mjs path/to/lighthouse-report.json');
  process.exit(0);
}

const report = JSON.parse(await readFile(reportPath, 'utf8'));
const categories = report.categories ?? {};
const audits = report.audits ?? {};
const score = (category) => {
  const value = categories[category]?.score;
  return typeof value === 'number' ? Math.round(value * 100) : 'n/a';
};
const display = (auditId) => audits[auditId]?.displayValue ?? 'n/a';

console.log(`URL: ${report.finalDisplayedUrl ?? report.finalUrl ?? 'n/a'}`);
console.log(`Performance: ${score('performance')}`);
console.log(`SEO: ${score('seo')}`);
console.log(`Accessibility: ${score('accessibility')}`);
console.log(`Best Practices: ${score('best-practices')}`);
console.log(`FCP: ${display('first-contentful-paint')}`);
console.log(`LCP: ${display('largest-contentful-paint')}`);
console.log(`TBT: ${display('total-blocking-time')}`);
console.log(`CLS: ${display('cumulative-layout-shift')}`);
console.log(`Speed Index: ${display('speed-index')}`);
