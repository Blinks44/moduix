// CSS Modules adapters share component styles byte for byte; report any file that drifts.
// An unpublished (private) adapter is still being ported, so only its existing files are compared.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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

for (const adapter of others) {
  const actual = moduleFiles(adapter);
  for (const path of new Set([...expected.keys(), ...actual.keys()])) {
    if (!actual.has(path)) {
      if (!isPrivate(adapter)) problems.push(`${adapter}: missing ${path}`);
    } else if (!expected.has(path)) problems.push(`${adapter}: extra ${path}`);
    else if (actual.get(path) !== expected.get(path))
      problems.push(`${adapter}: ${path} differs from ${reference}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`${expected.size} CSS Modules match across ${adapters.join(', ')}.`);