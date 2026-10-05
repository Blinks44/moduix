import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrSelect from './fixtures/SsrSelect.vue';

test('renders select on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrSelect));
  expect(html).toContain('data-slot="select-root"');
  expect(html).toContain('data-slot="select-trigger"');
  expect(html).toContain('data-slot="select-content"');
});