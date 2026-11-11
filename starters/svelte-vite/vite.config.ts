import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  // Match moduix's browser support and preserve native light-dark() colors.
  build: { target: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
});