import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    style: './src/style.ts',
    reset: './src/reset.ts',
    'presets/contrast': './src/presets/contrast.ts',
    'presets/dense': './src/presets/dense.ts',
    'presets/soft': './src/presets/soft.ts',
  },
  tsconfig: './tsconfig.app.json',
  format: ['esm'],
  unbundle: true,
  platform: 'browser',
  target: 'es2023',
  css: {
    inject: true,
  },
});