import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

async function assertDistExists() {
  try {
    const stats = await stat(distDir);
    if (!stats.isDirectory()) throw new Error('dist is not a directory');
  } catch {
    console.error('dist/ was not found. Run `npm run build` before structured-data validation.');
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

await assertDistExists();

const files = await collectHtmlFiles(distDir);
const failures = [];
let schemaCount = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = path.relative(distDir, file).replaceAll(path.sep, '/');
  const matches = html.matchAll(
    /<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi
  );

  for (const match of matches) {
    schemaCount += 1;
    try {
      JSON.parse(match[1].trim());
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
}

if (failures.length > 0) {
  console.error('Structured-data validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Structured-data validation passed for ${schemaCount} JSON-LD blocks across ${files.length} HTML files.`);
