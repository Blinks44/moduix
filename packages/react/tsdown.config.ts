import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: {
    index: './src/index.ts',
    style: './src/style.ts',
    reset: './src/reset.ts',
  },
  tsconfig: './tsconfig.app.json',
  format: ['esm'],
  unbundle: true,
  hash: false,
  platform: 'browser',
  target: 'es2023',
  alias: {
    '@/icons/demo': path.resolve(dirname, './src/icons/demo'),
    '@/lib/moduix/icons/ui': path.resolve(dirname, './src/icons/ui'),
    '@/lib/moduix': path.resolve(dirname, './src/core/lib/moduix'),
    '@': path.resolve(dirname, './src'),
  },
  deps: {
    neverBundle: [/^@ark-ui\/react(\/.*)?$/, /^react(\/.*)?$/, /^react-dom(\/.*)?$/],
  },
  css: {
    inject: true,
  },
});