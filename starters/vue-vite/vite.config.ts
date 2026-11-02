import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  // Match moduix's browser support and preserve native light-dark() colors.
  build: { target: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
});