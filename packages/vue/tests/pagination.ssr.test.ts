import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrPagination from './fixtures/SsrPagination.vue';

test('renders the public pagination anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrPagination));
  expect(html).toContain('data-slot="pagination-root"');
  expect(html).toContain('id="pagination:pagination-ssr"');
  expect(html).toContain('data-selected');
});