import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrInputGroup from './fixtures/SsrInputGroup.vue';

test('renders the public input-group anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrInputGroup));
  expect(html).toContain('<section');
  expect(html).toContain('data-slot="input-group-root"');
  expect(html).toContain('data-slot="input-root"');
});