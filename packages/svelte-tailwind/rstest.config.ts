import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { defineConfig, defineInlineProject } from '@rstest/core';
import type { CompileOptions } from 'svelte/compiler';

const alias = { '@/lib/moduix': './src/internal', '@': './src' };
// Svelte 5 strips TypeScript itself; svelte-preprocess would downlevel `$props()` destructuring.
// svelte-loader does not infer server output from the node target, so SSR tests request it.
const svelte = (generate: 'client' | 'server') => {
  const compilerOptions: CompileOptions = { generate };
  return pluginSvelte({ svelteLoaderOptions: { preprocess: [], compilerOptions } });
};

export default defineConfig({
  projects: [
    defineInlineProject({
      name: 'node',
      plugins: [svelte('server')],
      resolve: { alias },
      // Node cannot load `.svelte` files from Ark and Lucide or zag's extensionless ESM imports.
      output: { bundleDependencies: ['@ark-ui/svelte', '@lucide/svelte', '@zag-js/svelte'] },
      testEnvironment: 'node',
      // SSR fixtures are shared with the CSS Modules package; `@/` resolves to this package's source.
      include: ['tests/**/*.test.ts', '../svelte/tests/*.test.ts'],
      exclude: ['tests/**/*.browser.test.ts', '../svelte/tests/*.browser.test.ts'],
    }),
    defineInlineProject({
      name: 'browser',
      plugins: [svelte('client'), pluginTailwindcss()],
      resolve: { alias },
      setupFiles: ['./rstest.browser.setup.ts'],
      testEnvironment: 'node',
      // Behavior tests are shared with the CSS Modules package; `@/` resolves to this package's source.
      include: ['tests/**/*.browser.test.ts', '../svelte/tests/*.browser.test.ts'],
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