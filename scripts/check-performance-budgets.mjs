import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const assetDir = path.join(distDir, '_astro');
const maxGeneratedFontFiles = 20;
const maxGeneratedFontBytes = 180 * 1024;
const maxHomeJsBytes = 45 * 1024;
const targetHomeHtmlBytes = 45 * 1024;
const maxHomeHtmlBytes = 55 * 1024;

async function assertDistExists() {
  try {
    const stats = await stat(distDir);
    if (!stats.isDirectory()) throw new Error('dist is not a directory');
  } catch {
    console.error('dist/ was not found. Run `npm run build` before performance budget checks.');
    process.exit(1);
  }
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function localAssetPath(src) {
  const withoutQuery = src.split('?')[0];
  const normalized = withoutQuery.startsWith('/') ? withoutQuery.slice(1) : withoutQuery;
  return path.join(distDir, normalized);
}

await assertDistExists();

const allFiles = await collectFiles(distDir);
const fontFiles = allFiles.filter((file) => /\.(woff2?|ttf|otf)$/i.test(file));
const failures = [];
const warnings = [];

const fontBytes = (
  await Promise.all(fontFiles.map(async (file) => (await stat(file)).size))
).reduce((sum, size) => sum + size, 0);

if (fontFiles.length > maxGeneratedFontFiles) {
  failures.push(`generated font files: ${fontFiles.length} > ${maxGeneratedFontFiles}`);
}

if (fontBytes > maxGeneratedFontBytes) {
  failures.push(`generated font bytes: ${fontBytes} > ${maxGeneratedFontBytes}`);
}

const homeHtmlPath = path.join(distDir, 'index.html');
const homeHtml = await readFile(homeHtmlPath, 'utf8');
const homeHtmlBytes = (await stat(homeHtmlPath)).size;
const scriptSrcs = [...homeHtml.matchAll(/<script\b[^>]*\bsrc=["']([^"']+\.js(?:\?[^"']*)?)["'][^>]*>/gi)]
  .map((match) => match[1])
  .filter((src) => src.startsWith('/_astro/') || src.startsWith('_astro/'));

let homeJsBytes = 0;
for (const src of scriptSrcs) {
  const scriptPath = localAssetPath(src);
  homeJsBytes += (await stat(scriptPath)).size;
}

if (homeHtmlBytes > targetHomeHtmlBytes) {
  warnings.push(`home HTML bytes are ${homeHtmlBytes}; target is ${targetHomeHtmlBytes}, hard limit is ${maxHomeHtmlBytes}`);
}

if (homeHtmlBytes > maxHomeHtmlBytes) {
  failures.push(`home HTML bytes: ${homeHtmlBytes} > hard limit ${maxHomeHtmlBytes}`);
}

if (homeJsBytes > maxHomeJsBytes) {
  failures.push(`home JS bytes before third parties: ${homeJsBytes} > ${maxHomeJsBytes}`);
}

if (failures.length > 0) {
  console.error('Performance budget check failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn('Performance budget warnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

const assetPath = path.relative(rootDir, assetDir);
console.log(`Performance budgets passed. Fonts: ${fontFiles.length} files / ${fontBytes} bytes in ${assetPath}. Home JS: ${homeJsBytes} bytes.`);
