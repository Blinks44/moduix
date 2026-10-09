import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrTextarea from './fixtures/SsrTextarea.vue';

test('renders native textarea anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrTextarea));
  expect(html).toContain('<textarea');
  expect(html).toContain('data-slot="textarea-root"');
  expect(html).toContain('data-scope="field"');
  expect(html).toContain('rows="4"');
});