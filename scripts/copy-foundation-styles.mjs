// Copies the foundation stylesheets and presets into a package's dist for adapters whose build
// tool does not copy assets (svelte-package). Run from the package directory after the build.
// Usage: node ../../scripts/copy-foundation-styles.mjs [--no-reset]
import { cpSync } from 'node:fs';
import { basename } from 'node:path';

const skipped = new Set(['variables-ark.css']);
if (process.argv.includes('--no-reset')) skipped.add('reset.css');

cpSync('../foundation/src/styles', 'dist/styles', {
  recursive: true,
  filter: (source) => !skipped.has(basename(source)),
});
cpSync('../foundation/src/presets', 'dist/presets', { recursive: true });