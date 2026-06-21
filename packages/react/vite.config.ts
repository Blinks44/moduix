import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@/icons/demo': path.resolve(__dirname, './src/icons/demo'),
      '@/lib/moduix/icons/ui': path.resolve(__dirname, './src/icons/ui'),
      '@/lib/moduix': path.resolve(__dirname, './src/core/lib/moduix'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});