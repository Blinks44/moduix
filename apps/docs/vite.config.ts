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
        prerender: {
          enabled: !isDev,
          // Reduce flakiness of local prerender crawler in CI/local runs.
          concurrency: 1,
          retryCount: 5,
          retryDelay: 250,
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