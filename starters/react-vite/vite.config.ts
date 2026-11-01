import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Match moduix's browser support and preserve native light-dark() colors.
  build: { target: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
});