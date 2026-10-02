import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const task = process.argv[2];
const directories = readdirSync(resolve(root, 'packages'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^[a-z][a-z0-9-]*$/.test(entry.name))
  .map((entry) => entry.name)
  .sort();
const publicPackages = directories.filter((directory) => {
  const manifest = resolve(root, 'packages', directory, 'package.json');
  return existsSync(manifest) && JSON.parse(readFileSync(manifest, 'utf8')).private !== true;
});
const registryOwners = directories.filter(
  (directory) =>
    existsSync(resolve(root, 'packages', directory, 'registry.json')) &&
    (publicPackages.includes(directory) ||
      !existsSync(resolve(root, 'packages', directory, 'package.json'))),
);

function run(args, cwd = root) {
  const result = spawnSync('pnpm', args, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = 1;
}

if (task === 'build') {
  if (!publicPackages.length) throw new Error('No public packages found.');
  run([
    'exec',
    'turbo',
    'run',
    'build',
    ...publicPackages.flatMap((name) => ['-F', `./packages/${name}`]),
  ]);
} else if (task === 'check') {
  const { scripts } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  if (!publicPackages.length) throw new Error('No public packages found.');
  for (const name of publicPackages) {
    if (!scripts[`check:package:${name}`]) throw new Error(`Missing package check for ${name}.`);
    run(['run', `check:package:${name}`]);
  }
} else if (['registry:validate', 'registry:build', 'registry:clean'].includes(task)) {
  if (!registryOwners.length) throw new Error('No registry manifests found.');
  for (const name of registryOwners) {
    const output = resolve(root, 'website/docs/public/r', name);
    if (task === 'registry:clean') {
      // Delete only the generated directory owned by this exact source manifest.
      rmSync(output, { recursive: true, force: true });
    } else {
      run(
        task === 'registry:build'
          ? ['exec', 'shadcn', 'build', 'registry.json', '--output', output]
          : ['exec', 'shadcn', 'registry', 'validate', 'registry.json'],
        resolve(root, 'packages', name),
      );
    }
  }
} else {
  throw new Error(`Unknown workspace task: ${task}`);
}