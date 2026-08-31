import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**/*.{css,ts,tsx}', '!./src/styles/**/*', '!./src/presets/**/*'],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      bundle: false,
      dts: {
        bundle: false,
      },
      format: 'esm',
      syntax: 'es2023',
    },
  ],
  output: {
    copy: [
      {
        from: '../foundation/src/styles',
        globOptions: {
          ignore: ['**/variables-ark.css', '**/variables-moduix.css'],
        },
        to: 'styles',
      },
      {
        from: '../foundation/src/presets',
        to: 'presets',
      },
    ],
    target: 'web',
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
});