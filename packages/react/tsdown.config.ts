import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    style: './src/style.ts',
    reset: './src/reset.ts',
  },
  tsconfig: './tsconfig.app.json',
  format: ['esm'],
  unbundle: true,
  platform: 'browser',
  target: 'es2023',
  deps: {
    onlyBundle: ['@zag-js/splitter', '@zag-js/types'],
  },
  css: {
    inject: true,
  },
});