import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrProgressLinear from './fixtures/SsrProgressLinear.vue';

test('renders public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrProgressLinear));
  expect(html).toContain('data-slot="progress-linear-root"');
  expect(html).toContain('data-slot="progress-linear-track"');
  expect(html).toContain('aria-valuenow="42"');
});