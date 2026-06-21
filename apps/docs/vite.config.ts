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
  '@ark-ui/react/angle-slider',
  '@ark-ui/react/avatar',
  '@ark-ui/react/carousel',
  '@ark-ui/react/checkbox',
  '@ark-ui/react/clipboard',
  '@ark-ui/react/collapsible',
  '@ark-ui/react/color-picker',
  '@ark-ui/react/combobox',
  '@ark-ui/react/dialog',
  '@ark-ui/react/drawer',
  '@ark-ui/react/factory',
  '@ark-ui/react/field',
  '@ark-ui/react/fieldset',
  '@ark-ui/react/hover-card',
  '@ark-ui/react/locale',
  '@ark-ui/react/menu',
  '@ark-ui/react/number-input',
  '@ark-ui/react/pagination',
  '@ark-ui/react/password-input',
  '@ark-ui/react/pin-input',
  '@ark-ui/react/popover',
  '@ark-ui/react/portal',
  '@ark-ui/react/progress',
  '@ark-ui/react/radio-group',
  '@ark-ui/react/rating-group',
  '@ark-ui/react/scroll-area',
  '@ark-ui/react/select',
  '@ark-ui/react/slider',
  '@ark-ui/react/steps',
  '@ark-ui/react/switch',
  '@ark-ui/react/tabs',
  '@ark-ui/react/toast',
  '@ark-ui/react/toggle',
  '@ark-ui/react/toggle-group',
  '@ark-ui/react/tooltip',
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