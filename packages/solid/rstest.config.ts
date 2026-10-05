import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig, defineInlineProject } from '@rstest/core';

export default defineConfig({
  projects: [
    defineInlineProject({
      name: 'dom',
      extends: withRslibConfig({ libId: 'compiled' }),
      setupFiles: ['./rstest.setup.ts'],
      testEnvironment: 'happy-dom',
      include: ['tests/**/*.test.{ts,tsx}'],
      exclude: ['tests/**/*.browser.test.{ts,tsx}'],
    }),
    defineInlineProject({
      name: 'browser',
      extends: withRslibConfig({ libId: 'compiled' }),
      setupFiles: ['./rstest.browser.setup.ts'],
      // Browser Mode supplies the environment; do not inherit Rslib's happy-dom setting.
      testEnvironment: 'node',
      include: ['tests/**/*.browser.test.{ts,tsx}'],
      browser: { enabled: true, provider: 'playwright', headless: true, port: 0 },
    }),
  ],
});