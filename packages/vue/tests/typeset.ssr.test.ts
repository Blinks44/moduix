import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTypeset from './fixtures/SsrTypeset.vue';

test('renders public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrTypeset));
  expect(html).toContain('<article');
  expect(html).toContain('data-scope="typeset"');
  expect(html).toContain('data-part="root"');
  expect(html).toContain('data-slot="typeset-scroll"');
  expect(html).toContain('role="region"');
  expect(html).toContain('tabindex="0"');
});