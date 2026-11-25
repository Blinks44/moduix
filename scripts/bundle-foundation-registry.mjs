// Bundles packages/foundation/src/styles/{style,tailwind}.css into self-contained files for the
// shadcn registry so installing foundation writes 1-2 files instead of 14-15 separate CSS files.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const stylesDir = resolve(rootDir, 'packages/foundation/src/styles');
const outputDir = resolve(rootDir, 'packages/foundation/dist/registry');

const importPattern = /^@import\s+['"](\.\/[^'"]+)['"](?:\s+layer\(([^)]+)\))?;\s*$/;

function indentBlock(content, spaces = 2) {
  const prefix = ' '.repeat(spaces);
  return content
    .trim()
    .split('\n')
    .map((line) => (line.length > 0 ? `${prefix}${line}` : ''))
    .join('\n');
}

function inlineStylesheet(entryPath) {
  const baseDir = dirname(entryPath);
  const lines = readFileSync(entryPath, 'utf8').split('\n');
  const segments = [];

  for (const line of lines) {
    const match = line.match(importPattern);
    if (!match) {
      segments.push({ type: 'raw', text: line });
      continue;
    }

    const [, relPath, layerName] = match;
    const targetPath = resolve(baseDir, relPath);
    const expanded = inlineStylesheet(targetPath);

    if (layerName) {
      const prev = segments.at(-1);
      if (prev && prev.type === 'layer' && prev.name === layerName) {
        prev.chunks.push({ relPath, content: expanded });
      } else {
        segments.push({
          type: 'layer',
          name: layerName,
          chunks: [{ relPath, content: expanded }],
        });
      }
    } else {
      segments.push({ type: 'raw', text: expanded });
    }
  }

  return segments
    .map((segment) => {
      if (segment.type === 'raw') return segment.text;
      const body = segment.chunks
        .map(
          (chunk) => `  /* ${chunk.relPath.replace(/^\.\//, '')} */\n${indentBlock(chunk.content)}`,
        )
        .join('\n\n');
      return `@layer ${segment.name} {\n${body}\n}`;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

mkdirSync(outputDir, { recursive: true });

for (const entry of ['style.css', 'tailwind.css']) {
  const bundled = `${inlineStylesheet(resolve(stylesDir, entry))}\n`;
  if (/@import\s+['"]\.\//.test(bundled)) {
    throw new Error(`Unresolved relative @import remained in bundled ${entry}`);
  }
  writeFileSync(resolve(outputDir, entry), bundled);
}