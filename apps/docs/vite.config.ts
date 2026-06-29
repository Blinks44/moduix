import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    mdx(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
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
});