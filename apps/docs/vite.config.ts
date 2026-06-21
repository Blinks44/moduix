import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const reactPackageDir = path.resolve(dirname, '../../packages/react');

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
    alias: [
      {
        find: '@moduix/react/style.css',
        replacement: path.resolve(reactPackageDir, 'src/style.ts'),
      },
      {
        find: '@moduix/react/reset.css',
        replacement: path.resolve(reactPackageDir, 'src/reset.ts'),
      },
      { find: '@moduix/react', replacement: path.resolve(reactPackageDir, 'src/index.ts') },
      {
        find: '@/lib/moduix/icons/ui',
        replacement: path.resolve(reactPackageDir, 'src/icons/ui'),
      },
      { find: '@/lib/moduix', replacement: path.resolve(reactPackageDir, 'src/core/lib/moduix') },
    ],
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
});