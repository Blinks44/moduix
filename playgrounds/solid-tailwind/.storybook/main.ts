import tailwindcss from '@tailwindcss/vite';
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
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            find: '@/lib/moduix',
            replacement: fromHere('../../../packages/solid-tailwind/src/internal'),
          },
          { find: '@', replacement: fromHere('../../../packages/solid-tailwind/src') },
        ],
      },
    }),
} satisfies StorybookConfig;

export default config;