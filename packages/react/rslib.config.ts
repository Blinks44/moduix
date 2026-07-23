import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**/*.{css,ts,tsx}'],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      dts: {
        bundle: true,
      },
      format: 'esm',
      syntax: 'es2023',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});