import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const titleMax = 70;
const descriptionMax = 170;

async function assertDistExists() {
  try {
    const stats = await stat(distDir);
    if (!stats.isDirectory()) throw new Error('dist is not a directory');
  } catch {
    console.error('dist/ was not found. Run `npm run build` before SEO metadata checks.');
    process.exit(1);
  }
}

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function decodeBasicEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

await assertDistExists();

const files = await collectHtmlFiles(distDir);
const failures = [];

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = path.relative(distDir, file).replaceAll(path.sep, '/');
  const title = decodeBasicEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  const description = decodeBasicEntities(
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i)?.[1]?.trim() ??
      html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["'][^>]*>/i)?.[1]?.trim() ??
      ''
  );
  const brandMentions = title.match(/\bMarkosh\b/gi)?.length ?? 0;

  if (!title) failures.push(`${route}: missing <title>`);
  if (!description) failures.push(`${route}: missing meta description`);
  if (title.length > titleMax) failures.push(`${route}: title is ${title.length} chars: ${title}`);
  if (description.length > descriptionMax) {
    failures.push(`${route}: description is ${description.length} chars: ${description}`);
  }
  if (brandMentions > 1) failures.push(`${route}: title repeats Markosh: ${title}`);
}

if (failures.length > 0) {
  console.error('SEO metadata audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO metadata audit passed for ${files.length} HTML files.`);
