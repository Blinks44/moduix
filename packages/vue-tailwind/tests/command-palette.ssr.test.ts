import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrCommandPalette from './fixtures/SsrCommandPalette.vue';

test('renders command-palette on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrCommandPalette));
  expect(html).toContain('data-slot="command-palette-backdrop"');
  expect(html).toContain('data-slot="command-palette-content"');
  expect(html).toContain('data-slot="command-palette-input"');
});