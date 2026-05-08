import react from '@vitejs/plugin-react';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig, esmExternalRequirePlugin } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    libInjectCss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src/**/*'],
      exclude: ['**/*.stories.tsx', '**/*.stories.ts'],
      outDirs: 'dist',
      entryRoot: path.resolve(__dirname, 'src'),
      compilerOptions: {
        rootDir: path.resolve(__dirname, 'src'),
      },
    }),
    copy({
      targets: [{ src: 'src/styles/reset.css', dest: 'dist' }],
      hook: 'writeBundle',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'moduix',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: [/^@base-ui\/react(\/.*)?$/, /^react(\/.*)?$/, /^react-dom(\/.*)?$/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [
        esmExternalRequirePlugin({
          external: ['react', 'react-dom'],
        }),
      ],
    },
  },
});