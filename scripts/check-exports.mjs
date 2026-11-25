// Ensures every public package lists explicit component subpaths in `package.json` `"exports"`
// (for IDE auto-import) instead of a wildcard `"./*"`, and stays in sync with `src/components/`.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const packages = readdirSync('packages').filter((name) => {
  const pkgPath = join('packages', name, 'package.json');
  if (!existsSync(pkgPath)) return false;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  return pkg.private !== true && existsSync(join('packages', name, 'src/components'));
});

const problems = [];

for (const name of packages) {
  const pkg = JSON.parse(readFileSync(join('packages', name, 'package.json'), 'utf8'));
  const exportsMap = pkg.exports ?? {};
  if ('./*' in exportsMap) {
    problems.push(`${name}: wildcard "./*" export found; list component subpaths explicitly.`);
  }

  const components = readdirSync(join('packages', name, 'src/components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `./${entry.name}`)
    .sort();

  const exportedComponents = Object.keys(exportsMap)
    .filter(
      (key) =>
        key !== './collection' &&
        key !== './locale' &&
        key !== './style.css' &&
        key !== './reset.css' &&
        key !== './presets/*' &&
        key !== './package.json' &&
        key !== './*',
    )
    .sort();

  const expected = new Set(components);
  const actual = new Set(exportedComponents);

  for (const subpath of components) {
    if (!actual.has(subpath)) problems.push(`${name}: missing export ${subpath}`);
  }
  for (const subpath of exportedComponents) {
    if (!expected.has(subpath)) problems.push(`${name}: stale export ${subpath}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Explicit component exports match src/components across ${packages.length} packages.`);