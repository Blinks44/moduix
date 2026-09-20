import { pluginVue } from '@rsbuild/plugin-vue';
import { defineConfig } from '@rslib/core';
import { fileURLToPath } from 'node:url';
import dts from 'unplugin-dts/rspack';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**/*.{css,ts,vue}', '!./src/styles/**/*', '!./src/presets/**/*'],
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      id: 'compiled',
      bundle: false,
      format: 'esm',
      plugins: [pluginVue()],
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
  tools: {
    rspack: {
      plugins: [
        dts({
          root: fileURLToPath(new URL('.', import.meta.url)),
          entryRoot: 'src',
          outDirs: 'dist',
          tsconfigPath: './tsconfig.build.json',
          cleanVueFileName: false,
          pathsToAliases: true,
        }),
      ],
    },
  },
});