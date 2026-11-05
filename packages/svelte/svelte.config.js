import { fileURLToPath } from 'node:url';

const fromHere = (path) => fileURLToPath(new URL(path, import.meta.url));

// svelte-package rewrites these aliases to relative paths in the published source.
export default {
  alias: {
    '@/lib/moduix': fromHere('./src/internal'),
    '@': fromHere('./src'),
  },
};