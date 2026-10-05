import { expect, test } from '@rstest/core';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import SsrImage from './fixtures/SsrImage.vue';

test('renders picture composition and generated sources on the server', async () => {
  const html = await renderToString(createSSRApp(SsrImage));
  expect(html).toContain('data-slot="image-root"');
  expect(html).toContain('data-slot="image-source"');
  expect(html).toContain('srcset=');
});