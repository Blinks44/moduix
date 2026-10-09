import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrHighlight from './fixtures/SsrHighlight.vue';

test('renders highlight public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(SsrHighlight));
  expect(html).toContain('<mark');
  expect(html).toContain('data-slot="highlight-root"');
});