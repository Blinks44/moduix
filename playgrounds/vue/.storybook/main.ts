import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config = {
  stories: ['../stories/**/*.stories.@(js|mjs|ts)'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: [
          {
            find: '@/lib/moduix',
            replacement: fromHere('../../../packages/vue/src/internal'),
          },
          { find: '@', replacement: fromHere('../../../packages/vue/src') },
          {
            find: '@foundation',
            replacement: fromHere('../../../packages/foundation/src'),
          },
        ],
      },
    }),
} satisfies StorybookConfig;

export default config;