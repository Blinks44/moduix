import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from 'storybook-solidjs-vite';
import { mergeConfig } from 'vite';

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: {
    name: 'storybook-solidjs-vite',
    options: {},
  },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: [
          { find: '@', replacement: fromHere('../../../packages/solid/src') },
          {
            find: '@foundation',
            replacement: fromHere('../../../packages/foundation/src'),
          },
        ],
      },
    }),
} satisfies StorybookConfig;

export default config;