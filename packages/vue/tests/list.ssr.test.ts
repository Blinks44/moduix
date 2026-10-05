import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrList from './fixtures/SsrList.vue';

test('preserves list anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrList));
  expect(html).toContain('<ol');
  expect(html).toContain('data-slot="list-root"');
  expect(html).toContain('data-slot="list-item"');
  expect(html).toContain('role="list"');
  expect(html).toContain('start="3"');
});