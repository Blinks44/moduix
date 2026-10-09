import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrProgressCircular from './fixtures/SsrProgressCircular.vue';

test('renders public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrProgressCircular));
  expect(html).toContain('data-slot="progress-circular-root"');
  expect(html).toContain('data-slot="progress-circular-circle"');
  expect(html).toContain('aria-valuenow="42"');
});