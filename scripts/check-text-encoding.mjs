import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'src');
const textExtensions = new Set([
  '.astro',
  '.css',
  '.js',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx',
]);

const markers = [
  { label: 'replacement character', value: '\uFFFD' },
  { label: 'latin-1 Â marker', value: '\u00C2' },
  { label: 'latin-1 Ã marker', value: '\u00C3' },
  { label: 'misdecoded smart-punctuation fragment', value: '\u00E2\u20AC' },
];

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else if (textExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const failures = [];
const files = await collectFiles(sourceDir);

for (const file of files) {
  const contents = await readFile(file, 'utf8');
  const lines = contents.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const marker of markers) {
      if (line.includes(marker.value)) {
        failures.push({
          file: path.relative(rootDir, file),
          line: index + 1,
          marker: marker.label,
          text: line.trim(),
        });
      }
    }
  });
}

if (failures.length > 0) {
  console.error('Mojibake or replacement-character markers found:');
  failures.forEach((failure) => {
    console.error(`${failure.file}:${failure.line} [${failure.marker}] ${failure.text}`);
  });
  process.exit(1);
}

console.log(`Text encoding check passed for ${files.length} source files.`);
