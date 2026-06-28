import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@/icons/demo', replacement: path.resolve(__dirname, './src/icons/demo') },
      { find: '@/lib/moduix/icons/ui', replacement: path.resolve(__dirname, './src/icons/ui') },
      {
        find: '@/lib/moduix/normalizeClassName',
        replacement: path.resolve(__dirname, './src/core/lib/moduix/normalizeClassName.ts'),
      },
      { find: /^@\/(.*)$/, replacement: path.resolve(__dirname, './src/$1') },
    ],
    dedupe: ['react', 'react-dom'],
  },
});