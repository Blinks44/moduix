// CSS Modules adapters share component styles byte for byte; report any file that drifts.
// An unpublished (private) adapter is still being ported, so only its existing files are compared.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const sync = process.argv.includes('--sync');

const adapters = readdirSync('packages').filter(
  (name) => !name.endsWith('-tailwind') && existsSync(join('packages', name, 'src/components')),
);

function moduleFiles(adapter) {
  const root = join('packages', adapter, 'src/components');
  const files = new Map();
  for (const path of readdirSync(root, { recursive: true })) {
    if (path.endsWith('.module.css')) files.set(path, readFileSync(join(root, path), 'utf8'));
  }
  return files;
}

const isPrivate = (adapter) =>
  JSON.parse(readFileSync(join('packages', adapter, 'package.json'), 'utf8')).private === true;

const [reference, ...others] = adapters;
const expected = moduleFiles(reference);
const problems = [];
let synced = 0;

for (const adapter of others) {
  const actual = moduleFiles(adapter);
  for (const path of new Set([...expected.keys(), ...actual.keys()])) {
    if (!actual.has(path)) {
      if (sync && !isPrivate(adapter)) {
        const dest = join('packages', adapter, 'src/components', path);
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, expected.get(path));
        synced += 1;
      } else if (!isPrivate(adapter)) {
        problems.push(`${adapter}: missing ${path}`);
      }
    } else if (!expected.has(path)) {
      problems.push(`${adapter}: extra ${path}`);
    } else if (actual.get(path) !== expected.get(path)) {
      if (sync) {
        writeFileSync(join('packages', adapter, 'src/components', path), expected.get(path));
        synced += 1;
      } else {
        problems.push(`${adapter}: ${path} differs from ${reference}`);
      }
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

if (sync) {
  console.log(`Synced ${synced} CSS Module(s) from ${reference} to ${others.join(', ')}.`);
} else {
  console.log(`${expected.size} CSS Modules match across ${adapters.join(', ')}.`);
}