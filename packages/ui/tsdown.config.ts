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
  format: ['esm', 'cjs'],
  unbundle: true,
  hash: false,
  platform: 'browser',
  target: false,
  alias: {
    '@': path.resolve(dirname, './src'),
  },
  deps: {
    neverBundle: [/^@base-ui\/react(\/.*)?$/, /^react(\/.*)?$/, /^react-dom(\/.*)?$/],
  },
  dts: {
    cjsReexport: true,
  },
  css: {
    inject: true,
  },
});