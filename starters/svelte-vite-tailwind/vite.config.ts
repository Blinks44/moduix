import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  // Match moduix's browser support and preserve native light-dark() colors.
  build: { target: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
});