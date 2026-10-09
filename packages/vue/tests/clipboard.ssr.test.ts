import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrClipboard from './fixtures/SsrClipboard.vue';

test('renders clipboard on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrClipboard));
  expect(html).toContain('data-slot="clipboard-root"');
  expect(html).toContain('data-slot="clipboard-trigger"');
  expect(html).toContain('data-slot="clipboard-input"');
});