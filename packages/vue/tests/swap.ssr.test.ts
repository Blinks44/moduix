import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSwap from './fixtures/SsrSwap.vue';

test('renders swap public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrSwap));
  expect(html).toContain('data-slot="swap-root"');
  expect(html).toContain('data-slot="swap-indicator"');
  expect(html).toContain('data-type="on"');
  expect(html).toContain('hidden');
});