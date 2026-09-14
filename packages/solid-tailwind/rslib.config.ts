import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
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
      id: 'compiled',
      bundle: false,
      dts: { bundle: false },
      format: 'esm',
      plugins: [
        pluginBabel({
          include: /\.(?:jsx|tsx)$/,
        }),
        pluginSolid(),
      ],
      syntax: 'es2023',
    },
    {
      id: 'solid',
      bundle: false,
      format: 'esm',
      output: {
        filename: {
          js: '[name].jsx',
        },
      },
      syntax: 'es2023',
      tools: {
        swc: {
          detectSyntax: 'auto',
          jsc: {
            transform: {
              react: {
                runtime: 'preserve',
              },
            },
          },
        },
        rspack: {
          module: {
            parser: {
              javascript: {
                jsx: true,
              },
            },
          },
        },
      },
    },
  ],
  output: {
    copy: [
      {
        from: '../foundation/src/styles',
        globOptions: {
          ignore: ['**/reset.css', '**/variables-ark.css', '**/variables-moduix.css'],
        },
        to: 'styles',
      },
      { from: '../foundation/src/presets', to: 'presets' },
    ],
    target: 'web',
  },
});