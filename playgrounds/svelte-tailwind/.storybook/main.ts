import type { StorybookConfig } from '@storybook/svelte-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config = {
  stories: ['../stories/**/*.stories.svelte'],
  addons: ['@storybook/addon-svelte-csf'],
  framework: '@storybook/svelte-vite',
  // Svelte must compile stories before the framework's docgen plugin parses them.
  viteFinal: (viteConfig) =>
    mergeConfig(mergeConfig({ plugins: [svelte()] }, viteConfig), {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            find: '@/lib/moduix',
            replacement: fromHere('../../../packages/svelte-tailwind/src/internal'),
          },
          { find: '@', replacement: fromHere('../../../packages/svelte-tailwind/src') },
        ],
      },
    }),
} satisfies StorybookConfig;

export default config;