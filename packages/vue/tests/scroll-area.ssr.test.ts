import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrScrollArea from './fixtures/SsrScrollArea.vue';

test('renders scroll-area on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrScrollArea));
  expect(html).toContain('data-slot="scroll-area-root"');
  expect(html).toContain('data-slot="scroll-area-viewport"');
  expect(html).toContain('data-slot="scroll-area-content"');
});