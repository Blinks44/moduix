import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrInput from './fixtures/SsrInput.vue';

test('renders native input anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrInput));
  expect(html).toContain('<input');
  expect(html).toContain('data-slot="input-root"');
  expect(html).toContain('data-scope="field"');
  expect(html).toContain('size="8"');
});