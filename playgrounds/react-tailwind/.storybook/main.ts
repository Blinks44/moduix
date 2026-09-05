import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            find: '@/lib/moduix',
            replacement: fromHere('../../../packages/react-tailwind/src/internal'),
          },
          { find: '@', replacement: fromHere('../../../packages/react-tailwind/src') },
        ],
      },
    }),
};

export default config;