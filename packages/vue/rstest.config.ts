import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig, defineInlineProject } from '@rstest/core';

export default defineConfig({
  projects: [
    defineInlineProject({
      name: 'node',
      extends: withRslibConfig({ libId: 'compiled' }),
      testEnvironment: 'node',
      include: ['tests/**/*.test.{ts,tsx}'],
      exclude: ['tests/**/*.browser.test.{ts,tsx}'],
    }),
    defineInlineProject({
      name: 'browser',
      extends: withRslibConfig({ libId: 'compiled' }),
      setupFiles: ['./rstest.browser.setup.ts'],
      testEnvironment: 'node',
      include: ['tests/**/*.browser.test.{ts,tsx}'],
      browser: {
        enabled: true,
        provider: 'playwright',
        headless: true,
        port: 0,
        providerOptions: { context: { permissions: ['clipboard-read', 'clipboard-write'] } },
      },
    }),
  ],
});