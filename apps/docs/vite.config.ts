import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const uiPackageDir = path.resolve(dirname, '../../packages/ui');

const uiPrimitiveOptimizeDeps = [
  '@ark-ui/react/accordion',
  '@ark-ui/react/avatar',
  '@ark-ui/react/carousel',
  '@ark-ui/react/checkbox',
  '@ark-ui/react/collapsible',
  '@ark-ui/react/radio-group',
  '@base-ui/react/alert-dialog',
  '@base-ui/react/autocomplete',
  '@base-ui/react/combobox',
  '@base-ui/react/dialog',
  '@base-ui/react/drawer',
  '@base-ui/react/field',
  '@base-ui/react/fieldset',
  '@base-ui/react/form',
  '@base-ui/react/input',
  '@base-ui/react/menu',
  '@base-ui/react/merge-props',
  '@base-ui/react/number-field',
  '@base-ui/react/otp-field',
  '@base-ui/react/popover',
  '@base-ui/react/preview-card',
  '@base-ui/react/progress',
  '@base-ui/react/radio',
  '@base-ui/react/radio-group',
  '@base-ui/react/scroll-area',
  '@base-ui/react/select',
  '@base-ui/react/separator',
  '@base-ui/react/slider',
  '@base-ui/react/switch',
  '@base-ui/react/tabs',
  '@base-ui/react/toast',
  '@base-ui/react/toggle',
  '@base-ui/react/toggle-group',
  '@base-ui/react/toolbar',
  '@base-ui/react/tooltip',
  '@base-ui/react/unstable-use-media-query',
  '@base-ui/react/use-render',
  'clsx',
  'tslib/tslib.es6.js',
];

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
      { find: 'moduix/style.css', replacement: path.resolve(uiPackageDir, 'src/style.ts') },
      { find: 'moduix/reset.css', replacement: path.resolve(uiPackageDir, 'src/reset.ts') },
      { find: 'moduix', replacement: path.resolve(uiPackageDir, 'src/index.ts') },
    ],
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: uiPrimitiveOptimizeDeps,
  },
  ssr: {
    optimizeDeps: {
      include: uiPrimitiveOptimizeDeps,
    },
  },
});