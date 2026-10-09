import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTag from './fixtures/SsrTag.vue';

test('renders tag public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrTag));
  expect(html).toContain('data-slot="tag-root"');
  expect(html).toContain('data-slot="tag-label"');
});