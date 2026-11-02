import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  // Match moduix's browser support and preserve native light-dark() colors.
  build: { target: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
});