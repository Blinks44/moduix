import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config = {
  stories: ['../stories/**/*.stories.@(js|mjs|ts)'],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [vue()],
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