import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig, defineInlineProject } from '@rstest/core';

export default defineConfig({
  projects: [
    defineInlineProject({
      name: 'node',
      // Server rendering needs Solid's SSR JSX output instead of the DOM build used by the library.
      plugins: [
        pluginBabel({ include: /\.(?:jsx|tsx)$/ }),
        pluginSolid({ solidPresetOptions: { generate: 'ssr', hydratable: true } }),
      ],
      source: { tsconfigPath: './tsconfig.build.json' },
      testEnvironment: 'node',
      include: ['tests/**/*.test.{ts,tsx}'],
      exclude: ['tests/**/*.browser.test.{ts,tsx}'],
    }),
    defineInlineProject({
      name: 'browser',
      extends: withRslibConfig({ libId: 'compiled' }),
      plugins: [pluginTailwindcss()],
      setupFiles: ['./rstest.browser.setup.ts'],
      testEnvironment: 'node',
      // Behavior tests are shared with the CSS Modules package; `@/` resolves to this package's source.
      include: ['tests/**/*.browser.test.{ts,tsx}', '../solid/tests/*.browser.test.{ts,tsx}'],
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