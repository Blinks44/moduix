import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrDateInput from './fixtures/SsrDateInput.vue';

test('renders date-input on the server without browser globals', async () => {
  const html = await renderToString(createSSRApp(SsrDateInput));
  expect(html).toContain('data-slot="date-input-root"');
  expect(html).toContain('data-slot="date-input-control"');
  expect(html).toContain('data-slot="date-input-segment"');
});