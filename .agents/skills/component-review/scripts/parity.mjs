#!/usr/bin/env node
// Usage: node .agents/skills/component-review/scripts/parity.mjs <slug>
// Run from the repository root. Read-only: prints parity facts for one component.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('usage: parity.mjs <slug>');
  process.exit(1);
}

const adapters = readdirSync('packages').filter((name) =>
  existsSync(join('packages', name, 'src/components', slug)),
);
const dir = (adapter) => join('packages', adapter, 'src/components', slug);
const files = (adapter) => readdirSync(dir(adapter)).map((file) => join(dir(adapter), file));
const read = (file) => readFileSync(file, 'utf8');
const lines = (text) => text.split('\n').length;

console.log(`# ${slug}: adapters with this component: ${adapters.join(', ')}\n`);

console.log('## Files (lines, counted correctly for files without a trailing newline)');
for (const adapter of adapters) {
  const list = files(adapter).map((file) => `${file.split('/').pop()}:${lines(read(file))}`);
  console.log(`${adapter}: ${list.join('  ')}`);
}

console.log('\n## CSS Modules byte parity');
const css = adapters
  .flatMap((adapter) => files(adapter).filter((file) => file.endsWith('.module.css')))
  .map((file) => [file, read(file)]);
for (const [file, text] of css.slice(1)) {
  console.log(`${text === css[0][1] ? 'same' : 'DIFFERENT'}: ${file} vs ${css[0][0]}`);
}

console.log(
  '\n## Tailwind class strings (all quote styles), compared with the first Tailwind adapter',
);
const LITERAL = /'[^'\n]*'|"[^"\n]*"|`[^`]*`/g;
// Scan quoted literals left to right; a literal that holds other literals (a Vue template
// attribute such as :class="cn('...', className)") is scanned again from the inside.
const collectUtilityLists = (text, found) => {
  for (const match of text.matchAll(LITERAL)) {
    const inner = match[0].slice(1, -1);
    if (/['"`]/.test(inner)) {
      collectUtilityLists(inner, found);
      continue;
    }
    const value = inner.trim().replace(/\s+/g, ' ');
    const tokens = value.split(' ');
    // Keep utility lists only: several tokens, no code or markup characters.
    if (tokens.length >= 3 && !/[{};<]/.test(value) && tokens.some((t) => t.includes('-'))) {
      found.add(value);
    }
  }
};
const classStrings = (adapter) => {
  const found = new Set();
  for (const file of files(adapter)) collectUtilityLists(read(file), found);
  return found;
};
const tailwind = adapters.filter((adapter) => adapter.endsWith('-tailwind'));
const base = tailwind[0] && classStrings(tailwind[0]);
for (const adapter of tailwind.slice(1)) {
  const other = classStrings(adapter);
  const missing = [...base].filter((value) => !other.has(value));
  const extra = [...other].filter((value) => !base.has(value));
  console.log(`${adapter}: ${missing.length || extra.length ? 'DIFFERENT' : 'same'}`);
  for (const value of missing) console.log(`  only in ${tailwind[0]}: ${value}`);
  for (const value of extra) console.log(`  only in ${adapter}: ${value}`);
}

console.log('\n## Hard-coded user-facing strings (aria-label defaults and similar)');
for (const adapter of adapters) {
  for (const file of files(adapter)) {
    for (const line of read(file).split('\n')) {
      if (/a11yLabels\.|aria-label.*['"][A-Z][a-z]|_LABEL\s*=/.test(line)) {
        console.log(`${file}: ${line.trim()}`);
      }
    }
  }
}

console.log('\n## Browser tests per adapter');
for (const adapter of adapters) {
  const testDir = join('packages', adapter, 'tests');
  if (!existsSync(testDir)) continue;
  for (const file of readdirSync(testDir).filter((name) => name.startsWith(`${slug}.`))) {
    const titles = [...read(join(testDir, file)).matchAll(/^\s*(?:test|it)\(\s*['"`](.+?)['"`]/gm)];
    console.log(`${adapter}/${file}: ${titles.length} tests`);
    for (const [, title] of titles) console.log(`  - ${title}`);
  }
}

console.log('\n## Component-local docs');
for (const adapter of adapters) {
  const doc = join(dir(adapter), `${slug}.md`);
  console.log(`${adapter}: ${existsSync(doc) ? `${lines(read(doc))} lines` : 'missing'}`);
}