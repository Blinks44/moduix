import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      ...(!isDev ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),
      mdx(),
      tailwindcss(),
      tanstackStart({
        pages: [{ path: '/' }, { path: '/llms.txt' }, { path: '/llms-full.txt' }],
        prerender: {
          enabled: !isDev,
          concurrency: 1,
          failOnError: true,
          filter: ({ path: pagePath }) =>
            pagePath === '/' ||
            pagePath === '/docs' ||
            pagePath === '/llms.txt' ||
            pagePath === '/llms-full.txt' ||
            pagePath.startsWith('/docs/'),
        },
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom', '@ark-ui/react'],
      tsconfigPaths: true,
    },
    optimizeDeps: {
      include: ['@ark-ui/react/locale', '@internationalized/date', '@tanstack/react-virtual'],
    },
    environments: {
      ssr: {
        build: {
          rolldownOptions: {
            input: './src/server-entry/index.ts',
          },
        },
        optimizeDeps: {
          include: [
            'fumadocs-ui/components/dialog/search-default',
            '@tanstack/react-form',
            'react-hook-form',
          ],
        },
      },
    },
  };
});